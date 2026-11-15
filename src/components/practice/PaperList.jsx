import { FileText, Pencil, Plus, Trash2 } from "lucide-react";
import { CARD_CLASS, getMarkColor } from "./practiceConfig";

function formatDate(value) {
  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

export default function PapersList({ papers, onAdd, onEdit, onDelete }) {
  return (
    <section aria-labelledby="all-papers-heading" className={CARD_CLASS}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2
          id="all-papers-heading"
          className="flex items-center gap-2 text-sm font-semibold text-slate-100">
          <FileText size={18} className="text-emerald-300" aria-hidden="true" />
          All Papers
          <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] text-slate-400">
            {papers.length}
          </span>
        </h2>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex min-h-10 items-center gap-1 rounded-lg px-2 text-xs text-emerald-300 hover:bg-emerald-400/10">
          <Plus size={15} aria-hidden="true" />
          Add paper
        </button>
      </div>

      {papers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center">
          <FileText
            size={30}
            className="mx-auto text-emerald-300/60"
            aria-hidden="true"
          />
          <p className="mt-4 text-sm font-medium text-slate-200">
            Your practice history starts here.
          </p>
          <p className="mt-2 text-xs leading-6 text-slate-400">
            Add a past paper or model paper and record your marks.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {papers.map((paper) => (
            <li
              key={paper.id}
              className="rounded-2xl border border-white/10 bg-[#070e1d] p-4">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <span
                    className={`inline-block rounded-md px-2 py-1 text-[9px] font-medium ${
                      paper.paperType === "Past Paper"
                        ? "bg-sky-400/10 text-sky-200"
                        : "bg-violet-400/10 text-violet-200"
                    }`}>
                    {paper.paperType}
                  </span>

                  <h3 className="mt-2 break-words text-sm font-semibold text-white">
                    {paper.paperName || paper.subject}
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-slate-400">
                    {paper.subject} · {formatDate(paper.createdAt)}
                  </p>
                </div>

                <p
                  className={`shrink-0 font-heading text-2xl font-bold ${getMarkColor(paper.marks)}`}>
                  {paper.marks}%
                </p>
              </div>

              <div className="mt-3 flex flex-col gap-3 border-t border-white/5 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-wrap gap-1.5">
                  {(paper.errors || []).map((error) => (
                    <span
                      key={error}
                      className="rounded-lg border border-red-300/10 bg-red-400/[0.06] px-2 py-1 text-[10px] text-red-200">
                      {error}
                    </span>
                  ))}
                </div>

                <div className="flex shrink-0 items-center gap-2 self-end">
                  <button
                    type="button"
                    onClick={() => onEdit(paper)}
                    aria-label={`Edit ${paper.paperName || paper.subject}`}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs text-slate-300 hover:bg-white/5 hover:text-emerald-200">
                    <Pencil size={13} aria-hidden="true" />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(paper.id)}
                    aria-label={`Delete ${paper.paperName || paper.subject}`}
                    className="flex size-10 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:border-red-300/20 hover:bg-red-400/10 hover:text-red-200">
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
