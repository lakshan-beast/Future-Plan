// // // src/components/DailyMotivation.jsx
// // import { motion } from "motion/react";
// // import { Quote, Sparkles } from "lucide-react";
// // import { CHALLENGE_QUOTES, DAILY_QUOTES } from "../../data/quotes";

// // const DailyMotivation = ({ challengeDay = 0 }) => {
// //   // Date-based seed — same day = same quote
// //   const today = new Date();
// //   const dateSeed =
// //     today.getFullYear() * 10000 +
// //     (today.getMonth() + 1) * 100 +
// //     today.getDate();

// //   // Quote selection
// //   const quote =
// //     challengeDay > 0 && challengeDay <= 21
// //       ? CHALLENGE_QUOTES[challengeDay - 1]
// //       : DAILY_QUOTES[dateSeed % DAILY_QUOTES.length];

// //   const isChallenge = challengeDay > 0 && challengeDay <= 21;

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 16 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ delay: 0.15 }}
// //       className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 mb-2">
// //       {/* Background quote mark — large, low opacity */}
// //       <Quote
// //         size={140}
// //         className="absolute -top-1 -right-1 text-emerald-400/10 pointer-events-none select-none"
// //         strokeWidth={1.5}
// //       />

// //       {/* Soft glow */}
// //       <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

// //       {/* Content */}
// //       <div className="relative">
// //         {/* Label */}
// //         <div className="flex items-center gap-2 mb-3">
// //           <Sparkles size={14} className="text-emerald-300" />
// //           <span className="font-body text-xs font-medium text-emerald-300/80 tracking-wide uppercase">
// //             {isChallenge
// //               ? `Day ${challengeDay} · Challenge`
// //               : "Daily Motivation"}
// //           </span>
// //         </div>

// //         {/* Quote */}
// //         <p className="font-heading text-lg sm:text-xl font-semibold text-white/90 leading-snug pr-8 pl-3">
// //           “{quote}”
// //         </p>

// //         {/* Subtext */}
// //         <p className="font-body text-xs text-white/40 mt-3">
// //           {isChallenge
// //             ? "Every focused session brings you one step closer."
// //             : "Keep showing up for your future."}
// //         </p>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default DailyMotivation;

// import { Quote } from "lucide-react";
// import { CHALLENGE_QUOTES, DAILY_QUOTES } from "../../data/quotes";

// export default function DailyMotivation({ challengeDay = 0 }) {
//   const today = new Date();

//   const dateSeed =
//     today.getFullYear() * 10000 +
//     (today.getMonth() + 1) * 100 +
//     today.getDate();

//   const dailyQuote = DAILY_QUOTES.length
//     ? DAILY_QUOTES[dateSeed % DAILY_QUOTES.length]
//     : "Keep showing up for your future.";

//   const quote =
//     challengeDay > 0 && challengeDay <= 21
//       ? CHALLENGE_QUOTES[challengeDay - 1] || dailyQuote
//       : dailyQuote;

//   return (
//     <section
//       aria-labelledby="motivation-heading"
//       className="relative h-full overflow-hidden rounded-3xl border border-emerald-300/15 bg-[#0a1224] p-5 sm:p-6">
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-16 -right-12 size-44 rounded-full bg-emerald-400/10 blur-3xl"
//       />

//       <div className="relative">
//         <h2
//           id="motivation-heading"
//           className="flex items-center gap-2 text-sm font-semibold text-slate-100">
//           <Quote size={18} className="text-emerald-300" aria-hidden="true" />
//           Today's Motivation
//         </h2>

//         <blockquote className="mt-4 border-l-2 border-emerald-300/40 pl-4">
//           <p className="font-heading text-lg font-semibold leading-relaxed text-emerald-100 sm:text-xl">
//             “{quote}”
//           </p>
//         </blockquote>
//       </div>
//     </section>
//   );
// }

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Quote, Sparkles } from "lucide-react";

import { CHALLENGE_QUOTES, DAILY_QUOTES } from "../../data/quotes";

function getDateSeed() {
  const today = new Date();

  return (
    today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  );
}

export default function DailyMotivation({ challengeDay = 0 }) {
  const reducedMotion = useReducedMotion();
  const headingId = useId();

  const [dateSeed, setDateSeed] = useState(getDateSeed);

  useEffect(() => {
    const update = () => setDateSeed(getDateSeed());

    const interval = window.setInterval(update, 60_000);

    const handleVisibility = () => {
      if (!document.hidden) update();
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.clearInterval(interval);

      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const dailyQuote = DAILY_QUOTES.length
    ? DAILY_QUOTES[dateSeed % DAILY_QUOTES.length]
    : "Keep showing up for your future.";

  const quote =
    Number.isInteger(challengeDay) && challengeDay > 0 && challengeDay <= 21
      ? CHALLENGE_QUOTES[challengeDay - 1] || dailyQuote
      : dailyQuote;

  return (
    <section
      aria-labelledby={headingId}
      className="relative isolate h-full overflow-hidden rounded-3xl border border-emerald-300/20 bg-[#0a1224] p-5 sm:p-6">
      {/* Ambient color, not an animated background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-emerald-400/[0.09] via-transparent to-amber-300/[0.04]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-12 -z-10 size-48 rounded-full bg-emerald-400/10 blur-3xl"
      />

      <Quote
        size={110}
        strokeWidth={1}
        className="pointer-events-none absolute -right-5 -top-5 -z-10 text-emerald-200/[0.04]"
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id={headingId}
          className="flex items-center gap-2 text-sm font-semibold text-slate-100">
          <span className="flex size-9 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-400/10">
            <Quote size={17} className="text-emerald-200" aria-hidden="true" />
          </span>
          Today's Motivation
        </h2>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/15 bg-emerald-300/5 px-2.5 py-1 text-[9px] uppercase tracking-wider text-emerald-100/80">
          <Sparkles size={11} aria-hidden="true" />
          Daily inspiration
        </span>
      </div>

      <motion.blockquote
        key={`${dateSeed}-${challengeDay}`}
        initial={reducedMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.35 }}
        className="relative my-6 pl-5">
        <span
          aria-hidden="true"
          className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-gradient-to-b from-amber-200 via-emerald-300 to-emerald-300/10"
        />

        <p className="font-heading text-xl font-semibold leading-relaxed text-emerald-50 sm:text-2xl">
          “{quote}”
        </p>
      </motion.blockquote>

      <div className="flex items-center gap-3 border-t border-emerald-200/10 pt-4">
        <span
          aria-hidden="true"
          className="size-1.5 shrink-0 rounded-full bg-emerald-200 animate-pulse"
        />

        <p className="text-[11px] leading-tight text-slate-400">
          One focused step towards the future you are building.
        </p>
      </div>
    </section>
  );
}
