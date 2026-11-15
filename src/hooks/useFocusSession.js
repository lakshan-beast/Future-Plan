import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase/firebase";
import { saveFocusToFirestore } from "../utils/focusStats";

export const FOCUS_SECONDS = 25 * 60;

function createIdleSession(subject = "") {
  return {
    id: null,
    subject,
    status: "idle",
    remainingMs: FOCUS_SECONDS * 1000,
    endsAt: null,
    cloudStatus: null,
  };
}

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function readHistory(uid) {
  const value = readJSON(`dreamutrack-focus-history-${uid}`, []);

  return Array.isArray(value)
    ? value.filter((entry) => entry && typeof entry === "object")
    : [];
}

function restoreSession(uid) {
  const saved = readJSON(`dreamutrack-timer-v2-${uid}`, null);

  const statuses = ["idle", "running", "paused", "completed"];

  if (
    !saved ||
    !statuses.includes(saved.status) ||
    typeof saved.subject !== "string" ||
    !Number.isFinite(saved.remainingMs) ||
    saved.remainingMs < 0 ||
    saved.remainingMs > FOCUS_SECONDS * 1000 ||
    (saved.status !== "idle" && typeof saved.id !== "string") ||
    (saved.status === "running" && !Number.isFinite(saved.endsAt))
  ) {
    return createIdleSession();
  }

  return saved;
}

export function useFocusSession() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [subjectsLoading, setSubjectsLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [session, setSession] = useState(createIdleSession);
  const [now, setNow] = useState(Date.now);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const uidRef = useRef(null);
  const sessionRef = useRef(session);
  const finishingRef = useRef(null);

  function commit(next, uid = uidRef.current) {
    sessionRef.current = next;
    setSession(next);

    if (!uid) return;

    try {
      localStorage.setItem(`dreamutrack-timer-v2-${uid}`, JSON.stringify(next));
    } catch {
      setError(
        "Browser storage is unavailable. Refresh recovery may not work.",
      );
    }
  }

  useEffect(() => {
    let active = true;
    let request = 0;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const currentRequest = ++request;
      const uid = currentUser?.uid || null;

      uidRef.current = uid;
      finishingRef.current = null;

      setUser(currentUser);
      setSubjects([]);
      setError("");
      setSaving(false);
      setSubjectsLoading(Boolean(uid));
      setNow(Date.now());

      const restored = uid ? restoreSession(uid) : createIdleSession();

      sessionRef.current = restored;
      setSession(restored);
      setHistory(uid ? readHistory(uid) : []);
      setReady(true);

      if (!uid) return;

      try {
        const snapshot = await getDoc(doc(db, "users", uid));

        if (!active || currentRequest !== request) return;

        const data = snapshot.exists() ? snapshot.data() : {};
        const values = data.profile?.subjects;

        const list = Array.isArray(values)
          ? [
              ...new Set(
                values.filter(
                  (subject) => typeof subject === "string" && subject.trim(),
                ),
              ),
            ]
          : [];

        setSubjects(list);

        const current = sessionRef.current;

        if (current.status === "idle" && !list.includes(current.subject)) {
          commit({ ...current, subject: list[0] || "" }, uid);
        }
      } catch {
        if (active && currentRequest === request) {
          setError("Unable to load subjects. Please reload and try again.");
        }
      } finally {
        if (active && currentRequest === request) {
          setSubjectsLoading(false);
        }
      }
    });

    return () => {
      active = false;
      request += 1;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    const update = () => setNow(Date.now());

    const interval = window.setInterval(
      update,
      session.status === "running" ? 250 : 30_000,
    );

    const handleVisibility = () => {
      if (!document.hidden) update();
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [user?.uid, session.status]);

  const remainingMs =
    session.status === "running"
      ? Math.max(0, session.endsAt - now)
      : session.remainingMs;

  const secondsLeft = Math.ceil(remainingMs / 1000);

  useEffect(() => {
    if (
      !user ||
      session.status !== "running" ||
      remainingMs > 0 ||
      finishingRef.current === session.id
    ) {
      return;
    }

    const uid = user.uid;
    const completedSession = session;
    finishingRef.current = session.id;

    async function finish() {
      setSaving(true);

      const entry = {
        id: completedSession.id,
        subject: completedSession.subject,
        duration: FOCUS_SECONDS / 60,
        createdAt: new Date(completedSession.endsAt).toISOString(),
      };

      const existing = readHistory(uid);
      const updated = existing.some((item) => item.id === entry.id)
        ? existing
        : [...existing, entry];

      let storageFailed = false;

      try {
        localStorage.setItem(
          `dreamutrack-focus-history-${uid}`,
          JSON.stringify(updated),
        );
      } catch {
        storageFailed = true;
      }

      if (uidRef.current !== uid) return;

      setHistory(updated);

      commit({
        ...completedSession,
        status: "completed",
        remainingMs: 0,
        endsAt: null,
        cloudStatus: "saving",
      });

      try {
        await saveFocusToFirestore(user, FOCUS_SECONDS / 60);

        if (uidRef.current !== uid) return;

        commit({
          ...sessionRef.current,
          cloudStatus: "saved",
        });

        if (storageFailed) {
          setError(
            "Cloud stats were updated, but browser history could not be saved.",
          );
        }
      } catch {
        if (uidRef.current !== uid) return;

        commit({
          ...sessionRef.current,
          cloudStatus: "failed",
        });

        setError(
          storageFailed
            ? "The session finished, but local history and cloud stats could not be saved."
            : "Session saved on this device, but cloud stats could not be confirmed. No automatic retry was made.",
        );
      } finally {
        if (uidRef.current === uid) setSaving(false);
      }
    }

    finish();
  }, [user, session, remainingMs]);

  function selectSubject(subject) {
    if (sessionRef.current.status !== "idle") return;

    commit({ ...sessionRef.current, subject });
  }

  function start() {
    const current = sessionRef.current;

    if (
      !uidRef.current ||
      !current.subject ||
      !["idle", "paused"].includes(current.status)
    ) {
      return;
    }

    const timestamp = Date.now();
    setNow(timestamp);

    commit({
      ...current,
      id:
        current.id ||
        globalThis.crypto?.randomUUID?.() ||
        `${timestamp}-${Math.random().toString(36).slice(2)}`,
      status: "running",
      endsAt: timestamp + current.remainingMs,
    });
  }

  function pause() {
    const current = sessionRef.current;

    if (current.status !== "running") return;

    const remaining = Math.max(0, current.endsAt - Date.now());

    // Let the completion effect handle a finished timer.
    if (remaining === 0) {
      setNow(Date.now());
      return;
    }

    commit({
      ...current,
      status: "paused",
      remainingMs: remaining,
      endsAt: null,
    });
  }

  function reset() {
    if (saving) return;

    const current = sessionRef.current;

    if (
      ["running", "paused"].includes(current.status) &&
      !window.confirm(
        "Reset this session? Unfinished study time will not be recorded.",
      )
    ) {
      return;
    }

    finishingRef.current = null;
    setError("");

    const subject = subjects.includes(current.subject)
      ? current.subject
      : subjects[0] || "";

    commit(createIdleSession(subject));
    setNow(Date.now());
  }

  return {
    user,
    ready,
    subjects,
    subjectsLoading,
    history,
    session,
    secondsLeft,
    saving,
    error,
    now,
    progress: Math.min(
      1,
      Math.max(0, 1 - remainingMs / (FOCUS_SECONDS * 1000)),
    ),
    selectSubject,
    start,
    pause,
    reset,
  };
}
