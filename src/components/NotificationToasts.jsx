// src/components/NotificationToasts.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { NOTIFICATION_EVENT } from "../utils/notification";

const MESSAGES = [
  {
    message: "ඔයාගේ streak leaderboard එක අද බැලුවද?",
    link: "/leaderboard",
    label: "Check leaderboard",
  },
  {
    message: "අද focus session එකක් කරන්න — streak එක රැකගන්න.",
    link: "/focus",
    label: "Start focus",
  },
  {
    message: "අලුත් paper එකක් add කරලා progress බලන්න.",
    link: "/practice",
    label: "Add paper",
  },
];

const NotificationToasts = () => {
  const [toast, setToast] = useState(null);
  const [msgIndex, setMsgIndex] = useState(0);

  // Every 5 min — rotating message
  useEffect(() => {
    const show = () => {
      const msg = MESSAGES[msgIndex % MESSAGES.length];
      setToast({ ...msg, id: Date.now() });
      setMsgIndex((i) => i + 1);

      // Auto dismiss — 8s
      setTimeout(() => setToast(null), 8000);
    };

    const interval = setInterval(show, 5 * 60 * 1000); // 5 min
    return () => clearInterval(interval);
  }, [msgIndex]);

  // Listen — custom events (future use)
  useEffect(() => {
    const handler = (e) => setToast(e.detail);
    window.addEventListener(NOTIFICATION_EVENT, handler);
    return () => window.removeEventListener(NOTIFICATION_EVENT, handler);
  }, []);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-80 z-[90] rounded-2xl border border-white/15 bg-[#0e1424]/95 backdrop-blur-xl shadow-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-400/15 flex items-center justify-center shrink-0">
              <Bell size={16} className="text-emerald-300" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-body text-sm text-white/80">{toast.message}</p>

              {toast.link && (
                <Link
                  to={toast.link}
                  onClick={() => setToast(null)}
                  className="font-body text-xs text-emerald-300 hover:text-emerald-200 mt-1.5 inline-block">
                  {toast.label} →
                </Link>
              )}
            </div>

            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Dismiss"
              className="text-white/30 hover:text-white transition shrink-0">
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToasts;
