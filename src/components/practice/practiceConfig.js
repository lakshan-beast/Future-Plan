export const ERROR_OPTIONS = [
  "Time Management",
  "Theory",
  "Calculation",
  "Careless Mistakes",
  "Concept Gap",
  "Question Misunderstood",
];

export const PAPER_TYPES = ["Past Paper", "Model Paper"];

export const CARD_CLASS =
  "min-w-0 rounded-3xl border border-emerald-300/15 " +
  "bg-[#0a1224] p-5 sm:p-6";

export const INPUT_CLASS =
  "min-h-12 w-full min-w-0 rounded-xl border border-white/15 " +
  "bg-[#070e1d] px-4 py-3 text-sm text-white " +
  "placeholder:text-slate-500 focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-emerald-300";

export function getMarkColor(marks) {
  if (marks >= 75) return "text-emerald-300";
  if (marks >= 50) return "text-amber-300";
  return "text-red-300";
}
