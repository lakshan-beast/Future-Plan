// src/components/dashboard/WeeklyForestPreview.jsx
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Trees, ChevronRight } from "lucide-react";

// days: [{ key, label, count }] — last 7 days, oldest first
const WeeklyForestPreview = ({ days }) => {
  const total = days.reduce((sum, d) => sum + d.count, 0);
  const max = Math.max(1, ...days.map((d) => d.count));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-b-3xl rounded-t-md lg:rounded-b-3xl border border-white/10 bg-gradient-to-br from-emerald-500/30 to-teal-500/5 backdrop-blur-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm text-white/50">
          <
            Trees size={16} className="text-emerald-300" />
          Weekly Forest
        </div>
        <Link
          to="/focus"
          className="font-body text-xs text-emerald-300 hover:text-emerald-200 flex items-center gap-1">
          Open
          <ChevronRight size={14} />
        </Link>
      </div>

      <div className="font-heading text-3xl font-bold">
        {total}
        <span className="font-body ml-2 text-sm font-medium text-white/50">
          {total === 1 ? "session" : "sessions"} this week
        </span>
      </div>

      <div className="mt-3 flex items-end gap-1.5 h-12">
        {days.map((d) => (
          <div
            key={d.key}
            title={`${d.label}: ${d.count}`}
            className={`flex-1 rounded-md ${
              d.count
                ? "bg-gradient-to-t from-emerald-500/70 to-emerald-300/90"
                : "bg-white/10"
            }`}
            style={{
              height: d.count
                ? `${Math.max(15, (d.count / max) * 100)}%`
                : "8%",
            }}
          />
        ))}
      </div>

      <div className="mt-1 flex gap-1.5">
        {days.map((d) => (
          <span
            key={d.key}
            className="flex-1 text-center font-body text-[9px] text-white/30">
            {d.label[0]}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default WeeklyForestPreview;
