import { Award, Clock3, Crown, Flame, Medal } from "lucide-react";

import LeaderboardUser from "./LeaderboardUser";
import { formatFocusMinutes } from "../../hooks/useLeaderBoard";

const PODIUM_STYLES = {
  1: {
    icon: Crown,
    label: "1st Place",
    iconColor: "text-amber-200",
    iconBackground: "border-amber-300/35 bg-amber-400/15",
    card: "border-amber-300/35 from-amber-400/50 via-[#151a26] to-[#0a1224]",
    order: "md:order-2",
  },
  2: {
    icon: Medal,
    label: "2nd Place",
    iconColor: "text-slate-200",
    iconBackground: "border-slate-300/30 bg-slate-300/10",
    card: "border-slate-300/20 from-slate-300/50 to-[#0a1224]",
    order: "md:order-1",
  },
  3: {
    icon: Award,
    label: "3rd Place",
    iconColor: "text-orange-200",
    iconBackground: "border-orange-300/30 bg-orange-400/10",
    card: "border-orange-300/25 from-orange-400/50 to-[#0a1224]",
    order: "md:order-3",
  },
};

export default function LeaderboardPodium({ leaders, userId }) {
  if (leaders.length === 0) return null;

  const usePodiumOrder = leaders.length === 3;

  return (
    <section aria-labelledby="top-students-heading">
      <div className="mb-4 flex items-center gap-3">
        <h2
          id="top-students-heading"
          className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Top Students
        </h2>

        <div className="h-px flex-1 bg-white/10" />
      </div>

      <ol className="grid grid-cols-1 items-end gap-4 md:grid-cols-3 lg:max-w-280 mx-auto">
        {leaders.map((leader, index) => {
          const rank = index + 1;
          const style = PODIUM_STYLES[rank];
          const Icon = style.icon;
          const isMe = leader.id === userId;

          return (
            <li
              key={leader.id}
              value={rank}
              className={`
                relative min-w-0 overflow-hidden rounded-3xl
                border bg-gradient-to-b p-5 text-center
                ${style.card}
                ${usePodiumOrder ? style.order : ""}
                ${rank === 1 ? "md:pb-9 md:pt-8" : "md:py-6"}
                ${
                  isMe
                    ? "ring-2 ring-amber-300/50 ring-offset-2 ring-offset-[#000014]"
                    : ""
                }
              `}>
              <div
                aria-hidden="true"
                className={`
                  mx-auto mb-3 flex size-11 items-center
                  justify-center rounded-2xl border
                  ${style.iconBackground}
                `}>
                <Icon
                  size={rank === 1 ? 27 : 24}
                  className={style.iconColor}
                  strokeWidth={1.6}
                />
              </div>

              <p className={`mb-4 text-xs font-semibold ${style.iconColor}`}>
                {style.label}
              </p>

              <LeaderboardUser leader={leader} large />

              <h3 className="mt-4 break-words font-heading text-lg font-bold text-white">
                {leader.displayName}

                <span className="ml-1">
                  {isMe && (
                    <span className="inline-block rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-0.5 text-[10px] font-semibold text-emerald-200">
                      You
                    </span>
                  )}
                </span>
              </h3>

              <div className="flex items-center justify-between gap-3 bg-slate-100/20 px-3 py-0.5 mt-0.5 rounded-xl">
                <p className="inline-flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                  <Clock3 size={12} aria-hidden="true" />
                  Total focus time
                </p>
                <p className="font-heading text-2xl font-bold text-emerald-200">
                  {formatFocusMinutes(leader.totalMinutes)}
                </p>
              </div>

              <div className="mt-1 border-t-2 border-white/10 pt-2">
                <p className="inline-flex items-center gap-1.5 text-xs text-orange-200">
                  <Flame
                    size={14}
                    className="text-orange-300"
                    aria-hidden="true"
                  />
                  {leader.currentStreak}{" "}
                  {leader.currentStreak === 1 ? "day" : "days"} streak
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
