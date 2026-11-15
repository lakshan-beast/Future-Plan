import {
  Activity,
  Award,
  Clock3,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { formatInsightMinutes } from "../../hooks/useInsights";

export default function InsightsStats({ stats }) {
  const TrendIcon =
    stats.trend === "improving"
      ? TrendingUp
      : stats.trend === "declining"
        ? TrendingDown
        : Minus;

  const items = [
    {
      label: "Average Marks",
      value: stats.avgMarks === null ? "—" : `${stats.avgMarks}%`,
      icon: Award,
      color: "text-emerald-300",
      background: "bg-emerald-400/10",
    },
    {
      label: "First → Latest",
      value:
        stats.trend === "insufficient"
          ? "Not enough data"
          : stats.trend,
      icon: TrendIcon,
      color:
        stats.trend === "declining"
          ? "text-red-300"
          : "text-sky-300",
      background: "bg-sky-400/10",
    },
    {
      label: "Papers Analyzed",
      value: stats.totalPapers,
      icon: Activity,
      color: "text-violet-300",
      background: "bg-violet-400/10",
    },
    {
      label: "Recorded Focus",
      value: formatInsightMinutes(stats.totalFocusMinutes),
      icon: Clock3,
      color: "text-amber-300",
      background: "bg-amber-400/10",
    },
  ];

  return (
    <section aria-label="Study insights summary">
      <dl className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {items.map(
          ({ label, value, icon: Icon, color, background }) => (
            <div
              key={label}
              className="min-w-0 rounded-2xl border border-white/10 bg-[#0a1224] p-4 sm:p-5"
            >
              <span
                className={`mb-4 inline-flex size-10 items-center justify-center rounded-xl ${background}`}
              >
                <Icon size={20} className={color} aria-hidden="true" />
              </span>

              <dt className="text-xs leading-5 text-slate-400">
                {label}
              </dt>

              <dd className="mt-1 break-words font-heading text-xl font-bold capitalize leading-8 text-white sm:text-2xl">
                {value}
              </dd>
            </div>
          ),
        )}
      </dl>
    </section>
  );
}