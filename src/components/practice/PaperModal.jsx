import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AlertCircle, Check, FileText, X } from "lucide-react";

import { ERROR_OPTIONS, INPUT_CLASS, PAPER_TYPES } from "./practiceConfig";

export default function PaperModal({
  open,
  editingId,
  subjects,
  form,
  error,
  onChange,
  onToggleError,
  onSave,
  onClose,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!open || !dialog) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    dialog.showModal();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  const subjectOptions = [
    ...new Set([...subjects, ...(form.subject ? [form.subject] : [])]),
  ];

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby="paper-modal-title"
      onCancel={onClose}
      onClose={onClose}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-3xl border border-emerald-300/20 bg-[#0a1224] p-0 text-white shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-[#0a1224] px-5 py-4">
        <h2
          id="paper-modal-title"
          className="flex items-center gap-2 font-heading text-xl font-bold">
          <FileText size={20} className="text-emerald-300" aria-hidden="true" />
          {editingId ? "Edit Paper" : "Add Paper"}
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close paper form"
          className="flex size-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 hover:bg-white/5">
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <form
        className="space-y-5 p-5 sm:p-6"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onSave();
        }}>
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-slate-200">
            Paper type
          </legend>

          <div className="grid grid-cols-2 gap-2">
            {PAPER_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                aria-pressed={form.paperType === type}
                onClick={() => onChange("paperType", type)}
                className={`min-h-11 rounded-xl border px-3 text-xs font-medium ${
                  form.paperType === type
                    ? "border-emerald-300/40 bg-emerald-400/10 text-emerald-200"
                    : "border-white/10 bg-white/[0.02] text-slate-300 hover:bg-white/5"
                }`}>
                {type}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="paper-subject"
            className="mb-2 block text-sm text-slate-200">
            Subject
          </label>

          <select
            autoFocus
            id="paper-subject"
            value={form.subject}
            onChange={(event) => onChange("subject", event.target.value)}
            className={INPUT_CLASS}>
            <option value="">Select a subject</option>
            {subjectOptions.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="paper-name"
            className="mb-2 block text-sm text-slate-200">
            Paper name{" "}
            <span className="text-xs text-slate-400">· Optional</span>
          </label>
          <input
            id="paper-name"
            value={form.paperName}
            onChange={(event) => onChange("paperName", event.target.value)}
            placeholder="e.g. 2023 Past Paper"
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label
            htmlFor="paper-marks"
            className="mb-2 block text-sm text-slate-200">
            Marks (%)
          </label>
          <input
            id="paper-marks"
            type="number"
            min="0"
            max="100"
            step="any"
            inputMode="decimal"
            value={form.marks}
            onChange={(event) => onChange("marks", event.target.value)}
            placeholder="e.g. 75"
            className={INPUT_CLASS}
          />
        </div>

        <fieldset>
          <legend className="mb-2 text-sm text-slate-200">
            Mistakes <span className="text-xs text-slate-400">· Optional</span>
          </legend>

          <p className="mb-3 text-xs leading-6 text-slate-400">
            Select the areas you want to review before your next paper.
          </p>

          <div className="flex flex-wrap gap-2">
            {ERROR_OPTIONS.map((option) => {
              const selected = form.errors.includes(option);

              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onToggleError(option)}
                  className={`inline-flex min-h-10 items-center gap-1.5 rounded-xl border px-3 py-2 text-left text-xs ${
                    selected
                      ? "border-red-300/30 bg-red-400/10 text-red-200"
                      : "border-white/10 bg-white/[0.02] text-slate-300 hover:bg-white/5"
                  }`}>
                  {selected && <Check size={12} aria-hidden="true" />}
                  {option}
                </button>
              );
            })}
          </div>
        </fieldset>

        {error && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-300/20 bg-red-400/10 p-3 text-sm leading-6 text-red-200">
            <AlertCircle
              size={17}
              className="mt-0.5 shrink-0"
              aria-hidden="true"
            />
            {error}
          </p>
        )}

        <button
          type="submit"
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-300 px-4 text-sm font-semibold text-emerald-950 hover:bg-emerald-200">
          <Check size={18} aria-hidden="true" />
          {editingId ? "Update Paper" : "Save Paper"}
        </button>
      </form>
    </dialog>,
    document.body,
  );
}
