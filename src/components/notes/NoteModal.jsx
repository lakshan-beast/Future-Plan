import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AlertCircle, BookOpen, Check, X } from "lucide-react";

import { INPUT_CLASS, NOTE_TYPES } from "./notesConfig";

export default function NoteModal({
  open,
  editingId,
  subjects,
  form,
  error,
  onChange,
  onSave,
  onClose,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    dialog.showModal();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  const options = [
    ...new Set([
      ...subjects,
      ...(form.subject ? [form.subject] : []),
    ]),
  ];

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby="note-modal-heading"
      onCancel={onClose}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-xl overflow-y-auto rounded-3xl border border-emerald-300/20 bg-[#0a1224] p-0 text-white shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-[#0a1224] px-5 py-4">
        <h2
          id="note-modal-heading"
          className="flex items-center gap-2 font-heading text-xl font-bold"
        >
          <BookOpen
            size={20}
            className="text-emerald-300"
            aria-hidden="true"
          />
          {editingId !== null ? "Edit Note" : "Add Note"}
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close note form"
          className="flex size-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 hover:bg-white/5"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onSave();
        }}
        className="space-y-5 p-5 sm:p-6"
      >
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-slate-200">
            Note type
          </legend>

          <div className="grid grid-cols-3 gap-2">
            {NOTE_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                aria-pressed={form.noteType === type}
                onClick={() => onChange("noteType", type)}
                className={`min-h-11 rounded-xl border px-2 py-2 text-xs font-medium ${
                  form.noteType === type
                    ? "border-emerald-300/40 bg-emerald-400/10 text-emerald-200"
                    : "border-white/10 bg-white/[0.02] text-slate-300 hover:bg-white/5"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="note-title"
            className="mb-2 block text-sm text-slate-200"
          >
            Title
          </label>

          <input
            autoFocus
            id="note-title"
            value={form.title}
            onChange={(event) => onChange("title", event.target.value)}
            placeholder="e.g. Newton's Second Law"
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label
            htmlFor="note-formula"
            className="mb-2 block text-sm text-slate-200"
          >
            {form.noteType === "Formula" ? "Formula" : "Key point"}
          </label>

          <textarea
            id="note-formula"
            rows={3}
            value={form.formula}
            onChange={(event) =>
              onChange("formula", event.target.value)
            }
            placeholder={
              form.noteType === "Formula"
                ? "e.g. F = ma"
                : "Write the main concept or definition…"
            }
            className={`${INPUT_CLASS} resize-y font-mono leading-7`}
          />
        </div>

        <div>
          <label
            htmlFor="note-subject"
            className="mb-2 block text-sm text-slate-200"
          >
            Subject
          </label>

          <select
            id="note-subject"
            value={form.subject}
            onChange={(event) =>
              onChange("subject", event.target.value)
            }
            className={INPUT_CLASS}
          >
            <option value="">General / No specific subject</option>

            {options.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="note-explanation"
            className="mb-2 block text-sm text-slate-200"
          >
            Explanation{" "}
            <span className="text-xs text-slate-400">· Optional</span>
          </label>

          <textarea
            id="note-explanation"
            rows={3}
            value={form.explanation}
            onChange={(event) =>
              onChange("explanation", event.target.value)
            }
            placeholder="Explain it in your own words…"
            className={`${INPUT_CLASS} resize-y leading-7`}
          />
        </div>

        <div>
          <label
            htmlFor="note-example"
            className="mb-2 block text-sm text-slate-200"
          >
            Example{" "}
            <span className="text-xs text-slate-400">· Optional</span>
          </label>

          <textarea
            id="note-example"
            rows={2}
            value={form.example}
            onChange={(event) =>
              onChange("example", event.target.value)
            }
            placeholder="e.g. F = 5 kg × 2 m/s² = 10 N"
            className={`${INPUT_CLASS} resize-y leading-7`}
          />
        </div>

        <div>
          <label
            htmlFor="note-tags"
            className="mb-2 block text-sm text-slate-200"
          >
            Tags{" "}
            <span className="text-xs text-slate-400">· Optional</span>
          </label>

          <input
            id="note-tags"
            value={form.tags}
            onChange={(event) => onChange("tags", event.target.value)}
            placeholder="mechanics, dynamics, revision"
            aria-describedby="note-tags-help"
            className={INPUT_CLASS}
          />

          <p
            id="note-tags-help"
            className="mt-2 text-xs leading-5 text-slate-400"
          >
            Separate tags with commas.
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-300/20 bg-red-400/10 p-3 text-sm leading-6 text-red-200"
          >
            <AlertCircle
              size={17}
              className="mt-0.5 shrink-0"
              aria-hidden="true"
            />
            {error}
          </p>
        )}

        <div className="border-t border-white/10 pt-4">
          <button
            type="submit"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-300 px-4 text-sm font-semibold text-emerald-950 hover:bg-emerald-200"
          >
            <Check size={18} aria-hidden="true" />
            {editingId !== null ? "Update Note" : "Save Note"}
          </button>

          <p className="mt-3 text-center text-[11px] leading-6 text-slate-400">
            Changes are saved when you press this button.
          </p>
        </div>
      </form>
    </dialog>,
    document.body,
  );
}