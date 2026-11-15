export const NOTE_TYPES = ["Formula", "Concept", "Definition"];

export const NOTE_STYLES = {
  Formula: {
    color: "text-emerald-200",
    background: "bg-emerald-400/10",
    border: "border-emerald-300/20",
  },
  Concept: {
    color: "text-sky-200",
    background: "bg-sky-400/10",
    border: "border-sky-300/20",
  },
  Definition: {
    color: "text-violet-200",
    background: "bg-violet-400/10",
    border: "border-violet-300/20",
  },
};

export const INPUT_CLASS =
  "min-h-12 w-full min-w-0 rounded-xl border border-white/15 " +
  "bg-[#070e1d] px-4 py-3 text-sm text-white " +
  "placeholder:text-slate-500 focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-emerald-300";

export const ACTION_CLASS =
  "inline-flex min-h-10 items-center justify-center gap-1.5 " +
  "rounded-lg border border-white/10 px-3 text-xs text-slate-300 " +
  "hover:bg-white/5 focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-emerald-300";
