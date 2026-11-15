import { AlertTriangle, Clock3, Lightbulb, Target } from "lucide-react";

import InsightsCard from "./InsightsCard";

const TYPES = {
  review: {
    icon: Target,
    color: "text-orange-300",
    background: "bg-orange-400/10",
  },
  focus: {
    icon: Clock3,
    color: "text-sky-300",
    background: "bg-sky-400/10",
  },
  mistake: {
    icon: AlertTriangle,
    color: "text-red-300",
    background: "bg-red-400/10",
  },
  info: {
    icon: Lightbulb,
    color: "text-amber-300",
    background: "bg-amber-400/10",
  },
};

export default function InsightsRecommendations({ items }) {
  return (
    <InsightsCard
      id="insights-recommendations"
      title="Study Suggestions"
      description="Simple rule-based suggestions from your logged data, not predictions of exam results."
      icon={Lightbulb}>
      <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {items.map((item) => {
          const style = TYPES[item.kind] || TYPES.info;
          const Icon = style.icon;

          return (
            <li
              key={item.id}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#070e1d] p-4">
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${style.background}`}>
                <Icon size={19} className={style.color} aria-hidden="true" />
              </span>

              <div className="min-w-0">
                <h3 className="break-words text-sm font-semibold text-slate-100">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-tight text-slate-400">
                  {item.message}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </InsightsCard>
  );
}
