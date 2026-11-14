// src/components/dashboard/ToolsSection.jsx
import { motion } from "motion/react";
import { TOOLS } from "./dashboardConfig";

const ToolsSection = () => (
  <motion.div
    className="sm:mb-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}>
    <h3 className="font-heading text-lg font-bold mb-3">Tools</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-2">
      {TOOLS.map(({ label, icon: Icon, color, iconColor, comingSoon }) => (
        <div
          key={label}
          className={`rounded-2xl border border-white/10 bg-gradient-to-br ${color} backdrop-blur-xl p-4 ${
            comingSoon ? "opacity-60" : ""
          }`}>
          <div className="flex items-center justify-between mb-2">
            <Icon size={22} className={iconColor} />
            {comingSoon && (
              <span className="font-body text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                Coming soon
              </span>
            )}
          </div>
          <p className="font-body text-sm font-medium">{label}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

export default ToolsSection;
