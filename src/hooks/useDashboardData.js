// src/hooks/useDashboardData.js
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getLocalStorage } from "./useLocalStorage";
import { parseDate } from "../utils/dashboardUtils";

const INITIAL = {
  profile: null,
  examDate: null,
  papers: [],
  focusHistory: [],
  profileLoading: true,
};

/**
 * Loads everything the dashboard needs for one user:
 *  - papers + focus history from localStorage (per uid)
 *  - profile + exam date from Firestore (falls back to the localStorage exam date)
 */
export const useDashboardData = (user) => {
  const [data, setData] = useState(INITIAL);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;
    const uid = user.uid;

    // getLocalStorage adds the "dreamutrack-" prefix itself
    const papers = getLocalStorage(`papers-${uid}`) ?? [];
    const focusHistory = getLocalStorage(`focus-history-${uid}`) ?? [];
    const localExamDate = parseDate(getLocalStorage(`exam-date-${uid}`));

    // Show local data immediately while Firestore loads
    setData({
      profile: null,
      examDate: localExamDate,
      papers,
      focusHistory,
      profileLoading: true,
    });

    const loadProfile = async () => {
      let profile = null;

      try {
        const snapshot = await getDoc(doc(db, "users", uid));
        if (snapshot.exists()) profile = snapshot.data().profile || null;
      } catch (err) {
        console.error("Failed to load profile:", err);
      }

      if (cancelled) return;

      setData((prev) => ({
        ...prev,
        profile,
        // Firestore wins; local value is only a fallback
        examDate: parseDate(profile?.examDate) || prev.examDate,
        profileLoading: false,
      }));
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [user]);

  return data;
};
