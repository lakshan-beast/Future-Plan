// // src/components/dashboard/WeeklyForestPreview.jsx
// import { Link } from "react-router-dom";
// import { motion } from "motion/react";
// import { Trees, ChevronRight } from "lucide-react";

// // days: [{ key, label, count }] — last 7 days, oldest first
// const WeeklyForestPreview = ({ days }) => {
//   const total = days.reduce((sum, d) => sum + d.count, 0);
//   const max = Math.max(1, ...days.map((d) => d.count));

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.3 }}
//       className="rounded-b-3xl rounded-t-md lg:rounded-b-3xl border border-white/10 bg-gradient-to-br from-emerald-500/30 to-teal-500/5 backdrop-blur-xl p-5">
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-2 text-sm text-white/50">
//           <
//             Trees size={16} className="text-emerald-300" />
//           Weekly Forest
//         </div>
//         <Link
//           to="/focus"
//           className="font-body text-xs text-emerald-300 hover:text-emerald-200 flex items-center gap-1">
//           Open
//           <ChevronRight size={14} />
//         </Link>
//       </div>

//       <div className="font-heading text-3xl font-bold">
//         {total}
//         <span className="font-body ml-2 text-sm font-medium text-white/50">
//           {total === 1 ? "session" : "sessions"} this week
//         </span>
//       </div>

//       <div className="mt-3 flex items-end gap-1.5 h-12">
//         {days.map((d) => (
//           <div
//             key={d.key}
//             title={`${d.label}: ${d.count}`}
//             className={`flex-1 rounded-md ${
//               d.count
//                 ? "bg-gradient-to-t from-emerald-500/70 to-emerald-300/90"
//                 : "bg-white/10"
//             }`}
//             style={{
//               height: d.count
//                 ? `${Math.max(15, (d.count / max) * 100)}%`
//                 : "8%",
//             }}
//           />
//         ))}
//       </div>

//       <div className="mt-1 flex gap-1.5">
//         {days.map((d) => (
//           <span
//             key={d.key}
//             className="flex-1 text-center font-body text-[9px] text-white/30">
//             {d.label[0]}
//           </span>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default WeeklyForestPreview;

import { Link } from "react-router-dom";
import { BarChart3, ChevronRight } from "lucide-react";

export default function WeeklyForestPreview({ days = [] }) {
  const total = days.reduce((sum, day) => sum + day.count, 0);
  const maxCount = Math.max(1, ...days.map((day) => day.count));

  return (
    <section
      aria-labelledby="weekly-focus-heading"
      className="h-full rounded-3xl border border-emerald-300/15 bg-[#0a1224] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2
          id="weekly-focus-heading"
          className="flex items-center gap-2 text-sm font-semibold text-slate-100">
          <BarChart3
            size={18}
            className="text-emerald-300"
            aria-hidden="true"
          />
          Weekly Focus
        </h2>

        <Link
          to="/focus"
          className="inline-flex min-h-9 items-center gap-1 text-xs text-emerald-300 hover:text-emerald-100">
          Open
          <ChevronRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap items-baseline gap-2">
        <p className="font-heading text-3xl font-bold text-white">{total}</p>

        <p className="text-xs text-slate-400">
          {total === 1 ? "session" : "sessions"} in the last 7 days
        </p>
      </div>

      {days.length > 0 ? (
        <>
          <div aria-hidden="true" className="mt-6 flex h-24 items-end gap-2">
            {days.map((day) => (
              <div
                key={day.key}
                className="flex h-full min-w-0 flex-1 items-end rounded-lg bg-white/[0.025]">
                <div
                  title={`${day.label}: ${day.count} sessions`}
                  className={`w-full rounded-t-md ${
                    day.count > 0
                      ? "bg-gradient-to-t from-emerald-600 to-emerald-300"
                      : "rounded-md bg-slate-700"
                  }`}
                  style={{
                    height:
                      day.count > 0
                        ? `${Math.max(12, (day.count / maxCount) * 100)}%`
                        : "4px",
                  }}
                />
              </div>
            ))}
          </div>

          <div aria-hidden="true" className="mt-3 flex gap-2">
            {days.map((day) => (
              <span
                key={day.key}
                className="min-w-0 flex-1 truncate text-center text-[10px] text-slate-400">
                {day.label.slice(0, 3)}
              </span>
            ))}
          </div>

          <ul className="sr-only">
            {days.map((day) => (
              <li key={day.key}>
                {day.label}: {day.count}{" "}
                {day.count === 1 ? "session" : "sessions"}
              </li>
            ))}
          </ul>

          {total === 0 && (
            <p className="mt-4 text-xs leading-5 text-slate-400">
              No sessions yet. Start a focus session to build your weekly
              activity.
            </p>
          )}
        </>
      ) : (
        <p className="mt-5 text-sm text-slate-400">
          Your focus activity will appear here.
        </p>
      )}
    </section>
  );
}
