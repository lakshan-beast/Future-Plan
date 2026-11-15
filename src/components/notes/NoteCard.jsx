import { useEffect, useRef, useState } from "react";
import { Check, Copy, Edit3, Star, Trash2 } from "lucide-react";

import { ACTION_CLASS, NOTE_STYLES } from "./notesConfig";

export default function NoteCard({
  note,
  disabled,
  onFavourite,
  onEdit,
  onDelete,
}) {
  const [copyStatus, setCopyStatus] = useState("");
  const timeoutRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const style = NOTE_STYLES[note.noteType] || NOTE_STYLES.Formula;

  async function copyNote() {
    window.clearTimeout(timeoutRef.current);

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(note.formula || "");

      if (!mountedRef.current) return;
      setCopyStatus("Copied to clipboard.");
    } catch {
      if (!mountedRef.current) return;
      setCopyStatus("Could not copy. Select the text and copy it manually.");
    }

    timeoutRef.current = window.setTimeout(() => {
      if (mountedRef.current) setCopyStatus("");
    }, 3500);
  }

  const tags = Array.isArray(note.tags) ? [...new Set(note.tags)] : [];

  return (
    <article className="flex h-full min-w-0 flex-col rounded-3xl border border-white/10 bg-[#0a1224] p-5 transition-colors hover:border-emerald-300/25">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span
            className={`inline-block rounded-lg border px-2.5 py-1 text-[10px] font-medium ${style.color} ${style.background} ${style.border}`}>
            {note.noteType || "Formula"}
          </span>

          <h2 className="mt-3 wrap-break-word font-heading text-lg font-bold leading-snug text-white">
            {note.title}
          </h2>
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onFavourite(note.id)}
          aria-label={
            note.favourite
              ? `Remove ${note.title} from favourites`
              : `Add ${note.title} to favourites`
          }
          aria-pressed={Boolean(note.favourite)}
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:bg-amber-400/10 hover:text-amber-200 disabled:opacity-40">
          <Star
            size={18}
            className={note.favourite ? "fill-amber-200 text-amber-200" : ""}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-emerald-300/10 bg-[#050c19] p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[10px] uppercase tracking-wider text-slate-400">
            {note.noteType === "Formula" || !note.noteType
              ? "Formula"
              : "Key point"}
          </span>

          <button
            type="button"
            onClick={copyNote}
            aria-label={`Copy ${note.title}`}
            className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/10 px-2.5 text-[11px] text-slate-300 hover:bg-white/5 hover:text-emerald-200">
            {copyStatus === "Copied to clipboard." ? (
              <Check size={13} aria-hidden="true" />
            ) : (
              <Copy size={13} aria-hidden="true" />
            )}
            Copy
          </button>
        </div>

        <p className="whitespace-pre-wrap wrap-break-word font-mono text-sm leading-tight text-emerald-100 [overflow-wrap:anywhere]">
          {note.formula}
        </p>

        {copyStatus && (
          <p role="status" className="mt-3 text-xs leading-tight text-slate-300">
            {copyStatus}
          </p>
        )}
      </div>

      <span className="mt-2 self-start rounded-full border border-white/10 bg-white/3 px-3.5 py-1 text-[11px] text-slate-300">
        {note.subject || "General"}
      </span>

      {note.explanation && (
        <p className="mt-4 whitespace-pre-wrap wrap-break-word text-sm leading-tight text-slate-300">
          {note.explanation}
        </p>
      )}

      {note.example && (
        <div className="mt-4 rounded-xl border-l-2 border-sky-300/40 bg-sky-400/4 px-3 py-2">
          <p className="text-[10px] font-medium uppercase tracking-wider text-sky-200 leading-tight">
            Example
          </p>

          <p className="mt-1 pl-3 whitespace-pre-wrap wrap-break-word text-xs leading-tight text-slate-300">
            {note.example}
          </p>
        </div>
      )}

      {tags.length > 0 && (
        <ul aria-label="Tags" className="mt-4 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <li
              key={tag}
              className="max-w-full wrap-break-word rounded-lg border border-white/5 bg-white/3 px-2 py-1 text-[10px] text-slate-400">
              #{tag}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-5">
        <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => onEdit(note)}
            disabled={disabled}
            className={`${ACTION_CLASS} hover:text-emerald-200 disabled:opacity-40`}>
            <Edit3 size={13} aria-hidden="true" />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(note.id)}
            disabled={disabled}
            className={`${ACTION_CLASS} hover:border-red-300/20 hover:bg-red-400/10 hover:text-red-200 disabled:opacity-40`}>
            <Trash2 size={13} aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
