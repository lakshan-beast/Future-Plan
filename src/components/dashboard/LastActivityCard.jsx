// // src/components/dashboard/LastActivityCard.jsx
// import { motion } from "motion/react";
// import { Clock } from "lucide-react";

// const LastActivityCard = ({ activity }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay: 0.2 }}
//     className="rounded-t-3xl rounded-b-md lg:rounded-b-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
//     <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
//       <Clock size={16} className="text-indigo-300" />
//       Last Activity
//     </div>

//     {activity ? (
//       <>
//         <p className="font-heading text-lg font-bold truncate">
//           {activity.title}
//         </p>
//         {activity.detail && (
//           <p className="pl-4 font-body text-sm text-white/50 mt-1">
//             {activity.detail}
//           </p>
//         )}
//         <p className="text-right font-body text-xs text-white/30 mt-2">
//           {activity.date.toLocaleDateString()}
//         </p>
//       </>
//     ) : (
//       <p className="font-body text-sm text-white/40">
//         No activity yet. Start a focus session or add a paper.
//       </p>
//     )}
//   </motion.div>
// );

// export default LastActivityCard;

import { Clock3, CheckCircle2 } from "lucide-react";

function parseActivityDate(value) {
  if (value == null) return null;

  try {
    const date =
      typeof value.toDate === "function"
        ? value.toDate()
        : value instanceof Date
          ? value
          : new Date(value);

    return Number.isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

export default function LastActivityCard({ activity }) {
  const activityDate = parseActivityDate(activity?.date);

  return (
    <section
      aria-labelledby="last-activity-heading"
      className="flex h-full flex-col rounded-3xl border border-emerald-300/15 bg-[#0a1224] p-5 sm:p-6">
      <h2
        id="last-activity-heading"
        className="flex items-center gap-2 text-sm font-semibold text-slate-100">
        <Clock3 size={18} className="text-emerald-300" aria-hidden="true" />
        Last Activity
      </h2>

      {activity ? (
        <div className="mt-5 flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-400/10">
            <CheckCircle2
              size={20}
              className="text-emerald-300"
              aria-hidden="true"
            />
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="break-words font-heading text-lg font-semibold leading-snug text-white">
              {activity.title}
            </h3>

            {activity.detail && (
              <p className="mt-2 break-words text-sm leading-6 text-slate-300">
                {activity.detail}
              </p>
            )}

            {activityDate && (
              <time
                dateTime={activityDate.toISOString()}
                className="mt-3 block text-xs leading-5 text-slate-400">
                {activityDate.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                {" · "}
                {activityDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-4">
          <p className="text-sm font-medium text-slate-200">
            Your study journey starts here.
          </p>

          <p className="mt-2 text-xs leading-6 text-slate-400">
            Complete a focus session or add a paper to see your latest activity.
          </p>
        </div>
      )}
    </section>
  );
}
