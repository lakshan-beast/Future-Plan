// // src/components/BadgesAchievements.jsx
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../firebase/firebase";
// import { Lock, ChevronDown, ChevronUp, Award } from "lucide-react";
// import { BADGES } from "../../data/badges";
// import AchievementModal from "./AchievementModal";

// const VISIBLE_COUNT = 8;

// const BadgesAchievements = () => {
//   const [user, setUser] = useState(null);
//   const [totalMinutes, setTotalMinutes] = useState(0);
//   const [showAll, setShowAll] = useState(false);
//   const [newBadge, setNewBadge] = useState(null);

//   // ---------------- Auth + focus history ----------------
//   //   useEffect(() => {
//   //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//   //       setUser(currentUser);

//   //       if (currentUser) {
//   //         const uid = currentUser.uid;
//   //         const saved = localStorage.getItem(`dreamutrack-focus-history-${uid}`);
//   //         const history = saved ? JSON.parse(saved) : [];

//   //         const total = history.reduce((sum, s) => sum + (s.duration || 0), 0);
//   //         setTotalMinutes(total);
//   //       } else {
//   //         setTotalMinutes(0);
//   //       }
//   //     });

//   //     return () => unsubscribe();
//   //   }, []);

//   // Auth + focus stats load
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);

//       if (currentUser) {
//         const uid = currentUser.uid;

//         // Focus stats — Firestore (focusStats.totalMinutes)
//         try {
//           const snapshot = await getDoc(doc(db, "users", uid));
//           const data = snapshot.exists() ? snapshot.data() : {};

//           // focusStats.totalMinutes — Firestore එකෙන්
//           const focusStats = data.focusStats || {};
//           setTotalMinutes(focusStats.totalMinutes || 0);
//         } catch (err) {
//           console.error("Failed to load focus stats:", err);
//           setTotalMinutes(0);
//         }
//       } else {
//         setTotalMinutes(0);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // focus history load එකේ — new unlock detect
//   useEffect(() => {
//     if (!user) return;
//     const uid = user.uid;

//     const unlockedNow = badgesWithStatus
//       .filter((b) => b.unlocked)
//       .map((b) => b.id);

//     const savedUnlocked = JSON.parse(
//       localStorage.getItem(`dreamutrack-unlocked-badges-${uid}`) || "[]",
//     );

//     const newlyUnlocked = unlockedNow.filter(
//       (id) => !savedUnlocked.includes(id),
//     );

//     if (newlyUnlocked.length > 0) {
//       const badge = BADGES.find((b) => b.id === newlyUnlocked[0]);
//       setNewBadge(badge);

//       // Mark as seen — refresh කරාම නැවත trigger නොවෙනවා
//       localStorage.setItem(
//         `dreamutrack-unlocked-badges-${uid}`,
//         JSON.stringify([...savedUnlocked, ...newlyUnlocked]),
//       );
//     }
//   }, [user, totalMinutes]);

//   const totalHours = Math.floor(totalMinutes / 60);

//   // ---------------- Unlock logic ----------------
//   const badgesWithStatus = BADGES.map((badge) => ({
//     ...badge,
//     unlocked: totalHours >= badge.hours,
//   }));

//   const unlockedCount = badgesWithStatus.filter((b) => b.unlocked).length;

//   // Visible badges — unlocked first (max 4), then locked if showAll
//   const unlockedBadges = badgesWithStatus.filter((b) => b.unlocked);
//   const lockedBadges = badgesWithStatus.filter((b) => !b.unlocked);

//   const visibleBadges = showAll
//     ? badgesWithStatus
//     : [
//         ...unlockedBadges.slice(0, VISIBLE_COUNT),
//         ...lockedBadges.slice(
//           0,
//           Math.max(0, VISIBLE_COUNT - unlockedBadges.length),
//         ),
//       ];

//   const hasMore = badgesWithStatus.length > VISIBLE_COUNT && !showAll;

//   if (!user) return null;

//   // Duration unit — ඔයාගේ Focus page එකේ store වෙන විදිහට set කරන්න
//   //   const DURATION_UNIT = "minutes"; // "minutes" හෝ "seconds"

//   //   // Total minutes calculation
//   //   const totalMinute = history.reduce((sum, s) => {
//   //     const d = Number(s.duration) || 0;
//   //     return DURATION_UNIT === "seconds" ? sum + d / 60 : sum + d;
//   //   }, 0);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.25 }}
//       className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 mb-2">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="font-heading font-semibold flex items-center gap-2">
//           <Award size={18} className="text-emerald-300" />
//           Achievements
//         </h3>
//         <span className="font-body text-xs text-white/40">
//           {unlockedCount}/{BADGES.length} unlocked
//         </span>
//       </div>

//       <AchievementModal badge={newBadge} onClose={() => setNewBadge(null)} />

//       {/* Badges grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
//         <AnimatePresence>
//           {visibleBadges.map((badge, i) => {
//             const Icon = badge.icon;

//             return (
//               <motion.div
//                 key={badge.id}
//                 layout
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ delay: i * 0.04 }}
//                 className={`rounded-2xl border p-3 text-center ${
//                   badge.unlocked
//                     ? "border-white/15 bg-white/[0.06]"
//                     : "border-white/5 bg-white/[0.02]"
//                 }`}>
//                 {/* Icon */}
//                 <div
//                   className={`w-11 h-11 mx-auto rounded-xl flex items-center justify-center mb-2 ${
//                     badge.unlocked
//                       ? `bg-gradient-to-br ${badge.theme} shadow-lg`
//                       : "bg-white/5"
//                   }`}>
//                   {badge.unlocked ? (
//                     <Icon size={20} className="text-white" />
//                   ) : (
//                     <Lock size={16} className="text-white/30" />
//                   )}
//                 </div>

//                 {/* Name */}
//                 <p
//                   className={`font-body text-[11px] font-medium truncate ${
//                     badge.unlocked ? "text-white/80" : "text-white/30"
//                   }`}>
//                   {badge.unlocked ? badge.name : "Locked"}
//                 </p>

//                 {/* Hours */}
//                 <p className="font-body text-[10px] text-white/30 mt-0.5">
//                   {badge.hours}h
//                 </p>
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>
//       </div>

//       {/* Show more / less */}
//       {hasMore || showAll ? (
//         <button
//           type="button"
//           onClick={() => setShowAll(!showAll)}
//           className="mt-4 w-full flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-2 font-body text-xs text-white/50 hover:bg-white/10 hover:text-white transition">
//           {showAll ? (
//             <>
//               <ChevronUp size={14} />
//               Show less
//             </>
//           ) : (
//             <>
//               <ChevronDown size={14} />
//               Show more ({BADGES.length - VISIBLE_COUNT} more)
//             </>
//           )}
//         </button>
//       ) : null}
//     </motion.div>
//   );
// };

// export default BadgesAchievements;

// import { useEffect, useMemo, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { Award, CircleCheck, ChevronDown, ChevronUp, Lock } from "lucide-react";

// import { auth, db } from "../../firebase/firebase";
// import { BADGES } from "../../data/badges";
// import AchievementModal from "./AchievementModal";
// import { motion } from "motion/react";

// const listVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       StaggerChildren: 0.3,
//       delay: 0.3,
//     },
//   },
// };
// const itemsVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { y: 0, opacity: 1 },
// };

// const VISIBLE_COUNT = 5;

// function readSeenBadges(uid) {
//   try {
//     const value = JSON.parse(
//       localStorage.getItem(`dreamutrack-unlocked-badges-${uid}`) || "[]",
//     );

//     return Array.isArray(value) ? value : [];
//   } catch {
//     return [];
//   }
// }

// export default function BadgesAchievements() {
//   const [uid, setUid] = useState(null);
//   const [totalMinutes, setTotalMinutes] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showAll, setShowAll] = useState(false);
//   const [badgeQueue, setBadgeQueue] = useState([]);
//   //   const Icon = badge.icon;

//   useEffect(() => {
//     let active = true;
//     let requestId = 0;

//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       const currentRequest = ++requestId;

//       setUid(currentUser?.uid || null);
//       setTotalMinutes(0);
//       setBadgeQueue([]);
//       setError("");
//       setShowAll(false);

//       if (!currentUser) {
//         setLoading(false);
//         return;
//       }

//       setLoading(true);

//       try {
//         const snapshot = await getDoc(doc(db, "users", currentUser.uid));

//         if (!active || currentRequest !== requestId) return;

//         const value = snapshot.exists()
//           ? Number(snapshot.data().focusStats?.totalMinutes)
//           : 0;

//         const minutes = Number.isFinite(value) ? Math.max(0, value) : 0;

//         setTotalMinutes(minutes);

//         const seen = readSeenBadges(currentUser.uid);

//         const newlyUnlocked = [...BADGES]
//           .sort((a, b) => a.hours - b.hours)
//           .filter(
//             (badge) => minutes >= badge.hours * 60 && !seen.includes(badge.id),
//           );

//         setBadgeQueue(newlyUnlocked);
//       } catch {
//         if (!active || currentRequest !== requestId) return;

//         setError("Unable to load your milestones. Please try again later.");
//       } finally {
//         if (active && currentRequest === requestId) {
//           setLoading(false);
//         }
//       }
//     });

//     return () => {
//       active = false;
//       unsubscribe();
//     };
//   }, []);

//   const badges = useMemo(
//     () =>
//       [...BADGES]
//         .sort((a, b) => a.hours - b.hours)
//         .map((badge) => ({
//           ...badge,
//           unlocked: totalMinutes >= badge.hours * 60,
//         })),
//     [totalMinutes],
//   );

//   const unlockedCount = badges.filter((badge) => badge.unlocked).length;

//   const visibleBadges = showAll ? badges : badges.slice(0, VISIBLE_COUNT);

//   const nextBadge = badges.find((badge) => !badge.unlocked);
//   const currentBadge = badgeQueue[0] || null;

//   function handleCloseAchievement() {
//     if (!currentBadge || !uid) return;

//     try {
//       const seen = readSeenBadges(uid);

//       localStorage.setItem(
//         `dreamutrack-unlocked-badges-${uid}`,
//         JSON.stringify([...new Set([...seen, currentBadge.id])]),
//       );
//     } catch {
//       // Keep the modal usable if browser storage is unavailable.
//     }

//     setBadgeQueue((queue) => queue.slice(1));
//   }

//   if (!uid) return null;

//   return (
//     <section
//       aria-labelledby="milestones-heading"
//       className="rounded-3xl border border-emerald-300/15 bg-[#0a1224] p-5 sm:p-6">
//       <AchievementModal badge={currentBadge} onClose={handleCloseAchievement} />

//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <h2
//           id="milestones-heading"
//           className="flex items-center gap-2 text-xl font-semibold text-slate-100">
//           <Award size={19} className="text-amber-300" aria-hidden="true" />
//           Study Milestones
//         </h2>

//         {!loading && !error && (
//           <p className="text-xs text-slate-400">
//             {unlockedCount} / {badges.length} unlocked
//           </p>
//         )}
//       </div>

//       {loading ? (
//         <p role="status" className="py-8 text-sm text-slate-400 text-center">
//           Loading your milestones…
//         </p>
//       ) : error ? (
//         <p role="alert" className="mt-4 text-sm text-red-300">
//           {error}
//         </p>
//       ) : (
//         <>
//           <motion.ul
//             variants={listVariants}
//             initial="hidden"
//             animate="visible"
//             // animate={{ y: 0, opacity: 1 }}
//             // transition={{ ease: "easeOut", delay: 0.3 }}
//             aria-label="Study milestones"
//             className="
//               mt-5 flex gap-3 overflow-x-auto pb-3
//               lg:grid lg:grid-cols-4 lg:overflow-visible
//               xl:grid-cols-5
//             ">
//             {visibleBadges.map((badge) => {
//               const Icon = badge.icon;

//               return (
//                 <motion.li
//                   variants={itemsVariants}
//                   key={badge.id}
//                   className={`flex w-60 shrink-0 flex-col items-center rounded-b-3xl border-2 px-2 py-4 text-center lg:w-auto  ${
//                     badge.unlocked
//                       ? "border-emerald-300/10 bg-emerald-400/6"
//                       : "border-white/5 bg-white/2"
//                   }`}>
//                   {/* <span
//                     className={`flex size-12 items-center justify-center rounded-2xl ${
//                       badge.unlocked
//                         ? `bg-gradient-to-br ${badge.theme}`
//                         : "bg-slate-800/70"
//                     }`}>
//                     {badge.unlocked ? (
//                       <Icon
//                         size={23}
//                         className="text-white"
//                         aria-hidden="true"
//                       />
//                     ) : (
//                       <Lock
//                         size={19}
//                         className="text-slate-400"
//                         aria-hidden="true"
//                       />
//                     )}
//                   </span> */}

//                   <span
//                     className={`flex size-12 items-center justify-center rounded-2xl animate-ping ${
//                       badge.unlocked
//                         ? `bg-gradient-to-br ${badge.theme}`
//                         : "bg-slate-800/70"
//                     }`}>
//                     {badge.unlocked ? (
//                       <Icon
//                         size={26}
//                         className="text-white"
//                         aria-hidden="true"
//                       />
//                     ) : (
//                       <Lock
//                         size={19}
//                         className="text-slate-400"
//                         aria-hidden="true"
//                       />
//                     )}
//                   </span>

//                   <p
//                     className={`mt-4 font-heading text-lg font-bold  ${
//                       badge.unlocked ? "text-amber-200" : "text-slate-300"
//                     }`}>
//                     {badge.hours}h
//                   </p>

//                   <p className="mt-1 text-[11px] leading-5 text-slate-100 text-left">
//                     {badge.name}
//                   </p>

//                   <p className="mt-1 text-[11px] leading-5 text-slate-300/70 text-left px-2">
//                     {badge.message}
//                   </p>

//                   <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[12px] text-emerald-300">
//                     {badge.unlocked && (
//                       <CircleCheck
//                         size={13}
//                         className="text-emerald-300"
//                         aria-hidden="true"
//                       />
//                     )}
//                     {badge.unlocked ? "Unlocked" : "Locked"}
//                   </span>
//                 </motion.li>
//               );
//             })}
//           </motion.ul>

//           <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
//             <p className="text-xs leading-5 text-slate-400">
//               {nextBadge
//                 ? `${Math.ceil(
//                     nextBadge.hours * 60 - totalMinutes,
//                   )} more focus minutes to unlock ${nextBadge.name}.`
//                 : badges.length
//                   ? "You have unlocked every milestone."
//                   : "Your milestones will appear here."}
//             </p>

//             {badges.length > VISIBLE_COUNT && (
//               <button
//                 type="button"
//                 onClick={() => setShowAll((value) => !value)}
//                 aria-expanded={showAll}
//                 className="inline-flex min-h-10 items-center gap-1 rounded-lg px-2 text-xs font-medium text-emerald-300 hover:bg-emerald-400/10 hover:text-emerald-100">
//                 {showAll ? "Show less" : "View all"}
//                 {showAll ? (
//                   <ChevronUp size={14} aria-hidden="true" />
//                 ) : (
//                   <ChevronDown size={14} aria-hidden="true" />
//                 )}
//               </button>
//             )}
//           </div>
//         </>
//       )}
//     </section>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  Award,
  Check,
  ChevronDown,
  ChevronUp,
  Crown,
  Lock,
  Sparkles,
} from "lucide-react";

import { auth, db } from "../../firebase/firebase";
import { BADGES, JOURNEY_BADGES } from "../../data/badges";
import AchievementModal from "./AchievementModal";

const VISIBLE_COUNT = 5;

function readSeenBadges(uid) {
  try {
    const value = JSON.parse(
      localStorage.getItem(`dreamutrack-unlocked-badges-${uid}`) || "[]",
    );

    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function isProfileReady(profile) {
  const subjects = Array.isArray(profile.subjects)
    ? [
        ...new Set(
          profile.subjects.filter(
            (subject) => typeof subject === "string" && subject.trim(),
          ),
        ),
      ]
    : [];

  if (profile.level === "OL") {
    return subjects.length >= 9;
  }

  if (profile.level === "AL") {
    return Boolean(profile.alStream) && subjects.length >= 5;
  }

  return false;
}

function MilestoneBanner({
  badge,
  index,
  totalMinutes,
  isNext,
  reducedMotion,
}) {
  const Icon = badge.icon;

  const progress =
    badge.kind === "focus"
      ? Math.min(100, Math.max(0, (totalMinutes / (badge.hours * 60)) * 100))
      : badge.unlocked
        ? 100
        : 0;

  return (
    <motion.li
      initial={reducedMotion ? false : { opacity: 0, y: -22, scaleY: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reducedMotion ? 0 : 0.45,
        delay: reducedMotion ? 0 : Math.min(index * 0.07, 0.35),
        ease: "easeOut",
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -4,
              rotate: [0, -0.7, 0.7, 0],
              transition: { duration: 0.45 },
            }
      }
      className="relative w-56 shrink-0 origin-top snap-start pt-4 lg:w-auto">
      {/* Banner support bar */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-2 top-2 z-10 h-2 rounded-full border shadow-lg ${
          badge.unlocked
            ? "border-amber-200/30 bg-gradient-to-r from-[#765a2d] via-[#e2c487] to-[#765a2d]"
            : "border-slate-500/30 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700"
        }`}
      />

      {/* Pennant surface */}
      <div
        className={`relative flex h-full min-h-80 flex-col items-center overflow-hidden px-5 pb-12 pt-7 text-center ${
          badge.unlocked
            ? "bg-gradient-to-b from-[#22352d] via-[#11251f] to-[#0a1719]"
            : isNext
              ? "bg-gradient-to-b from-[#23332e] via-[#12201f] to-[#0a151b]"
              : "bg-gradient-to-b from-[#1b2435] via-[#111a29] to-[#0a1220]"
        }`}
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 24px), 0 100%)",
        }}>
        {/* Vertical embroidery */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-2 border-l border-dashed ${
            badge.unlocked ? "border-amber-200/20" : "border-slate-400/15"
          }`}
        />

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-2 border-r border-dashed ${
            badge.unlocked ? "border-amber-200/20" : "border-slate-400/15"
          }`}
        />

        {/* Soft fabric fold */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/15 via-white/[0.025] to-black/15"
        />

        <span
          className={`relative mb-4 inline-flex min-h-6 items-center gap-1 rounded-full border px-2 py-1 text-[9px] font-medium uppercase tracking-[0.14em] ${
            isNext
              ? "border-amber-300/30 bg-amber-400/10 text-amber-200"
              : badge.unlocked
                ? "border-emerald-300/15 bg-emerald-400/5 text-emerald-200"
                : "border-white/10 text-slate-400"
          }`}>
          {isNext ? (
            <>
              <Sparkles size={10} aria-hidden="true" />
              Next goal
            </>
          ) : badge.kind === "focus" ? (
            "Focus milestone"
          ) : (
            "Your journey"
          )}
        </span>

        {/* Medal / seal */}
        <div className="relative">
          {badge.unlocked && (
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-full bg-amber-200/10 blur-xl"
            />
          )}

          <span
            className={`relative flex size-20 items-center justify-center rounded-full border-4 shadow-lg ${
              badge.unlocked
                ? `border-amber-100/35 bg-gradient-to-br ${badge.theme} ring-1 ring-amber-300/30 ring-offset-4 ring-offset-[#16271f]`
                : "border-slate-500/30 bg-slate-800 ring-1 ring-slate-500/15 ring-offset-4 ring-offset-[#15202b]"
            }`}>
            {badge.unlocked ? (
              <Icon
                size={33}
                strokeWidth={1.6}
                className="text-white"
                aria-hidden="true"
              />
            ) : (
              <Lock
                size={26}
                strokeWidth={1.6}
                className={isNext ? "text-amber-100/70" : "text-slate-500"}
                aria-hidden="true"
              />
            )}
          </span>
        </div>

        <p
          className={`relative mt-6 font-heading text-2xl font-bold ${
            badge.unlocked ? "text-amber-100" : "text-slate-300"
          }`}>
          {badge.kind === "focus" ? `${badge.hours}h` : "Journey"}
        </p>

        <h3 className="relative mt-1 font-heading text-sm font-bold text-slate-100">
          {badge.name}
        </h3>

        <p className="relative mt-3 text-[11px] leading-tight text-slate-400">
          {badge.unlocked
            ? badge.message
            : badge.kind === "focus"
              ? `Complete ${badge.hours} hours of focus to earn this milestone.`
              : badge.requirement}
        </p>

        <div className="relative mt-auto w-full pt-5">
          {isNext && (
            <div className="mb-3">
              <div className="mb-1.5 flex justify-between text-[9px] text-amber-100/80">
                <span>Progress</span>
                <span>{Math.floor(progress)}%</span>
              </div>

              <div
                role="progressbar"
                aria-label={`Progress towards ${badge.name}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.floor(progress)}
                className="h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-300 to-emerald-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <span
            className={`inline-flex items-center gap-1.5 text-[11px] ${
              badge.unlocked ? "text-emerald-200" : "text-slate-400"
            }`}>
            {badge.unlocked ? (
              <Check size={13} aria-hidden="true" />
            ) : (
              <Lock size={11} aria-hidden="true" />
            )}
            {badge.unlocked ? "Earned" : "Locked"}
          </span>
        </div>
      </div>
    </motion.li>
  );
}

export default function BadgesAchievements() {
  const reducedMotion = useReducedMotion();

  const [uid, setUid] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [profileReady, setProfileReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [badgeQueue, setBadgeQueue] = useState([]);

  useEffect(() => {
    let active = true;
    let request = 0;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const currentRequest = ++request;

      setUid(currentUser?.uid || null);
      setTotalMinutes(0);
      setProfileReady(false);
      setBadgeQueue([]);
      setShowAll(false);
      setError("");

      if (!currentUser) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const snapshot = await getDoc(doc(db, "users", currentUser.uid));

        if (!active || currentRequest !== request) return;

        const data = snapshot.exists() ? snapshot.data() : {};
        const value = Number(data.focusStats?.totalMinutes);

        const minutes = Number.isFinite(value) ? Math.max(0, value) : 0;

        setTotalMinutes(minutes);
        setProfileReady(isProfileReady(data.profile || {}));

        const seen = readSeenBadges(currentUser.uid);

        setBadgeQueue(
          [...BADGES]
            .sort((a, b) => a.hours - b.hours)
            .filter(
              (badge) =>
                minutes >= badge.hours * 60 && !seen.includes(badge.id),
            ),
        );
      } catch {
        if (active && currentRequest === request) {
          setError("Unable to load your milestones. Please try again later.");
        }
      } finally {
        if (active && currentRequest === request) {
          setLoading(false);
        }
      }
    });

    return () => {
      active = false;
      request += 1;
      unsubscribe();
    };
  }, []);

  const badges = useMemo(() => {
    const journey = JOURNEY_BADGES.map((badge) => ({
      ...badge,
      unlocked: badge.kind === "account" ? Boolean(uid) : profileReady,
    }));

    const focus = [...BADGES]
      .sort((a, b) => a.hours - b.hours)
      .map((badge) => ({
        ...badge,
        kind: "focus",
        unlocked: totalMinutes >= badge.hours * 60,
      }));

    return [...journey, ...focus];
  }, [uid, profileReady, totalMinutes]);

  const nextBadge = badges.find(
    (badge) => badge.kind === "focus" && !badge.unlocked,
  );

  const unlockedCount = badges.filter((badge) => badge.unlocked).length;

  const visibleBadges = showAll ? badges : badges.slice(0, VISIBLE_COUNT);

  const currentBadge = badgeQueue[0] || null;

  function closeAchievement() {
    if (!uid || !currentBadge) return;

    try {
      const seen = readSeenBadges(uid);

      localStorage.setItem(
        `dreamutrack-unlocked-badges-${uid}`,
        JSON.stringify([...new Set([...seen, currentBadge.id])]),
      );
    } catch {
      // Closing still works when local storage is unavailable.
    }

    setBadgeQueue((queue) => queue.slice(1));
  }

  if (!uid) return null;

  return (
    <section
      aria-labelledby="milestones-heading"
      className="relative overflow-hidden rounded-3xl border border-amber-200/15 bg-[#0a1224] p-5 sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-amber-300/[0.04] to-transparent"
      />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mb-2 text-[9px] uppercase tracking-[0.24em] text-amber-200/70">
              Your hall of achievements
            </p>

            <h2
              id="milestones-heading"
              className="flex items-center gap-2 text-sm font-semibold text-slate-100">
              <Crown size={19} className="text-amber-200" aria-hidden="true" />
              Study Milestones
            </h2>
          </div>

          {!loading && !error && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/15 bg-amber-300/5 px-3 py-1.5 text-[11px] text-amber-100">
              <Award size={13} aria-hidden="true" />
              {unlockedCount} / {badges.length} earned
            </span>
          )}
        </div>

        {loading ? (
          <p role="status" className="py-10 text-sm text-slate-400">
            Preparing your achievement banners…
          </p>
        ) : error ? (
          <p role="alert" className="mt-5 text-sm text-red-200">
            {error}
          </p>
        ) : (
          <>
            <AchievementModal badge={currentBadge} onClose={closeAchievement} />

            <ul
              aria-label="Study milestones"
              className="mt-5 flex snap-x snap-proximity items-stretch gap-4 overflow-x-auto pb-4 pt-2 lg:grid lg:grid-cols-3 lg:overflow-visible 2xl:grid-cols-5">
              {visibleBadges.map((badge, index) => (
                <MilestoneBanner
                  key={badge.id}
                  badge={badge}
                  index={index}
                  totalMinutes={totalMinutes}
                  isNext={badge.id === nextBadge?.id}
                  reducedMotion={reducedMotion}
                />
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <p className="text-xs leading-6 text-slate-400">
                {nextBadge
                  ? `${Math.max(
                      0,
                      Math.ceil(nextBadge.hours * 60 - totalMinutes),
                    )} more focus minutes to earn ${nextBadge.name}.`
                  : "Every focus milestone is yours. Keep building your routine."}
              </p>

              {badges.length > VISIBLE_COUNT && (
                <button
                  type="button"
                  onClick={() => setShowAll((value) => !value)}
                  aria-expanded={showAll}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-xs text-amber-200 hover:bg-amber-300/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200">
                  {showAll ? "Show less" : "View all banners"}

                  {showAll ? (
                    <ChevronUp size={14} aria-hidden="true" />
                  ) : (
                    <ChevronDown size={14} aria-hidden="true" />
                  )}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
