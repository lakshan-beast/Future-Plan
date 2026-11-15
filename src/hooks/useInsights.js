import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/firebase";

function readArray(key) {
  const saved = localStorage.getItem(key);
  const value = saved ? JSON.parse(saved) : [];

  if (!Array.isArray(value)) {
    throw new Error("Invalid saved data");
  }

  return value.filter((item) => item && typeof item === "object");
}

function getMarks(paper) {
  const value = paper.marks ?? paper.percentage;

  if (value === null || value === undefined || value === "") {
    return null;
  }

  const marks = Number(value);

  return Number.isFinite(marks) && marks >= 0 && marks <= 100 ? marks : null;
}

function getTime(value) {
  const time = new Date(value).getTime();
  return Number.isFinite(time) ? time : null;
}

function getTrend(papers) {
  const datedPapers = papers
    .filter((paper) => getTime(paper.createdAt) !== null)
    .slice()
    .sort((a, b) => getTime(a.createdAt) - getTime(b.createdAt));

  if (datedPapers.length < 2) {
    return { trend: "insufficient", diff: null };
  }

  const diff = datedPapers[datedPapers.length - 1].marks - datedPapers[0].marks;

  return {
    trend: diff > 5 ? "improving" : diff < -5 ? "declining" : "stable",
    diff,
  };
}

export function formatInsightMinutes(value) {
  const minutes = Math.max(0, Math.round(Number(value) || 0));

  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

export function useInsights() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [papers, setPapers] = useState([]);
  const [focusHistory, setFocusHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let currentUid = null;

    function loadLocalData(uid) {
      const messages = [];

      try {
        setPapers(readArray(`dreamutrack-papers-${uid}`));
      } catch {
        setPapers([]);
        messages.push("Paper records could not be read.");
      }

      try {
        setFocusHistory(readArray(`dreamutrack-focus-history-${uid}`));
      } catch {
        setFocusHistory([]);
        messages.push("Focus history could not be read.");
      }

      setError(messages.join(" "));
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      currentUid = currentUser?.uid || null;
      setUser(currentUser);

      if (currentUid) {
        loadLocalData(currentUid);
      } else {
        setPapers([]);
        setFocusHistory([]);
        setError("");
      }

      setLoading(false);
    });

    function handleStorage(event) {
      if (!currentUid) return;

      const keys = [
        `dreamutrack-papers-${currentUid}`,
        `dreamutrack-focus-history-${currentUid}`,
      ];

      if (event.key === null || keys.includes(event.key)) {
        loadLocalData(currentUid);
      }
    }

    function handleVisibility() {
      if (!document.hidden && currentUid) {
        loadLocalData(currentUid);
      }
    }

    window.addEventListener("storage", handleStorage);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      unsubscribe();
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const analytics = useMemo(() => {
    const validPapers = papers
      .map((paper) => ({
        ...paper,
        marks: getMarks(paper),
        subject: typeof paper.subject === "string" ? paper.subject.trim() : "",
      }))
      .filter((paper) => paper.marks !== null && paper.subject);

    const subjectGroups = new Map();

    validPapers.forEach((paper) => {
      const group = subjectGroups.get(paper.subject) || [];
      group.push(paper);
      subjectGroups.set(paper.subject, group);
    });

    const subjectPerformance = [...subjectGroups.entries()]
      .map(([subject, records]) => ({
        subject,
        average: Math.round(
          records.reduce((sum, paper) => sum + paper.marks, 0) / records.length,
        ),
        count: records.length,
        ...getTrend(records),
      }))
      .sort((a, b) => b.average - a.average);

    const marksTrend = validPapers
      .filter((paper) => getTime(paper.createdAt) !== null)
      .slice()
      .sort((a, b) => getTime(a.createdAt) - getTime(b.createdAt))
      .map((paper, index) => ({
        name: paper.paperName || `Paper ${index + 1}`,
        subject: paper.subject,
        marks: paper.marks,
      }));

    const weakAreas = subjectPerformance
      .filter((subject) => subject.average < 60)
      .slice()
      .sort((a, b) => a.average - b.average);

    const errorCounts = new Map();

    validPapers.forEach((paper) => {
      const tags = Array.isArray(paper.errors)
        ? [...new Set(paper.errors)]
        : [];

      tags.forEach((tag) => {
        if (typeof tag !== "string" || !tag.trim()) return;

        errorCounts.set(tag, (errorCounts.get(tag) || 0) + 1);
      });
    });

    const errorAnalysis = [...errorCounts.entries()]
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const focusGroups = new Map();
    let totalFocusMinutes = 0;

    focusHistory.forEach((session) => {
      const minutes = Number(session.duration);

      if (!Number.isFinite(minutes) || minutes <= 0) return;

      totalFocusMinutes += minutes;

      const subject =
        typeof session.subject === "string" && session.subject.trim()
          ? session.subject.trim()
          : "General";

      focusGroups.set(subject, (focusGroups.get(subject) || 0) + minutes);
    });

    const focusBySubject = [...focusGroups.entries()]
      .map(([subject, minutes]) => ({ subject, minutes }))
      .sort((a, b) => b.minutes - a.minutes);

    const overallStats = {
      avgMarks: validPapers.length
        ? Math.round(
            validPapers.reduce((sum, paper) => sum + paper.marks, 0) /
              validPapers.length,
          )
        : null,
      totalPapers: validPapers.length,
      totalFocusMinutes,
      ...getTrend(validPapers),
    };

    const recommendations = [];

    weakAreas.forEach((area) => {
      if (area.count < 3) return;

      recommendations.push({
        id: `subject-${area.subject}`,
        kind: "review",
        title: `Review ${area.subject}`,
        message:
          `Your average is ${area.average}% across ${area.count} papers. ` +
          "Review the mistakes in these papers before your next attempt.",
      });
    });

    if (focusBySubject.length >= 2) {
      const average =
        focusBySubject.reduce((sum, subject) => sum + subject.minutes, 0) /
        focusBySubject.length;

      focusBySubject.forEach((subject) => {
        if (subject.minutes >= average * 0.5) return;

        recommendations.push({
          id: `focus-${subject.subject}`,
          kind: "focus",
          title: `Check time for ${subject.subject}`,
          message:
            `${formatInsightMinutes(subject.minutes)} recorded — less than half ` +
            "the average across subjects with logged sessions. " +
            "Check whether this matches your current priorities.",
        });
      });
    }

    if (errorAnalysis[0]?.count >= 2) {
      const top = errorAnalysis[0];

      recommendations.push({
        id: `error-${top.tag}`,
        kind: "mistake",
        title: `Practice: ${top.tag}`,
        message:
          `This tag appears on ${top.count} papers. ` +
          "Revisit those questions and try a short targeted practice session.",
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        id: "build-history",
        kind: "info",
        title: "Keep building your study history",
        message:
          "No specific recommendation meets the current data checks. " +
          "Log more papers, mistake tags and focus sessions for a clearer picture.",
      });
    }

    return {
      subjectPerformance,
      marksTrend,
      weakAreas,
      errorAnalysis,
      focusBySubject,
      overallStats,
      recommendations,
      ignoredPapers: papers.length - validPapers.length,
    };
  }, [papers, focusHistory]);

  return {
    user,
    loading,
    error,
    ...analytics,
  };
}
