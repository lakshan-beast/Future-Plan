// import { motion } from "framer-motion";

// export default function GridMatrixLoader() {
//   return (
//     <div className="w-28 h-28 mx-auto bg-white/30 border border-slate-200/20 rounded-3xl shadow-sm flex items-center justify-center relative select-none">
//       <div className="grid grid-cols-2 gap-1.5 w-8 h-8">
//         {[0, 0.2, 0.4, 0.6].map((delay, i) => (
//           <motion.div
//             key={i}
//             animate={{ opacity: [1, 0.3, 1] }}
//             transition={{
//               repeat: Infinity,
//               duration: 0.8,
//               delay,
//               ease: "easeInOut",
//             }}
//             className={`rounded-sm ${i === 0 || i === 3 ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]" : "bg-indigo-500/50"}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// src/components/Loader.jsx
import { motion } from "motion/react";

export default function Loader({ size = "md" }) {
  const box =
    size === "lg" ? "w-28 h-28" : size === "sm" ? "w-16 h-16" : "w-20 h-20";

  const grid =
    size === "lg" ? "w-9 h-9" : size === "sm" ? "w-5 h-5" : "w-7 h-7";

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`${box} mx-auto rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl flex items-center justify-center relative select-none`}>
      {/* Glow */}
      <div className="absolute inset-0 rounded-3xl bg-emerald-400/5 blur-xl pointer-events-none" />

      {/* Grid matrix */}
      <div className={`grid grid-cols-2 gap-1.5 ${grid} relative`}>
        {[0, 0.2, 0.4, 0.6].map((delay, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [1, 0.25, 1], scale: [1, 0.85, 1] }}
            transition={{
              repeat: Infinity,
              duration: 0.9,
              delay,
              ease: "easeInOut",
            }}
            className={`rounded-md ${
              i === 0 || i === 3
                ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
                : "bg-teal-500/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
