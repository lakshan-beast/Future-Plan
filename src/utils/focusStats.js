// src/utils/focusStats.js
import { doc, getDoc, setDoc, increment } from "firebase/firestore";
import { db } from "../firebase/firebase";

const getTodayStr = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const getYesterdayStr = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

/**
 * Save a completed focus session to Firestore.
 * - Increments totalMinutes atomically
 * - Updates currentStreak (same day = no change, yesterday = +1, else = 1)
 * - Updates lastFocusDate
 *
 * Only saves focus stats — never marks, papers, or tasks.
 */
// src/utils/focusStats.js — updated saveFocusToFirestore
export const saveFocusToFirestore = async (user, minutes) => {
  if (!user || !minutes || minutes <= 0) return;

  const userRef = doc(db, "users", user.uid);

  try {
    const snapshot = await getDoc(userRef);
    const existing = snapshot.exists() ? snapshot.data() : {};
    const stats = existing.focusStats || {};

    const today = getTodayStr();
    const yesterday = getYesterdayStr();
    const lastFocusDate = stats.lastFocusDate;

    let newStreak;

    if (lastFocusDate === today) {
      newStreak = stats.currentStreak || 1;
    } else if (lastFocusDate === yesterday) {
      newStreak = (stats.currentStreak || 0) + 1;
    } else {
      newStreak = 1;
    }

    await setDoc(
      userRef,
      {
        // Profile fields — Google photo + name save
        displayName: user.displayName || "Student",
        photoURL: user.photoURL || null,
        email: user.email || null,

        focusStats: {
          totalMinutes: increment(minutes),
          currentStreak: newStreak,
          lastFocusDate: today,
        },
      },
      { merge: true },
    );
  } catch (err) {
    console.error("Failed to save focus stats:", err);
  }
};
