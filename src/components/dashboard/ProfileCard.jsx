// // src/components/dashboard/ProfileCard.jsx
// import { Link } from "react-router-dom";
// import { motion } from "motion/react";
// import {
//   //   BookOpen,
//   LogOut,
//   // ChevronRight,
//   // Sparkles,
//   Mail,
//   Flame,
//   Pencil,
//   // GraduationCap,
// } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";

// // const MAX_SUBJECTS = 9;

// //  const [profile, setProfile] = useState(null);

// const Avatar = ({ user }) =>
//   user.photoURL ? (
//     <img
//       src={user.photoURL}
//       alt={user.displayName || "Profile"}
//       referrerPolicy="no-referrer"
//       className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-400/30 shrink-0"
//     />
//   ) : (
//     <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0">
//       <span className="font-heading text-xl font-bold text-emerald-950">
//         {(user.displayName || user.email || "U")[0].toUpperCase()}
//       </span>
//     </div>
//   );

// // const LevelAndSubjects = ({ profile, loading }) => {
// //   if (loading) {
// //     return <div className="h-12 w-40 rounded-xl bg-white/5 animate-pulse" />;
// //   }

// //   if (!profile) {
// //     return (
// //       <Link
// //         to="/onboarding"
// //         className="inline-flex items-center gap-2 font-body text-sm text-amber-300 hover:text-amber-200">
// //         <Sparkles size={14} />
// //         Complete your profile to personalize DreamUTrack
// //         <ChevronRight size={14} />
// //       </Link>
// //     );
// //   }

// //   const subjects = profile.subjects || [];
// //   const levelLabel = profile.level === "AL" ? "A/L" : "O/L";
// //   const extra =
// //     profile.level === "AL" && profile.alStream
// //       ? ` · ${profile.alStream}`
// //       : profile.level === "OL" && profile.olGroup
// //         ? ` · ${profile.olGroup}`
// //         : "";

// //   return (
// //     <>
// //       <div className="flex items-center gap-2 mb-2">
// //         <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1">
// //           <GraduationCap size={12} className="text-emerald-300" />
// //           <span className="font-body text-xs font-medium text-emerald-300">
// //             {levelLabel}
// //             {extra}
// //           </span>
// //         </span>
// //       </div>

// //       <div className="flex flex-wrap gap-1.5">
// //         {subjects.slice(0, MAX_SUBJECTS).map((subject) => (
// //           <span
// //             key={subject}
// //             className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2.5 py-1">
// //             <BookOpen size={11} className="text-white/40" />
// //             <span className="font-body text-[11px] text-white/60 truncate max-w-[110px]">
// //               {subject}
// //             </span>
// //           </span>
// //         ))}
// //         {subjects.length > MAX_SUBJECTS && (
// //           <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-2.5 py-1">
// //             <span className="font-body text-[11px] text-white/40">
// //               +{subjects.length - MAX_SUBJECTS} more
// //             </span>
// //           </span>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// const ProfileCard = ({ user, streak, onLogout }) => {
//   const isGoogle = user.providerData?.[0]?.providerId === "google.com";

//   const memberSince = user.metadata?.creationTime
//     ? new Date(user.metadata.creationTime).toLocaleDateString("en-GB", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       })
//     : "—";

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden mb-3">
//       {/* Top — avatar + name + actions */}
//       <div className="p-5 flex items-start justify-between gap-2">
//         <div className="flex-col space-y-3">
//           <Avatar user={user} />

//           <div className="flex-col">
//             <h2 className="font-heading text-xl font-bold truncate">
//               {user.displayName || "Student"}
//             </h2>
//             <p className="font-body text-sm text-white/50 truncate">
//               {user.email}
//             </p>
//             <p className="font-body text-xs text-white/30 mt-2 pt-2 border-t ">
//               Member since {memberSince}
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-col items-center gap-2 shrink-0">
//           <Link
//             to="/onboarding"
//             aria-label="Edit profile"
//             title="Edit profile"
//             className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-emerald-300 hover:bg-emerald-400/10 transition">
//             <Pencil size={15} />
//           </Link>

//           <div
//             className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
//             title={isGoogle ? "Signed in with Google" : "Signed in with Email"}>
//             {isGoogle ? (
//               <FcGoogle size={18} />
//             ) : (
//               <Mail size={16} className="text-white/60" />
//             )}
//           </div>

//           <button
//             type="button"
//             onClick={onLogout}
//             aria-label="Log out"
//             className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-red-400 hover:bg-red-500/10 transition">
//             <LogOut size={16} />
//           </button>
//         </div>
//       </div>

//       {/* Subjects — chips */}
//       {/* <div className="flex flex-wrap gap-1.5">
//         {(profile.subjects || []).slice(0, 4).map((subject) => (
//           <span
//             key={subject}
//             className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2.5 py-1">
//             <BookOpen size={11} className="text-white/40" />
//             <span className="font-body text-[11px] text-white/60 truncate max-w-[110px]">
//               {subject}
//             </span>
//           </span>
//         ))}
//         {(profile.subjects || []).length > 4 && (
//           <span className="...">+X more</span>
//         )}
//       </div> */}

//       {/* Bottom — level + subjects + streak */}
//       <div className="border-none p-3 pt-0 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
//         <div className="shrink-0 rounded-full border border-white/10 bg-gradient-to-br from-orange-500/20 to-transparent p-4 flex items-center justify-between gap-2">
//           <div className="flex gap-1">
//             <Flame size={24} className="text-orange-400 " />
//             <div className="font-heading text-2xl font-bold leading-none text-center border-l border-l-white/30 pl-3">
//               {streak}
//             </div>
//             <div className="font-body text-[10px] text-white/40 flex items-end ml-1">
//               day streaks
//             </div>
//           </div>

//           <Link
//             to="/leaderboard"
//             className="font-body text-xs text-orange-400/70 hover:text-orange-400/50">
//             Go to Leader Board
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProfileCard;

import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  Flame,
  LogOut,
  Mail,
  Pencil,
  ChevronRight,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

function getGreeting(hour) {
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function ProfileBackground() {
  const id = useId();
  const skyId = `${id}-sky`;
  const lightId = `${id}-light`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0">
      <svg
        focusable="false"
        viewBox="0 0 800 320"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full opacity-50">
        <defs>
          <linearGradient id={skyId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#080f20" />
            <stop offset="65%" stopColor="#10363c" />
            <stop offset="100%" stopColor="#153c37" />
          </linearGradient>

          <radialGradient id={lightId}>
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity=".45" />
            <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="800" height="320" fill={`url(#${skyId})`} />

        <ellipse
          cx="665"
          cy="100"
          rx="190"
          ry="150"
          fill={`url(#${lightId})`}
        />

        <circle cx="665" cy="78" r="24" fill="#a7f3d0" opacity=".55" />

        <path
          d="M0 280 145 200 260 255 420 150 545 220 690 125 800 205V320H0Z"
          fill="#174b4d"
        />

        <path
          d="M0 305 190 245 315 285 520 200 640 260 800 195V320H0Z"
          fill="#0c3037"
        />

        <path d="M0 320 220 280 430 310 620 250 800 290V320Z" fill="#071923" />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-r from-[#080f20] via-[#080f20]/90 to-transparent" />
    </div>
  );
}

function ProfileClock({ name }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const update = () => setNow(new Date());

    const interval = window.setInterval(update, 30_000);

    const handleVisibility = () => {
      if (!document.hidden) update();
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.clearInterval(interval);

      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:p-6 xl:flex-row xl:items-center xl:justify-between">
      <div className="min-w-0">
        <h1 className="font-heading text-2xl font-bold leading-tight text-white sm:text-3xl">
          {getGreeting(now.getHours())},{" "}
          <span className="break-words text-emerald-300">{name}!</span>
        </h1>

        {/* <p className="mt-2 text-sm leading-6 text-slate-300/50">
          Small steps today, stronger habits tomorrow.
        </p> */}
      </div>

      <time
        dateTime={now.toISOString()}
        className="flex shrink-0 flex-wrap gap-x-4 gap-y-2 text-xs text-slate-300 justify-between xl:items-end">
        <span className="inline-flex items-center gap-2">
          <CalendarDays
            size={15}
            className="text-emerald-300"
            aria-hidden="true"
          />

          {now.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>

        <span className="inline-flex items-center gap-2 tabular-nums">
          <Clock3 size={15} className="text-emerald-300" aria-hidden="true" />

          {now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </time>
    </div>
  );
}

export default function ProfileCard({ user, streak = 0, onLogout }) {
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  if (!user) return null;

  const displayName = user.displayName?.trim() || "Student";
  const firstName = displayName.split(/\s+/)[0];
  const initial = displayName[0].toUpperCase();

  const isGoogle = user.providerData?.some(
    ({ providerId }) => providerId === "google.com",
  );

  const memberSince = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  async function handleLogout() {
    if (!onLogout || loggingOut) return;

    setError("");
    setLoggingOut(true);

    try {
      await onLogout();
    } catch {
      setError("Unable to log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  const actionClass = `
    inline-flex size-11 shrink-0 items-center justify-center
    rounded-xl border border-white/15 bg-[#080f20]/60
    text-slate-300 backdrop-blur-sm
    transition-colors
    hover:border-emerald-300/40
    hover:bg-emerald-400/15
    hover:text-emerald-200
    focus-visible:outline-2
    focus-visible:outline-offset-2
    focus-visible:outline-emerald-300
  `;

  return (
    <section
      aria-label="Welcome and profile"
      className="relative isolate overflow-hidden rounded-3xl border border-emerald-400/15 bg-[#080f20]">
      <ProfileBackground />

      <div className="relative z-10">
        <ProfileClock name={firstName} />

        <div className="space-y-5 p-5 sm:p-6">
          {/* Profile details + responsive actions */}
          <div className="flex items-start justify-between gap-3 sm:items-center sm:gap-5">
            <div className="flex-col md:flex-row gap-3 ">
              <div className="flex min-w-0 flex-1 items-center gap-3 sm:items-start justify-between">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    width={48}
                    height={48}
                    referrerPolicy="no-referrer"
                    className="size-12 shrink-0 rounded-full object-cover ring-2 ring-emerald-300/40"
                  />
                ) : (
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-teal-400 text-xl font-bold text-emerald-950">
                    {initial}
                  </span>
                )}
              </div>
              <div className="">
                <p className="break-words text-sm font-semibold text-white sm:text-base">
                  {displayName}
                </p>

                <p className="mt-1 break-all text-xs text-slate-300">
                  {user.email}
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-400 border-t">
                  Member since {memberSince}
                </p>
              </div>
            </div>

            {/* Mobile: vertical | sm and above: horizontal */}
            <div className="flex shrink-0 flex-col items-center gap-1 sm:flex-row">
              <Link
                to="/onboarding"
                aria-label="Edit profile"
                title="Edit profile"
                className={actionClass}>
                <Pencil size={17} aria-hidden="true" />
              </Link>

              <span
                role="img"
                aria-label={
                  isGoogle ? "Signed in with Google" : "Signed in with email"
                }
                title={isGoogle ? "Google account" : "Email account"}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-[#080f20]/60 backdrop-blur-sm">
                {isGoogle ? (
                  <FcGoogle size={20} aria-hidden="true" />
                ) : (
                  <Mail
                    size={18}
                    className="text-emerald-200"
                    aria-hidden="true"
                  />
                )}
              </span>

              {onLogout && (
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  aria-label={loggingOut ? "Logging out" : "Log out"}
                  title="Log out"
                  className={`
                    ${actionClass}
                    hover:border-red-300/40
                    hover:bg-red-400/15
                    hover:text-red-200
                    disabled:cursor-wait disabled:opacity-50
                  `}>
                  <LogOut size={17} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Stronger streak background */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-orange-300/30 bg-gradient-to-r from-orange-500/25 via-orange-400/15 to-amber-400/10 px-4 py-2 pl-5 shadow-[inset_0_1px_0_rgba(253,186,116,0.08)]">
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-none border-orange-300/20 bg-orange-400/5">
                <Flame
                  size={25}
                  className="text-orange-400 animate-pulse"
                  aria-hidden="true"
                />
              </span>

              <div>
                <p className="text-sm text-orange-100">
                  <span className="font-heading text-2xl font-bold text-white">
                    {streak}
                  </span>{" "}
                  {streak === 1 ? "day" : "days"}
                </p>

                <p className="text-xs text-orange-100/80">Study streak</p>
              </div>
            </div>

            <Link
              to="/leaderboard"
              className="inline-flex min-h-10 items-center gap-1 rounded-lg px-2 text-xs font-medium text-orange-100 transition-colors hover:bg-orange-300/10 hover:text-white">
              View leaderboard
              <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-300/20 bg-red-400/10 px-3 py-2 text-xs text-red-200">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
