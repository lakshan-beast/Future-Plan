import {
  BarChart3,
  Clock3,
  Radar as RadarIcon,
  TrendingUp,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import InsightsCard, { InsightsEmpty } from "./InsightsCard";

const EMERALD = "#34d399";
const TEAL = "#2dd4bf";

const tooltipProps = {
  contentStyle: {
    backgroundColor: "#0b1426",
    border: "1px solid #26394a",
    borderRadius: 12,
    fontSize: 12,
  },
  labelStyle: { color: "#cbd5e1" },
  itemStyle: { color: "#6ee7b7" },
};

const tickStyle = { fill: "#94a3b8", fontSize: 10 };

function truncate(value, length = 10) {
  const text = String(value ?? "");
  return text.length > length ? `${text.slice(0, length)}…` : text;
}

function DataTable({ rows, valueLabel }) {
  return (
    <details className="mt-4 border-t border-white/10 pt-3">
      <summary className="cursor-pointer rounded-lg py-2 text-xs text-emerald-300">
        View data
      </summary>

      <div className="mt-2 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-slate-400">
            <tr>
              <th scope="col" className="py-2 pr-4 font-medium">
                Item
              </th>
              <th scope="col" className="py-2 text-right font-medium">
                {valueLabel}
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-t border-white/5">
                <th
                  scope="row"
                  className="py-2 pr-4 font-normal leading-6 text-slate-300">
                  {row.name}
                </th>
                <td className="py-2 text-right text-slate-200">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

export function SubjectPerformanceChart({ data }) {
  return (
    <InsightsCard
      id="insights-performance"
      title="Subject Performance"
      description="Average recorded marks for each subject."
      icon={BarChart3}>
      {!data.length ? (
        <InsightsEmpty>
          Add paper results to compare your subjects.
        </InsightsEmpty>
      ) : (
        <>
          <div aria-hidden="true" className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
                <CartesianGrid
                  stroke="#233044"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="subject"
                  tickFormatter={(value) => truncate(value)}
                  tick={tickStyle}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                />
                <YAxis
                  domain={[0, 100]}
                  width={35}
                  tick={tickStyle}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  {...tooltipProps}
                  formatter={(value) => [`${value}%`, "Average"]}
                  cursor={{ fill: "rgba(52,211,153,0.05)" }}
                />
                <Bar
                  dataKey="average"
                  fill={EMERALD}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={36}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <DataTable
            valueLabel="Average"
            rows={data.map((item) => ({
              name: `${item.subject} · ${item.count} papers`,
              value: `${item.average}%`,
            }))}
          />
        </>
      )}
    </InsightsCard>
  );
}

export function MarksTrendChart({ data }) {
  return (
    <InsightsCard
      id="insights-marks"
      title="Recorded Marks"
      description="Papers in recorded date order. Different subjects may not be directly comparable."
      icon={TrendingUp}>
      {!data.length ? (
        <InsightsEmpty>
          Add dated paper results to see your marks history.
        </InsightsEmpty>
      ) : (
        <>
          <div aria-hidden="true" className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid
                  stroke="#233044"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tickFormatter={(value) => truncate(value)}
                  tick={tickStyle}
                  axisLine={false}
                  tickLine={false}
                  minTickGap={25}
                />
                <YAxis
                  domain={[0, 100]}
                  width={35}
                  tick={tickStyle}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  {...tooltipProps}
                  formatter={(value) => [`${value}%`, "Marks"]}
                />
                <Line
                  type="linear"
                  dataKey="marks"
                  stroke={EMERALD}
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#0a1224", strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <DataTable
            valueLabel="Marks"
            rows={data.map((item) => ({
              name: `${item.name} · ${item.subject}`,
              value: `${item.marks}%`,
            }))}
          />
        </>
      )}
    </InsightsCard>
  );
}

export function SubjectBalanceChart({ data }) {
  return (
    <InsightsCard
      id="insights-balance"
      title="Subject Balance"
      description="A comparison of average marks, not time spent or syllabus coverage."
      icon={RadarIcon}>
      {data.length < 3 ? (
        <InsightsEmpty>
          Record papers for at least 3 subjects to see this chart.
        </InsightsEmpty>
      ) : (
        <>
          <div aria-hidden="true" className="h-72 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data} outerRadius="65%">
                <PolarGrid stroke="#283448" />

                <PolarAngleAxis
                  dataKey="subject"
                  tickFormatter={(value) => truncate(value, 9)}
                  tick={tickStyle}
                />

                <PolarRadiusAxis
                  domain={[0, 100]}
                  tick={{ fill: "#64748b", fontSize: 9 }}
                  axisLine={false}
                />

                <Radar
                  dataKey="average"
                  stroke={TEAL}
                  fill={TEAL}
                  fillOpacity={0.18}
                  strokeWidth={2}
                  isAnimationActive={false}
                />

                <Tooltip
                  {...tooltipProps}
                  formatter={(value) => [`${value}%`, "Average"]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <DataTable
            valueLabel="Average"
            rows={data.map((item) => ({
              name: item.subject,
              value: `${item.average}%`,
            }))}
          />
        </>
      )}
    </InsightsCard>
  );
}

export function FocusSubjectChart({ data }) {
  return (
    <InsightsCard
      id="insights-focus"
      title="Focus Time by Subject"
      description="Completed focus minutes recorded in this browser."
      icon={Clock3}>
      {!data.length ? (
        <InsightsEmpty>
          Complete a focus session to build your subject history.
        </InsightsEmpty>
      ) : (
        <>
          <div aria-hidden="true" className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
                <CartesianGrid
                  stroke="#233044"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="subject"
                  tickFormatter={(value) => truncate(value)}
                  tick={tickStyle}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  width={40}
                  tick={tickStyle}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  {...tooltipProps}
                  formatter={(value) => [`${value} min`, "Focus"]}
                  cursor={{ fill: "rgba(45,212,191,0.05)" }}
                />
                <Bar
                  dataKey="minutes"
                  fill={TEAL}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={36}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <DataTable
            valueLabel="Minutes"
            rows={data.map((item) => ({
              name: item.subject,
              value: item.minutes,
            }))}
          />
        </>
      )}
    </InsightsCard>
  );
}
