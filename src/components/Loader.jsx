import { motion } from "framer-motion";

export default function GridMatrixLoader() {
  return (
    <div className="w-28 h-28 mx-auto bg-white/30 border border-slate-200/20 rounded-3xl shadow-sm flex items-center justify-center relative select-none">
      <div className="grid grid-cols-2 gap-1.5 w-8 h-8">
        {[0, 0.2, 0.4, 0.6].map((delay, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              delay,
              ease: "easeInOut",
            }}
            className={`rounded-sm ${i === 0 || i === 3 ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]" : "bg-indigo-500/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
