// src/components/AchievementModal.jsx
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles } from "lucide-react";

const SPECIAL_LEVELS = [1, 4, 8];

const AchievementModal = ({ badge, onClose }) => {
  if (!badge) return null;

  const isSpecial = SPECIAL_LEVELS.includes(badge.id);
  const Icon = badge.icon;

  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ type: "spring", damping: 18, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl border border-white/15 bg-[#0e1424] p-8 text-center overflow-hidden">
            {/* Special animation — particles + ring */}
            {isSpecial && (
              <>
                {/* Ring */}
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: [0.4, 1.4, 1], opacity: [0, 0.6, 0.25] }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute inset-8 rounded-full border-2 border-emerald-400/40 pointer-events-none"
                />
                {/* Particles */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: Math.cos((i / 12) * Math.PI * 2) * 90,
                      y: Math.sin((i / 12) * Math.PI * 2) * 90,
                    }}
                    transition={{
                      duration: 1.4,
                      delay: 0.2 + i * 0.04,
                      ease: "easeOut",
                    }}
                    className="absolute left-1/2 top-24 w-1.5 h-1.5 rounded-full bg-emerald-300 pointer-events-none"
                  />
                ))}
              </>
            )}

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition">
              <X size={18} />
            </button>

            {/* Badge icon */}
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", damping: 12 }}
              className={`relative z-10 w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${badge.theme} flex items-center justify-center shadow-2xl`}>
              <Icon size={36} className="text-white" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 mt-5">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <Sparkles size={14} className="text-emerald-300" />
                <span className="font-body text-[11px] font-medium text-emerald-300 tracking-wide uppercase">
                  Achievement Unlocked
                </span>
              </div>

              <h2 className="font-heading text-2xl font-bold text-white">
                {badge.name}!
              </h2>

              <p className="font-body text-sm text-white/50 mt-2">
                {badge.hours} hours of focus completed
              </p>

              <p className="font-body text-sm text-white/70 mt-3 italic">
                “{badge.message}”
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 w-full rounded-xl bg-emerald-400 py-3 font-body font-semibold text-emerald-950 hover:bg-emerald-300 transition">
                Awesome! Keep Going
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementModal;
