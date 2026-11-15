import { AlertTriangle, CircleAlert } from "lucide-react";

import InsightsCard, { InsightsEmpty } from "./InsightsCard";

export function WeakAreasCard({ areas, paperCount }) {
  return (
    <InsightsCard
      id="insights-weak-areas"
      title="Areas to Review"
      description="Subjects with an average below the app's 60% review threshold."
      icon={AlertTriangle}>
      {!areas.length ? (
        <InsightsEmpty>
          {paperCount === 0
            ? "Add paper results before reviewing subject performance."
            : "No recorded subject average is below 60%. This is based only on the papers you have logged."}
        </InsightsEmpty>
      ) : (
        <ul className="space-y-3">
          {areas.map((area) => (
            <li
              key={area.subject}
              className="rounded-2xl border border-orange-300/15 bg-orange-400/[0.04] p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="min-w-0 break-words text-sm font-medium text-slate-100">
                  {area.subject}
                </h3>

                <span
                  className={`rounded-full px-2 py-1 text-[10px] ${
                    area.trend === "declining"
                      ? "bg-red-400/10 text-red-200"
                      : area.trend === "improving"
                        ? "bg-emerald-400/10 text-emerald-200"
                        : "bg-white/5 text-slate-300"
                  }`}>
                  {area.trend === "insufficient"
                    ? "More data needed"
                    : area.trend}
                </span>
              </div>

              <p className="mt-2 text-xs leading-tight text-slate-400">
                Average {area.average}% · {area.count}{" "}
                {area.count === 1 ? "paper" : "papers"}
              </p>

              {area.count < 3 && (
                <p className="mt-1 text-[11px] leading-tight text-orange-200">
                  Limited history — log more papers before drawing strong
                  conclusions.
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </InsightsCard>
  );
}

export function CommonErrorsCard({ errors }) {
  const highestCount = errors[0]?.count || 1;

  return (
    <InsightsCard
      id="insights-errors"
      title="Common Mistakes"
      description="How many papers carry each mistake tag. Bars are relative to the most frequent tag."
      icon={CircleAlert}>
      {!errors.length ? (
        <InsightsEmpty>
          Add mistake tags to your papers to see recurring issues.
        </InsightsEmpty>
      ) : (
        <ul className="space-y-5">
          {errors.map((error) => (
            <li key={error.tag}>
              <div className="mb-2 flex items-start justify-between gap-3">
                <span className="break-words text-xs text-slate-200">
                  {error.tag}
                </span>

                <span className="shrink-0 text-xs text-orange-200">
                  {error.count} {error.count === 1 ? "paper" : "papers"}
                </span>
              </div>

              <div
                aria-hidden="true"
                className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-400"
                  style={{
                    width: `${(error.count / highestCount) * 100}%`,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </InsightsCard>
  );
}
