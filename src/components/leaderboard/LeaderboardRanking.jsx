import { Clock3, Flame } from "lucide-react";

import LeaderboardUser from "./LeaderboardUser";
import { formatFocusMinutes } from "../../hooks/useLeaderBoard";

export default function LeaderboardRankings({ leaders, userId }) {
  if (leaders.length === 0) return null;

  return (
    <section
      aria-labelledby="rankings-heading"
      className="rounded-3xl border border-emerald-300/15 bg-[#0a1224] p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          id="rankings-heading"
          className="text-sm font-semibold text-slate-100">
          Rankings
        </h2>

        <span className="text-xs text-slate-400">All-time focus</span>
      </div>

      <ol start={4} className="space-y-2">
        {leaders.map((leader, index) => {
          const rank = index + 4;
          const isMe = leader.id === userId;

          return (
            <li
              key={leader.id}
              className={`
                flex flex-wrap items-center gap-x-3 gap-y-2
                rounded-2xl border p-3 sm:p-4
                ${
                  isMe
                    ? "border-emerald-300/35 bg-emerald-400/10"
                    : "border-white/5 bg-white/[0.02]"
                }
              `}>
              <span
                aria-label={`Rank ${rank}`}
                className={`
                  w-7 shrink-0 font-heading text-sm font-bold
                  ${isMe ? "text-emerald-200" : "text-slate-400"}
                `}>
                #{rank}
              </span>

              <LeaderboardUser leader={leader} />

              <div className="min-w-0 flex-1">
                <p className="break-words text-sm font-medium text-slate-100">
                  {leader.displayName}

                  {isMe && (
                    <span className="ml-2 text-[10px] font-semibold text-emerald-300">
                      You
                    </span>
                  )}
                </p>

                <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                  <Flame
                    size={12}
                    className="text-orange-300"
                    aria-hidden="true"
                  />
                  {leader.currentStreak}{" "}
                  {leader.currentStreak === 1 ? "day" : "days"} streak
                </p>
              </div>

              <div className="ml-auto shrink-0 text-right">
                <p className="font-heading text-sm font-bold tabular-nums text-emerald-200 sm:text-base">
                  {formatFocusMinutes(leader.totalMinutes)}
                </p>

                <p className="mt-1 flex items-center justify-end gap-1 text-[10px] text-slate-400">
                  <Clock3 size={11} aria-hidden="true" />
                  Focus time
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
