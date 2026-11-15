// // src/components/dashboard/QuickLinks.jsx
// import { Link } from "react-router-dom";
// import { motion } from "motion/react";
// import { ChevronRight } from "lucide-react";
// import { QUICK_LINKS } from "./dashboardConfig";

// const QuickLinks = () => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay: 0.4 }}
//     className="mb-6">
//     <h3 className="font-heading text-lg font-bold mb-3">Quick Links</h3>
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
//       {QUICK_LINKS.map(({ path, label, icon: Icon, color, iconColor }) => (
//         <Link
//           key={path}
//           to={path}
//           className={`rounded-2xl border border-white/5 bg-gradient-to-br ${color} backdrop-blur-xl p-4 hover:border-white/20 transition group`}>
//           <Icon size={26} className={`${iconColor} mb-2`} />
//           <p className="font-body text-sm font-medium">{label}</p>
//           <span className="text-white/50 flex items-center justify-center gap-3 text-[11px] mt-4 pt-1">
//             Open Page{" "}
//             <ChevronRight
//               size={14}
//               className="text-white/30 group-hover:text-white/60 transition mt-1"
//             />
//           </span>
//         </Link>
//       ))}
//     </div>
//   </motion.div>
// );

// export default QuickLinks;


import { Link } from "react-router-dom";
import { ArrowUpRight, Zap } from "lucide-react";

import { QUICK_LINKS } from "./dashboardConfig";

export default function QuickLinks() {
  return (
    <section
      aria-labelledby="quick-links-heading"
      className="rounded-3xl border border-emerald-300/5 bg-[#0a122483] p-5 sm:p-6"
    >
      <div className="mb-5">
        <h2
          id="quick-links-heading"
          className="flex items-center gap-2 text-xl font-semibold text-slate-100"
        >
          <Zap
            size={18}
            className="text-amber-300"
            aria-hidden="true"
          />
          Quick Links
        </h2>

        <p className="mt-2 text-xs leading-5 text-slate-400">
          Pick up your next study task.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {QUICK_LINKS.map(
          ({
            path,
            label,
            description,
            icon: Icon,
            color,
            iconColor,
            iconBackground,
            iconBorder,
          }) => (
            <li key={path} className="min-w-0">
              <Link
                to={path}
                className={`
                  group relative flex h-full flex-col
                  overflow-hidden rounded-2xl border-2
                  border-white/10 bg-gradient-to-br ${color}
                  p-3.5 transition-colors duration-200
                  hover:border-emerald-300/10 
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-emerald-300
                  motion-reduce:transition-none
                  sm:p-4
                `}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`
                      inline-flex size-11 shrink-0
                      items-center justify-center rounded-xl
                      border ${iconBorder} ${iconBackground}
                    `}
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                      className={iconColor}
                      aria-hidden="true"
                    />
                  </span>

                  <ArrowUpRight
                    size={16}
                    className="
                      mt-1 shrink-0 text-slate-500
                      transition-colors
                      group-hover:text-emerald-300
                      group-focus-visible:text-emerald-300
                    "
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-4 break-words text-sm font-semibold text-slate-100">
                  {label}
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-slate-400/80 pl-2">
                  {description}
                </p>
              </Link>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}