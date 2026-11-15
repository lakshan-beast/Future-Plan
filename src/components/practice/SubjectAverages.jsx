import { Award } from "lucide-react";
import { CARD_CLASS, getMarkColor } from "./practiceConfig";

export default function SubjectAverages({ subjects }) {
  return (
    <section aria-labelledby="subject-averages-heading" className={CARD_CLASS}>
      <h2
        id="subject-averages-heading"
        className="flex items-center gap-2 text-sm font-semibold text-slate-100"
      >
        <Award size={18} className="text-amber-300" aria-hidden="true" />
        Subject Averages
      </h2>

      <p className="mt-2 text-xs leading-6 text-slate-400">
        Average marks across your recorded papers.
      </p>

      {subjects.length === 0 ? (
        <p className="mt-5 rounded-xl bg-white/[0.02] p-4 text-sm leading-6 text-slate-400">
          Add your first paper to see subject averages.
        </p>
      ) : (
        <ul className="mt-5 space-y-5">
          {subjects.map((subject) => (
            <li key={subject.subject}>
              <div className="mb-2 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="break-words text-xs font-medium text-slate-200">
                    {subject.subject}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    {subject.count} {subject.count === 1 ? "paper" : "papers"}
                  </p>
                </div>

                <p className={`text-sm font-semibold ${getMarkColor(subject.average)}`}>
                  {subject.average}%
                </p>
              </div>

              <div
                role="progressbar"
                aria-label={`${subject.subject} average marks`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={subject.average}
                className="h-1.5 overflow-hidden rounded-full bg-white/10"
              >
                <div
                  style={{ width: `${subject.average}%` }}
                  className={`h-full rounded-full ${
                    subject.average >= 75
                      ? "bg-emerald-400"
                      : subject.average >= 50
                        ? "bg-amber-400"
                        : "bg-red-400"
                  }`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}