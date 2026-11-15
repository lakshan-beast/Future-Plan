// // src/components/dashboard/ToolsSection.jsx
// import { motion } from "motion/react";
// import { TOOLS } from "./dashboardConfig";

// const ToolsSection = () => (
//   <motion.div
//     className="sm:mb-2"
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay: 0.5 }}>
//     <h3 className="font-heading text-lg font-bold mb-3">Tools</h3>
//     <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-2">
//       {TOOLS.map(({ label, icon: Icon, color, iconColor, comingSoon }) => (
//         <div
//           key={label}
//           className={`rounded-2xl border border-white/10 bg-gradient-to-br ${color} backdrop-blur-xl p-4 ${
//             comingSoon ? "opacity-60" : ""
//           }`}>
//           <div className="flex items-center justify-between mb-2">
//             <Icon size={22} className={iconColor} />
//             {comingSoon && (
//               <span className="font-body text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50">
//                 Coming soon
//               </span>
//             )}
//           </div>
//           <p className="font-body text-sm font-medium">{label}</p>
//         </div>
//       ))}
//     </div>
//   </motion.div>
// );

// export default ToolsSection;

import { Wrench } from "lucide-react";

import { TOOLS } from "./dashboardConfig";

export default function ToolsSection() {
  return (
    <section
      aria-labelledby="tools-heading"
      className="rounded-3xl border border-emerald-300/15 bg-[#0a1224] p-5 sm:p-6">
      <div className="mb-5">
        <h2
          id="tools-heading"
          className="flex items-center gap-2 text-sm font-semibold text-slate-100">
          <Wrench size={18} className="text-emerald-300" aria-hidden="true" />
          Study Tools
        </h2>

        <p className="mt-2 text-xs leading-5 text-slate-400">
          A preview of tools planned for your study workspace.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {TOOLS.map(
          ({
            id,
            label,
            description,
            icon: Icon,
            color,
            iconColor,
            iconBackground,
            iconBorder,
            comingSoon,
          }) => (
            <li
              key={id}
              className={`
                relative min-w-0 overflow-hidden rounded-2xl
                border border-white/10 bg-gradient-to-br
                ${color} p-4
              `}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <span
                  className={`
                    inline-flex size-11 shrink-0
                    items-center justify-center rounded-xl
                    border ${iconBorder} ${iconBackground}
                  `}>
                  <Icon
                    size={22}
                    strokeWidth={1.8}
                    className={iconColor}
                    aria-hidden="true"
                  />
                </span>

                {comingSoon && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#080f20]/60 px-2.5 py-1 text-[10px] font-medium text-slate-300">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-amber-300"
                    />
                    Coming soon
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-200">
                {label}
              </h3>

              <p className="mt-1.5 text-xs leading-5 text-slate-400">
                {description}
              </p>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
