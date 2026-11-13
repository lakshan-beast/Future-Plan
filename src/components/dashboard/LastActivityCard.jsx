// src/components/dashboard/LastActivityCard.jsx
import { motion } from "motion/react";
import { Clock } from "lucide-react";

const LastActivityCard = ({ activity }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="rounded-t-3xl rounded-b-md border border-white/10 bg-white/5 backdrop-blur-xl p-5">
    <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
      <Clock size={16} className="text-indigo-300" />
      Last Activity
    </div>

    {activity ? (
      <>
        <p className="font-heading text-lg font-bold truncate">
          {activity.title}
        </p>
        {activity.detail && (
          <p className="pl-4 font-body text-sm text-white/50 mt-1">
            {activity.detail}
          </p>
        )}
        <p className="text-right font-body text-xs text-white/30 mt-2">
          {activity.date.toLocaleDateString()}
        </p>
      </>
    ) : (
      <p className="font-body text-sm text-white/40">
        No activity yet. Start a focus session or add a paper.
      </p>
    )}
  </motion.div>
);

export default LastActivityCard;
