import { BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function FocusWeeklyChart({ data }) {
  const total = data.reduce((sum, day) => sum + day.minutes, 0);

  return (
    <section
      aria-labelledby="focus-weekly-heading"
      className="rounded-3xl border border-emerald-300/15 bg-[#0a1224] p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="focus-weekly-heading"
          className="flex items-center gap-2 text-sm font-semibold text-slate-100"
        >
          <BarChart3
            size={18}
            className="text-emerald-300"
            aria-hidden="true"
          />
          Weekly Focus
        </h2>

        <p className="text-xs text-emerald-200">
          {Math.floor(total / 60)}h {Math.round(total % 60)}m
        </p>
      </div>

      <p className="mt-2 text-xs text-slate-400">
        Completed focus minutes over the last 7 days.
      </p>

      <div aria-hidden="true" className="mt-6 h-52 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#233044"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />

            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              width={36}
            />

            <Tooltip
              formatter={(value) => [`${value} min`, "Focus"]}
              contentStyle={{
                backgroundColor: "#0b1426",
                border: "1px solid #26394a",
                borderRadius: 12,
                color: "#f8fafc",
                fontSize: 12,
              }}
              labelStyle={{ color: "#cbd5e1" }}
              itemStyle={{ color: "#6ee7b7" }}
              cursor={{ fill: "rgba(52,211,153,0.05)" }}
            />

            <Bar
              dataKey="minutes"
              fill="#34d399"
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ul className="sr-only">
        {data.map((day) => (
          <li key={day.key}>
            {day.key}: {day.minutes} focus minutes.
          </li>
        ))}
      </ul>

      {total === 0 && (
        <p className="mt-4 rounded-xl bg-emerald-400/5 p-3 text-xs leading-6 text-slate-300">
          Finish your first session to start building this chart.
        </p>
      )}
    </section>
  );
}