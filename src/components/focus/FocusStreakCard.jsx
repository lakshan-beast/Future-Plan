import { Link } from "react-router-dom";
import { ChevronRight, Flame } from "lucide-react";

export default function FocusStreakCard({ streak }) {
  return (
    <section
      aria-labelledby="focus-streak-heading"
      className="rounded-3xl border border-orange-300/25 bg-gradient-to-br from-orange-500/20 via-[#141827] to-[#0a1224] p-5 sm:p-6"
    >
      <h2
        id="focus-streak-heading"
        className="flex items-center gap-2 text-sm font-semibold text-orange-100"
      >
        <Flame
          size={19}
          className="text-orange-300"
          aria-hidden="true"
        />
        Current Streak
      </h2>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <p className="text-sm text-orange-100/80">
          <span className="font-heading text-4xl font-bold text-white">
            {streak}
          </span>{" "}
          {streak === 1 ? "day" : "days"}
        </p>

        <Link
          to="/leaderboard"
          className="inline-flex min-h-10 items-center gap-1 text-xs text-orange-200 hover:text-white"
        >
          View leaderboard
          <ChevronRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <p className="mt-3 text-xs leading-6 text-slate-300">
        Build your streak with a completed focus session each day.
      </p>
    </section>
  );
}