export default function InsightsCard({
  id,
  title,
  description,
  icon: Icon,
  children,
}) {
  return (
    <section
      aria-labelledby={id}
      className="min-w-0 rounded-3xl border border-emerald-300/15 bg-[#0a1224] p-5 sm:p-6">
      <h2
        id={id}
        className="flex items-center gap-2 text-sm font-semibold text-slate-100">
        {Icon && (
          <Icon
            size={18}
            className="shrink-0 text-emerald-300"
            aria-hidden="true"
          />
        )}
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-xs leading-tight text-slate-400">{description}</p>
      )}

      <div className="mt-5">{children}</div>
    </section>
  );
}

export function InsightsEmpty({ children }) {
  return (
    <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm leading-tight text-slate-400">
      {children}
    </p>
  );
}
