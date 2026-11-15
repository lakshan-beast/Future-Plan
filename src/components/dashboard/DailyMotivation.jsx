// src/components/DailyMotivation.jsx
import { motion } from "motion/react";
import { Quote, Sparkles } from "lucide-react";
import { CHALLENGE_QUOTES, DAILY_QUOTES } from "../../data/quotes";

const DailyMotivation = ({ challengeDay = 0 }) => {
  // Date-based seed — same day = same quote
  const today = new Date();
  const dateSeed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  // Quote selection
  const quote =
    challengeDay > 0 && challengeDay <= 21
      ? CHALLENGE_QUOTES[challengeDay - 1]
      : DAILY_QUOTES[dateSeed % DAILY_QUOTES.length];

  const isChallenge = challengeDay > 0 && challengeDay <= 21;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 mb-2">
      {/* Background quote mark — large, low opacity */}
      <Quote
        size={140}
        className="absolute -top-1 -right-1 text-emerald-400/10 pointer-events-none select-none"
        strokeWidth={1.5}
      />

      {/* Soft glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative">
        {/* Label */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-emerald-300" />
          <span className="font-body text-xs font-medium text-emerald-300/80 tracking-wide uppercase">
            {isChallenge
              ? `Day ${challengeDay} · Challenge`
              : "Daily Motivation"}
          </span>
        </div>

        {/* Quote */}
        <p className="font-heading text-lg sm:text-xl font-semibold text-white/90 leading-snug pr-8 pl-3">
          “{quote}”
        </p>

        {/* Subtext */}
        <p className="font-body text-xs text-white/40 mt-3">
          {isChallenge
            ? "Every focused session brings you one step closer."
            : "Keep showing up for your future."}
        </p>
      </div>
    </motion.div>
  );
};

export default DailyMotivation;
