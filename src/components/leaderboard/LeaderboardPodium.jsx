// import { Award, Clock3, Crown, Flame, Medal } from "lucide-react";

// import LeaderboardUser from "./LeaderboardUser";
// import { formatFocusMinutes } from "../../hooks/useLeaderBoard";

// const PODIUM_STYLES = {
//   1: {
//     icon: Crown,
//     label: "1st Place",
//     iconColor: "text-amber-200",
//     iconBackground: "border-amber-300/35 bg-amber-400/15",
//     card: "border-amber-300/35 from-amber-400/50 via-[#151a26] to-[#0a1224]",
//     order: "md:order-2",
//   },
//   2: {
//     icon: Medal,
//     label: "2nd Place",
//     iconColor: "text-slate-200",
//     iconBackground: "border-slate-300/30 bg-slate-300/10",
//     card: "border-slate-300/20 from-slate-300/50 to-[#0a1224]",
//     order: "md:order-1",
//   },
//   3: {
//     icon: Award,
//     label: "3rd Place",
//     iconColor: "text-orange-200",
//     iconBackground: "border-orange-300/30 bg-orange-400/10",
//     card: "border-orange-300/25 from-orange-400/50 to-[#0a1224]",
//     order: "md:order-3",
//   },
// };

// export default function LeaderboardPodium({ leaders, userId }) {
//   if (leaders.length === 0) return null;

//   const usePodiumOrder = leaders.length === 3;

//   return (
//     <section aria-labelledby="top-students-heading">
//       <div className="mb-4 flex items-center gap-3">
//         <h2
//           id="top-students-heading"
//           className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
//           Top Students
//         </h2>

//         <div className="h-px flex-1 bg-white/10" />
//       </div>

//       <ol className="grid grid-cols-1 items-end gap-4 md:grid-cols-3 lg:max-w-280 mx-auto">
//         {leaders.map((leader, index) => {
//           const rank = index + 1;
//           const style = PODIUM_STYLES[rank];
//           const Icon = style.icon;
//           const isMe = leader.id === userId;

//           return (
//             <li
//               key={leader.id}
//               value={rank}
//               className={`
//                 relative min-w-0 overflow-hidden rounded-3xl
//                 border bg-gradient-to-b p-5 text-center
//                 ${style.card}
//                 ${usePodiumOrder ? style.order : ""}
//                 ${rank === 1 ? "md:pb-9 md:pt-8" : "md:py-6"}
//                 ${
//                   isMe
//                     ? "ring-2 ring-amber-300/50 ring-offset-2 ring-offset-[#000014]"
//                     : ""
//                 }
//               `}>
//               <div
//                 aria-hidden="true"
//                 className={`
//                   mx-auto mb-3 flex size-11 items-center
//                   justify-center rounded-2xl border
//                   ${style.iconBackground}
//                 `}>
//                 <Icon
//                   size={rank === 1 ? 27 : 24}
//                   className={style.iconColor}
//                   strokeWidth={1.6}
//                 />
//               </div>

//               <p className={`mb-4 text-xs font-semibold ${style.iconColor}`}>
//                 {style.label}
//               </p>

//               <LeaderboardUser leader={leader} large />

//               <h3 className="mt-4 break-words font-heading text-lg font-bold text-white">
//                 {leader.displayName}

//                 <span className="ml-1">
//                   {isMe && (
//                     <span className="inline-block rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-0.5 text-[10px] font-semibold text-emerald-200">
//                       You
//                     </span>
//                   )}
//                 </span>
//               </h3>

//               <div className="flex items-center justify-between gap-3 bg-slate-100/20 px-3 py-0.5 mt-0.5 rounded-xl">
//                 <p className="inline-flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
//                   <Clock3 size={12} aria-hidden="true" />
//                   Total focus time
//                 </p>
//                 <p className="font-heading text-2xl font-bold text-emerald-200">
//                   {formatFocusMinutes(leader.totalMinutes)}
//                 </p>
//               </div>

//               <div className="mt-1 border-t-2 border-white/10 pt-2">
//                 <p className="inline-flex items-center gap-1.5 text-xs text-orange-200">
//                   <Flame
//                     size={14}
//                     className="text-orange-300"
//                     aria-hidden="true"
//                   />
//                   {leader.currentStreak}{" "}
//                   {leader.currentStreak === 1 ? "day" : "days"} streak
//                 </p>
//               </div>
//             </li>
//           );
//         })}
//       </ol>
//     </section>
//   );
// }

import { Award, Clock3, Crown, Flame, Medal } from "lucide-react";

import LeaderboardUser from "./LeaderboardUser";
import { formatFocusMinutes } from "../../hooks/useLeaderBoard";

const RANK_STYLES = {
  1: {
    icon: Crown,
    label: "1st place",
    iconColor: "text-amber-200",
    badge: "border-amber-300/40 bg-[#49391c]",
    card: "border-r-amber-300/25 from-amber-400/70 via-[#111827] to-[#0a1224]",
    rankColor: "text-amber-200",
  },
  2: {
    icon: Medal,
    label: "2nd place",
    iconColor: "text-slate-100",
    badge: "border-slate-300/35 bg-[#303b4c]",
    card: "border-r-slate-300/20 from-slate-300/50 to-[#0a1224]",
    rankColor: "text-slate-200",
  },
  3: {
    icon: Award,
    label: "3rd place",
    iconColor: "text-orange-200",
    badge: "border-orange-300/35 bg-[#493022]",
    card: "border-r-orange-300/20 from-orange-400/50 to-[#0a1224]",
    rankColor: "text-orange-200",
  },
};

export default function LeaderboardPodium({ leaders = [], userId }) {
  if (leaders.length === 0) return null;

  return (
    <section
      aria-labelledby="top-students-heading"
      className="rounded-3xl border border-emerald-300/15 bg-[#0a1224] p-4 sm:px-6 sm:py-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2
          id="top-students-heading"
          className="flex items-center gap-2 text-sm font-semibold text-slate-100">
          <TrophyIcon />
          Top Students
        </h2>

        <span className="text-xs text-slate-400">All-time focus</span>
      </div>

      <ol className="flex-col lg:flex justify-center gap-3 space-y-5 pt-3">
        {leaders.slice(0, 3).map((leader, index) => {
          const rank = index + 1;
          const style = RANK_STYLES[rank];
          const Icon = style.icon;
          const isMe = leader.id === userId;

          return (
            <li
              key={leader.id}
              value={rank}
              className={`
                relative rounded-2xl border-r-2
                bg-gradient-to-r px-3 pb-4 pt-6
                sm:px-5 sm:pb-5 sm:pt-6
                ${style.card}
                ${isMe ? "ring-2 ring-emerald-600/90 border-none" : ""}
              `}>
              {/* Rank icon — top-left corner */}
              <span
                role="img"
                aria-label={style.label}
                className={`
                  absolute -top-3 left-3 flex size-8
                  items-center justify-center rounded-xl
                  border shadow-lg shadow-black/20
                  sm:left-4 sm:size-9
                  ${style.badge}
                `}>
                <Icon
                  size={rank === 1 ? 21 : 19}
                  strokeWidth={1.7}
                  className={style.iconColor}
                  aria-hidden="true"
                />
              </span>

              <div className="flex items-center gap-2 sm:gap-3">
                <span
                  aria-label={`Rank ${rank}`}
                  className={`
                    w-6 shrink-0 font-heading text-sm font-bold
                    sm:w-8 sm:text-base ${style.rankColor}
                  `}>
                  #{rank}
                </span>

                <LeaderboardUser leader={leader} />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-1 gap-y-0">
                    <h3 className="min-w-0 wrap-break-word text-sm font-semibold text-white sm:text-base">
                      {leader.displayName}
                    </h3>

                    {isMe && (
                      <span className="absolute -top-3 left-12 flex size-8
                  items-center justify-center rounded-full
                  border shadow-lg shadow-black/20
                  sm:left-4 sm:size-9 border-emerald-300/20 bg-emerald-400/80 px-7 py-0.5 text-[9px] font-semibold text-emerald-100">
                      {/* <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-0.5 text-[9px] font-semibold text-emerald-200"> */}
                        You
                      </span>
                    )}
                  </div>

                  <p className="mt-0 flex items-center gap-1 text-[10px] text-amber-300/40 sm:text-xs">
                    <Flame
                      size={14}
                      className="shrink-0 text-orange-500 animate-bounce"
                      aria-hidden="true"
                    />

                    <span>
                      {leader.currentStreak}{" "}
                      {leader.currentStreak === 1 ? "day" : "days"} streak
                    </span>
                  </p>
                </div>

                <div className="shrink-0 text-right flex-col gap-0 pl-1.5 ml-3 border-l-2 border-l-slate-100/20">
                  <p className="font-heading text-sm font-bold tabular-nums text-amber-500 sm:text-xl">
                    {formatFocusMinutes(leader.totalMinutes)}
                  </p>

                  <p className="-mt-2 flex items-center justify-end gap-1 text-[9px] text-slate-400 ">
                    <Clock3 size={10} aria-hidden="true" />
                    <span>Focus time</span>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function TrophyIcon() {
  return <Crown size={18} className="text-amber-300" aria-hidden="true" />;
}
