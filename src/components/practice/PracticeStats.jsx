import { Award, FileCheck2, FileText } from "lucide-react";

export default function PracticeStats({ stats }) {
  const items = [
    {
      label: "Total Papers",
      value: stats.total,
      icon: FileText,
      color: "text-emerald-300",
      background: "bg-emerald-400/10",
    },
    {
      label: "Past Papers",
      value: stats.past,
      icon: FileCheck2,
      color: "text-sky-300",
      background: "bg-sky-400/10",
    },
    {
      label: "Model Papers",
      value: stats.model,
      icon: FileCheck2,
      color: "text-violet-300",
      background: "bg-violet-400/10",
    },
    {
      label: "Average Marks",
      value: stats.total ? `${stats.avg}%` : "—",
      icon: Award,
      color: "text-amber-300",
      background: "bg-amber-400/10",
    },
  ];

  return (
    <section aria-label="Paper summary">
      <dl className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {items.map(({ label, value, icon: Icon, color, background }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-[#0a1224] p-4 sm:p-5">
            <span
              className={`mb-4 inline-flex size-10 items-center justify-center rounded-xl ${background}`}>
              <Icon size={20} className={color} aria-hidden="true" />
            </span>

            <dt className="text-xs leading-5 text-slate-400">{label}</dt>

            <dd className="mt-1 font-heading text-2xl font-bold tabular-nums text-white">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
