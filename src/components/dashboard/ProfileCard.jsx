// src/components/dashboard/ProfileCard.jsx
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  //   BookOpen,
  LogOut,
  //   ChevronRight,
  //   Sparkles,
  Mail,
  Flame,
  Pencil,
  //   GraduationCap,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

// const MAX_SUBJECTS = 4;

const Avatar = ({ user }) =>
  user.photoURL ? (
    <img
      src={user.photoURL}
      alt={user.displayName || "Profile"}
      referrerPolicy="no-referrer"
      className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-400/30 shrink-0"
    />
  ) : (
    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0">
      <span className="font-heading text-xl font-bold text-emerald-950">
        {(user.displayName || user.email || "U")[0].toUpperCase()}
      </span>
    </div>
  );

// const LevelAndSubjects = ({ profile, loading }) => {
//   if (loading) {
//     return <div className="h-12 w-40 rounded-xl bg-white/5 animate-pulse" />;
//   }

//   if (!profile) {
//     return (
//       <Link
//         to="/onboarding"
//         className="inline-flex items-center gap-2 font-body text-sm text-amber-300 hover:text-amber-200">
//         <Sparkles size={14} />
//         Complete your profile to personalize DreamUTrack
//         <ChevronRight size={14} />
//       </Link>
//     );
//   }

//   const subjects = profile.subjects || [];
//   const levelLabel = profile.level === "AL" ? "A/L" : "O/L";
//   const extra =
//     profile.level === "AL" && profile.alStream
//       ? ` · ${profile.alStream}`
//       : profile.level === "OL" && profile.olGroup
//         ? ` · ${profile.olGroup}`
//         : "";

//   return (
//     <>
//       <div className="flex items-center gap-2 mb-2">
//         <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1">
//           <GraduationCap size={12} className="text-emerald-300" />
//           <span className="font-body text-xs font-medium text-emerald-300">
//             {levelLabel}
//             {extra}
//           </span>
//         </span>
//       </div>

//       <div className="flex flex-wrap gap-1.5">
//         {subjects.slice(0, MAX_SUBJECTS).map((subject) => (
//           <span
//             key={subject}
//             className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2.5 py-1">
//             <BookOpen size={11} className="text-white/40" />
//             <span className="font-body text-[11px] text-white/60 truncate max-w-[110px]">
//               {subject}
//             </span>
//           </span>
//         ))}
//         {subjects.length > MAX_SUBJECTS && (
//           <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-2.5 py-1">
//             <span className="font-body text-[11px] text-white/40">
//               +{subjects.length - MAX_SUBJECTS} more
//             </span>
//           </span>
//         )}
//       </div>
//     </>
//   );
// };

const ProfileCard = ({ user, streak, onLogout }) => {
  const isGoogle = user.providerData?.[0]?.providerId === "google.com";

  const memberSince = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden mb-3">
      {/* Top — avatar + name + actions */}
      <div className="p-5 flex items-start justify-between gap-2">
        <div className="flex-col space-y-3">
          <Avatar user={user} />

          <div className="flex-col">
            <h2 className="font-heading text-xl font-bold truncate">
              {user.displayName || "Student"}
            </h2>
            <p className="font-body text-sm text-white/50 truncate">
              {user.email}
            </p>
            <p className="font-body text-xs text-white/30 mt-2 pt-2 border-t ">
              Member since {memberSince}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 shrink-0">
          <Link
            to="/onboarding"
            aria-label="Edit profile"
            title="Edit profile"
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-emerald-300 hover:bg-emerald-400/10 transition">
            <Pencil size={15} />
          </Link>

          <div
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
            title={isGoogle ? "Signed in with Google" : "Signed in with Email"}>
            {isGoogle ? (
              <FcGoogle size={18} />
            ) : (
              <Mail size={16} className="text-white/60" />
            )}
          </div>

          <button
            type="button"
            onClick={onLogout}
            aria-label="Log out"
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-red-400 hover:bg-red-500/10 transition">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Bottom — level + subjects + streak */}
      <div className="border-none p-2 pt-0 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="shrink-0 rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/20 to-transparent px-6 py-3 flex items-center justify-between gap-3">
          <Flame size={24} className="text-orange-400" />

          <div>
            <div className="font-heading text-2xl font-bold leading-none text-center">
              {streak}
            </div>
            <div className="font-body text-[10px] text-white/40 mt-0.5">
              day streaks
            </div>
          </div>

          <Link
            to="/leaderboard"
            className="font-body text-xs flex items-center gap-1">
            Go Leader Board
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
