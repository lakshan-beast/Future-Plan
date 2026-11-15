// src/components/BadgesAchievements.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Lock, ChevronDown, ChevronUp, Award } from "lucide-react";
import { BADGES } from "../../data/badges";
import AchievementModal from "./AchievementModal";

const VISIBLE_COUNT = 8;

const BadgesAchievements = () => {
  const [user, setUser] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [newBadge, setNewBadge] = useState(null);

  // ---------------- Auth + focus history ----------------
  //   useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //       setUser(currentUser);

  //       if (currentUser) {
  //         const uid = currentUser.uid;
  //         const saved = localStorage.getItem(`dreamutrack-focus-history-${uid}`);
  //         const history = saved ? JSON.parse(saved) : [];

  //         const total = history.reduce((sum, s) => sum + (s.duration || 0), 0);
  //         setTotalMinutes(total);
  //       } else {
  //         setTotalMinutes(0);
  //       }
  //     });

  //     return () => unsubscribe();
  //   }, []);

  // Auth + focus stats load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const uid = currentUser.uid;

        // Focus stats — Firestore (focusStats.totalMinutes)
        try {
          const snapshot = await getDoc(doc(db, "users", uid));
          const data = snapshot.exists() ? snapshot.data() : {};

          // focusStats.totalMinutes — Firestore එකෙන්
          const focusStats = data.focusStats || {};
          setTotalMinutes(focusStats.totalMinutes || 0);
        } catch (err) {
          console.error("Failed to load focus stats:", err);
          setTotalMinutes(0);
        }
      } else {
        setTotalMinutes(0);
      }
    });

    return () => unsubscribe();
  }, []);

  // focus history load එකේ — new unlock detect
  useEffect(() => {
    if (!user) return;
    const uid = user.uid;

    const unlockedNow = badgesWithStatus
      .filter((b) => b.unlocked)
      .map((b) => b.id);

    const savedUnlocked = JSON.parse(
      localStorage.getItem(`dreamutrack-unlocked-badges-${uid}`) || "[]",
    );

    const newlyUnlocked = unlockedNow.filter(
      (id) => !savedUnlocked.includes(id),
    );

    if (newlyUnlocked.length > 0) {
      const badge = BADGES.find((b) => b.id === newlyUnlocked[0]);
      setNewBadge(badge);

      // Mark as seen — refresh කරාම නැවත trigger නොවෙනවා
      localStorage.setItem(
        `dreamutrack-unlocked-badges-${uid}`,
        JSON.stringify([...savedUnlocked, ...newlyUnlocked]),
      );
    }
  }, [user, totalMinutes]);

  const totalHours = Math.floor(totalMinutes / 60);

  // ---------------- Unlock logic ----------------
  const badgesWithStatus = BADGES.map((badge) => ({
    ...badge,
    unlocked: totalHours >= badge.hours,
  }));

  const unlockedCount = badgesWithStatus.filter((b) => b.unlocked).length;

  // Visible badges — unlocked first (max 4), then locked if showAll
  const unlockedBadges = badgesWithStatus.filter((b) => b.unlocked);
  const lockedBadges = badgesWithStatus.filter((b) => !b.unlocked);

  const visibleBadges = showAll
    ? badgesWithStatus
    : [
        ...unlockedBadges.slice(0, VISIBLE_COUNT),
        ...lockedBadges.slice(
          0,
          Math.max(0, VISIBLE_COUNT - unlockedBadges.length),
        ),
      ];

  const hasMore = badgesWithStatus.length > VISIBLE_COUNT && !showAll;

  if (!user) return null;

  // Duration unit — ඔයාගේ Focus page එකේ store වෙන විදිහට set කරන්න
  //   const DURATION_UNIT = "minutes"; // "minutes" හෝ "seconds"

  //   // Total minutes calculation
  //   const totalMinute = history.reduce((sum, s) => {
  //     const d = Number(s.duration) || 0;
  //     return DURATION_UNIT === "seconds" ? sum + d / 60 : sum + d;
  //   }, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 mb-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold flex items-center gap-2">
          <Award size={18} className="text-emerald-300" />
          Achievements
        </h3>
        <span className="font-body text-xs text-white/40">
          {unlockedCount}/{BADGES.length} unlocked
        </span>
      </div>

      <AchievementModal badge={newBadge} onClose={() => setNewBadge(null)} />

      {/* Badges grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <AnimatePresence>
          {visibleBadges.map((badge, i) => {
            const Icon = badge.icon;

            return (
              <motion.div
                key={badge.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.04 }}
                className={`rounded-2xl border p-3 text-center ${
                  badge.unlocked
                    ? "border-white/15 bg-white/[0.06]"
                    : "border-white/5 bg-white/[0.02]"
                }`}>
                {/* Icon */}
                <div
                  className={`w-11 h-11 mx-auto rounded-xl flex items-center justify-center mb-2 ${
                    badge.unlocked
                      ? `bg-gradient-to-br ${badge.theme} shadow-lg`
                      : "bg-white/5"
                  }`}>
                  {badge.unlocked ? (
                    <Icon size={20} className="text-white" />
                  ) : (
                    <Lock size={16} className="text-white/30" />
                  )}
                </div>

                {/* Name */}
                <p
                  className={`font-body text-[11px] font-medium truncate ${
                    badge.unlocked ? "text-white/80" : "text-white/30"
                  }`}>
                  {badge.unlocked ? badge.name : "Locked"}
                </p>

                {/* Hours */}
                <p className="font-body text-[10px] text-white/30 mt-0.5">
                  {badge.hours}h
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Show more / less */}
      {hasMore || showAll ? (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="mt-4 w-full flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-2 font-body text-xs text-white/50 hover:bg-white/10 hover:text-white transition">
          {showAll ? (
            <>
              <ChevronUp size={14} />
              Show less
            </>
          ) : (
            <>
              <ChevronDown size={14} />
              Show more ({BADGES.length - VISIBLE_COUNT} more)
            </>
          )}
        </button>
      ) : null}
    </motion.div>
  );
};

export default BadgesAchievements;
