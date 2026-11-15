// // src/components/DailyMotivation.jsx
// import { motion } from "motion/react";
// import { Quote, Sparkles } from "lucide-react";
// import { CHALLENGE_QUOTES, DAILY_QUOTES } from "../../data/quotes";

// const DailyMotivation = ({ challengeDay = 0 }) => {
//   // Date-based seed — same day = same quote
//   const today = new Date();
//   const dateSeed =
//     today.getFullYear() * 10000 +
//     (today.getMonth() + 1) * 100 +
//     today.getDate();

//   // Quote selection
//   const quote =
//     challengeDay > 0 && challengeDay <= 21
//       ? CHALLENGE_QUOTES[challengeDay - 1]
//       : DAILY_QUOTES[dateSeed % DAILY_QUOTES.length];

//   const isChallenge = challengeDay > 0 && challengeDay <= 21;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.15 }}
//       className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 mb-2">
//       {/* Background quote mark — large, low opacity */}
//       <Quote
//         size={140}
//         className="absolute -top-1 -right-1 text-emerald-400/10 pointer-events-none select-none"
//         strokeWidth={1.5}
//       />

//       {/* Soft glow */}
//       <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

//       {/* Content */}
//       <div className="relative">
//         {/* Label */}
//         <div className="flex items-center gap-2 mb-3">
//           <Sparkles size={14} className="text-emerald-300" />
//           <span className="font-body text-xs font-medium text-emerald-300/80 tracking-wide uppercase">
//             {isChallenge
//               ? `Day ${challengeDay} · Challenge`
//               : "Daily Motivation"}
//           </span>
//         </div>

//         {/* Quote */}
//         <p className="font-heading text-lg sm:text-xl font-semibold text-white/90 leading-snug pr-8 pl-3">
//           “{quote}”
//         </p>

//         {/* Subtext */}
//         <p className="font-body text-xs text-white/40 mt-3">
//           {isChallenge
//             ? "Every focused session brings you one step closer."
//             : "Keep showing up for your future."}
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// export default DailyMotivation;

import { Quote } from "lucide-react";
import { CHALLENGE_QUOTES, DAILY_QUOTES } from "../../data/quotes";

export default function DailyMotivation({ challengeDay = 0 }) {
  const today = new Date();

  const dateSeed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  const dailyQuote = DAILY_QUOTES.length
    ? DAILY_QUOTES[dateSeed % DAILY_QUOTES.length]
    : "Keep showing up for your future.";

  const quote =
    challengeDay > 0 && challengeDay <= 21
      ? CHALLENGE_QUOTES[challengeDay - 1] || dailyQuote
      : dailyQuote;

  return (
    <section
      aria-labelledby="motivation-heading"
      className="relative h-full overflow-hidden rounded-3xl border border-emerald-300/15 bg-[#0a1224] p-5 sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-12 size-44 rounded-full bg-emerald-400/10 blur-3xl"
      />

      <div className="relative">
        <h2
          id="motivation-heading"
          className="flex items-center gap-2 text-sm font-semibold text-slate-100">
          <Quote size={18} className="text-emerald-300" aria-hidden="true" />
          Today's Motivation
        </h2>

        <blockquote className="mt-4 border-l-2 border-emerald-300/40 pl-4">
          <p className="font-heading text-lg font-semibold leading-relaxed text-emerald-100 sm:text-xl">
            “{quote}”
          </p>
        </blockquote>
      </div>
    </section>
  );
}
