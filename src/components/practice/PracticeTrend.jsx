import { BarChart3, Minus, TrendingDown, TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CARD_CLASS } from "./practiceConfig";

export default function PracticeTrend({
  subjects,
  selectedSubject,
  onSelect,
  data,
  trendInfo,
}) {
  const TrendIcon =
    trendInfo?.trend === "improving"
      ? TrendingUp
      : trendInfo?.trend === "declining"
        ? TrendingDown
        : Minus;

  return (
    <section aria-labelledby="practice-trend-heading" className={CARD_CLASS}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2
          id="practice-trend-heading"
          className="flex items-center gap-2 text-sm font-semibold text-slate-100">
          <BarChart3
            size={18}
            className="text-emerald-300"
            aria-hidden="true"
          />
          Marks Trend
        </h2>

        {trendInfo && (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] ${
              trendInfo.trend === "improving"
                ? "bg-emerald-400/10 text-emerald-200"
                : trendInfo.trend === "declining"
                  ? "bg-red-400/10 text-red-200"
                  : "bg-white/5 text-slate-300"
            }`}>
            <TrendIcon size={13} aria-hidden="true" />
            {trendInfo.trend} · {trendInfo.diff > 0 ? "+" : ""}
            {trendInfo.diff} pp
          </span>
        )}
      </div>

      <p className="mt-2 text-xs leading-6 text-slate-400">
        Choose a subject to compare your recorded paper marks.
      </p>

      <div className="mt-4 flex flex-wrap gap-2" aria-label="Trend subject">
        {subjects.map((subject) => (
          <button
            key={subject}
            type="button"
            aria-pressed={selectedSubject === subject}
            onClick={() => onSelect(subject)}
            className={`min-h-10 rounded-xl border px-3 py-2 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${
              selectedSubject === subject
                ? "border-emerald-300/40 bg-emerald-400/10 text-emerald-200"
                : "border-white/10 bg-white/[0.02] text-slate-300 hover:bg-white/5"
            }`}>
            {subject}
          </button>
        ))}
      </div>

      {selectedSubject && data.length ? (
        <>
          <div aria-hidden="true" className="mt-6 h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#233044"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  minTickGap={25}
                />
                <YAxis
                  domain={[0, 100]}
                  width={35}
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Marks"]}
                  contentStyle={{
                    backgroundColor: "#0b1426",
                    border: "1px solid #26394a",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#cbd5e1" }}
                  itemStyle={{ color: "#6ee7b7" }}
                />
                <Line
                  type="linear"
                  dataKey="marks"
                  stroke="#34d399"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#0a1224", strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <ul className="sr-only">
            {data.map((paper, index) => (
              <li key={index}>
                {paper.name}: {paper.marks}%.
              </li>
            ))}
          </ul>

          <p className="mt-4 text-[11px] leading-6 text-slate-400">
            {data.length < 2
              ? "Add another paper for this subject to compare changes."
              : "Change compares the first and latest recorded paper. pp means percentage points."}
          </p>
        </>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center text-sm leading-7 text-slate-400">
          {selectedSubject
            ? "No papers recorded for this subject yet."
            : subjects.length
              ? "Select a subject to see its marks trend."
              : "Add subjects to your profile to get started."}
        </div>
      )}
    </section>
  );
}
