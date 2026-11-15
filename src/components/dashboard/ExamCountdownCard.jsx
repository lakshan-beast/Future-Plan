// // src/components/dashboard/ExamCountdownCard.jsx
// import { Link } from "react-router-dom";
// import { motion } from "motion/react";
// import { Target, Pencil } from "lucide-react";
// import { getDaysLeft } from "../../utils/dashboardUtils";

// const SetDatePrompt = ({ message, action }) => (
//   <div className="flex items-center justify-between gap-3">
//     <p className="font-body text-sm text-white/40">{message}</p>
//     <Link
//       to="/onboarding"
//       className="font-body text-xs font-medium text-emerald-300 hover:text-emerald-200 shrink-0">
//       {action}
//     </Link>
//   </div>
// );

// const ExamCountdownCard = ({ examDate }) => {
//   const daysLeft = getDaysLeft(examDate);

//   let body;
//   if (daysLeft === null) {
//     body = (
//       <SetDatePrompt
//         message="Set your exam date to see the countdown."
//         action="Set date"
//       />
//     );
//   } else if (daysLeft < 0) {
//     body = (
//       <SetDatePrompt
//         message="Your exam date has passed. Set a new one?"
//         action="Update date"
//       />
//     );
//   } else if (daysLeft === 0) {
//     body = (
//       <div className="font-heading text-3xl font-bold">
//         Exam day is today! 🎯
//       </div>
//     );
//   } else {
//     body = (
//       <>
//         <div className="font-heading text-4xl font-bold tabular-nums text-center py-3">
//           {daysLeft}
//           <span className="font-body ml-2 text-base font-medium text-white/50">
//             {daysLeft === 1 ? "day left" : "days left"}
//           </span>
//         </div>
//         <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
//           <div
//             className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
//             style={{ width: `${Math.min(100, (daysLeft / 365) * 100)}%` }}
//           />
//         </div>
//       </>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.1 }}
//       className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/15 to-teal-500/5 backdrop-blur-xl p-5 mb-3">
//       <div className="flex items-center justify-between mb-2">
//         <div className="flex items-center gap-2 text-sm text-white/50">
//           <Target size={16} className="text-emerald-300" />
//           Exam Countdown
//         </div>

//         <Link
//           to="/onboarding"
//           className="font-body text-xs text-white/40 hover:text-emerald-300 flex items-center gap-1">
//           <Pencil size={12} />
//           Edit
//         </Link>
//       </div>

//       {body}
//     </motion.div>
//   );
// };

// export default ExamCountdownCard;

import { useEffect, useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Hourglass, Pencil } from "lucide-react";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const RING_WINDOW = 365 * DAY;
const RADIUS = 48;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function parseExamDate(value) {
  if (value == null || value === "") return null;

  try {
    if (typeof value === "string") {
      const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

      if (match) {
        const year = Number(match[1]);
        const month = Number(match[2]) - 1;
        const day = Number(match[3]);

        const date = new Date(year, month, day);

        if (
          date.getFullYear() !== year ||
          date.getMonth() !== month ||
          date.getDate() !== day
        ) {
          return null;
        }

        return { date, dateOnly: true };
      }
    }

    const date =
      typeof value.toDate === "function"
        ? value.toDate()
        : value instanceof Date
          ? new Date(value.getTime())
          : new Date(value);

    if (Number.isNaN(date.getTime())) return null;

    return { date, dateOnly: false };
  } catch {
    return null;
  }
}

function TimeUnit({ value, label }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-[#050b18]/60 px-1 py-3 text-center">
      <p className="font-heading text-xl font-bold tabular-nums text-white sm:text-2xl">
        {String(value).padStart(2, "0")}
      </p>

      <p className="mt-1 text-[9px] font-medium uppercase tracking-wide text-slate-400 sm:text-[10px]">
        {label}
      </p>
    </div>
  );
}

function CountdownRing({ fraction, expired }) {
  const id = useId();
  const gradientId = `${id}-countdown-ring`;

  const offset = CIRCUMFERENCE * (1 - fraction);

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex size-32 shrink-0 items-center justify-center">
      <div className="absolute inset-4 rounded-full bg-emerald-400/10 blur-xl" />

      <svg
        viewBox="0 0 120 120"
        focusable="false"
        className="absolute inset-0 h-full w-full -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>

        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="#1c3040"
          strokeWidth="6"
        />

        {fraction > 0 && (
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        )}
      </svg>

      <div className="relative flex size-20 items-center justify-center rounded-full border border-emerald-300/10 bg-[#081822]">
        <Hourglass
          size={36}
          strokeWidth={1.5}
          className={expired ? "text-slate-400" : "text-emerald-200"}
        />
      </div>
    </div>
  );
}

export default function ExamCountdownCard({ examDate }) {
  const parsed = useMemo(() => parseExamDate(examDate), [examDate]);

  const targetTime = parsed?.date.getTime() ?? null;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (targetTime === null) return;

    const update = () => setNow(Date.now());
    update();

    const interval = window.setInterval(update, 1000);

    const handleVisibility = () => {
      if (!document.hidden) update();
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.clearInterval(interval);

      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [targetTime]);

  const remaining = targetTime === null ? 0 : Math.max(0, targetTime - now);

  const totalSeconds = Math.ceil(remaining / SECOND);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const expired = targetTime !== null && targetTime <= now;

  const currentDate = new Date(now);

  const isExamDay =
    parsed !== null &&
    parsed.date.getFullYear() === currentDate.getFullYear() &&
    parsed.date.getMonth() === currentDate.getMonth() &&
    parsed.date.getDate() === currentDate.getDate();

  const ringFraction = Math.min(1, remaining / RING_WINDOW);

  const dateLabel = parsed?.date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section
      aria-labelledby="exam-countdown-heading"
      className="relative h-full overflow-hidden rounded-3xl border border-emerald-300/20 bg-[#0a1224] p-5 sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-emerald-400/10 blur-3xl"
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <h2
            id="exam-countdown-heading"
            className="flex items-center gap-2 text-sm font-semibold text-slate-100">
            <CalendarDays
              size={18}
              className="text-emerald-300"
              aria-hidden="true"
            />
            Exam Countdown
          </h2>

          <Link
            to="/onboarding"
            aria-label="Edit exam date"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-xs text-slate-300 hover:bg-emerald-400/10 hover:text-emerald-200">
            <Pencil size={13} aria-hidden="true" />
            Edit
          </Link>
        </div>

        {targetTime === null ? (
          <div className="mt-5 rounded-2xl border border-dashed border-emerald-300/20 bg-emerald-400/5 p-4">
            <p className="text-sm leading-6 text-slate-300">
              Set a valid exam date to start your countdown.
            </p>

            <Link
              to="/onboarding"
              className="mt-3 inline-flex min-h-10 items-center rounded-xl bg-emerald-300 px-4 text-xs font-semibold text-emerald-950 hover:bg-emerald-200">
              Set exam date
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-4">
              <CountdownRing fraction={ringFraction} expired={expired} />

              <p className="mt-1 text-center text-[10px] text-slate-400">
                Ring: remaining time in a 365-day window
              </p>
            </div>

            {expired ? (
              <div className="mt-5 rounded-2xl border border-emerald-300/15 bg-emerald-400/5 p-4 text-center">
                <p className="font-heading text-xl font-bold text-emerald-200">
                  {isExamDay
                    ? "Your exam day is here!"
                    : "Your countdown has ended"}
                </p>

                <p className="mt-2 text-xs leading-6 text-slate-300">
                  {isExamDay
                    ? "Take a breath and give it your best."
                    : "Update your exam date to start a new countdown."}
                </p>

                {!isExamDay && (
                  <Link
                    to="/onboarding"
                    className="mt-3 inline-flex min-h-10 items-center text-xs font-medium text-emerald-300 hover:text-emerald-100">
                    Update exam date
                  </Link>
                )}
              </div>
            ) : (
              <div
                role="timer"
                aria-live="off"
                aria-label={`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds remaining`}
                className="mt-5 grid grid-cols-4 gap-1.5 sm:gap-2">
                <TimeUnit value={days} label="Days" />
                <TimeUnit value={hours} label="Hours" />
                <TimeUnit value={minutes} label="Minutes" />
                <TimeUnit value={seconds} label="Seconds" />
              </div>
            )}

            <div className="mt-4 border-t border-white/10 pt-4 text-center">
              <p className="text-xs font-medium text-slate-300">{dateLabel}</p>

              <p className="mt-1 text-[10px] leading-5 text-slate-400">
                {parsed.dateOnly
                  ? "Countdown ends at 12:00 AM on this date, in your device's local time."
                  : `Countdown ends at ${parsed.date.toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZoneName: "short",
                      },
                    )} on this date.`}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
