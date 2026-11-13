// src/components/dashboard/ExamCountdownCard.jsx
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Target, Pencil } from "lucide-react";
import { getDaysLeft } from "../../utils/dashboardUtils";

const SetDatePrompt = ({ message, action }) => (
  <div className="flex items-center justify-between gap-3">
    <p className="font-body text-sm text-white/40">{message}</p>
    <Link
      to="/onboarding"
      className="font-body text-xs font-medium text-emerald-300 hover:text-emerald-200 shrink-0">
      {action}
    </Link>
  </div>
);

const ExamCountdownCard = ({ examDate }) => {
  const daysLeft = getDaysLeft(examDate);

  let body;
  if (daysLeft === null) {
    body = (
      <SetDatePrompt
        message="Set your exam date to see the countdown."
        action="Set date"
      />
    );
  } else if (daysLeft < 0) {
    body = (
      <SetDatePrompt
        message="Your exam date has passed. Set a new one?"
        action="Update date"
      />
    );
  } else if (daysLeft === 0) {
    body = (
      <div className="font-heading text-3xl font-bold">
        Exam day is today! 🎯
      </div>
    );
  } else {
    body = (
      <>
        <div className="font-body text-4xl font-bold tabular-nums text-center py-3">
          {daysLeft}
          <span className="font-body ml-2 text-base font-medium text-white/50">
            {daysLeft === 1 ? "day left" : "days left"}
          </span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
            style={{ width: `${Math.min(100, (daysLeft / 365) * 100)}%` }}
          />
        </div>
      </>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/15 to-teal-500/5 backdrop-blur-xl p-5 mb-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm text-white/50">
          <Target size={16} className="text-emerald-300" />
          Exam Countdown
        </div>

        <Link
          to="/onboarding"
          className="font-body text-xs text-white/40 hover:text-emerald-300 flex items-center gap-1">
          <Pencil size={12} />
          Edit
        </Link>
      </div>

      {body}
    </motion.div>
  );
};

export default ExamCountdownCard;
