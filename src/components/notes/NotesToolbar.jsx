import { ChevronDown, Filter, Search, Star } from "lucide-react";

import { INPUT_CLASS } from "./notesConfig";

export default function NotesToolbar({
  subjects,
  searchQuery,
  onSearch,
  selectedSubject,
  onSubjectChange,
  favouritesOnly,
  onFavouritesChange,
  visibleCount,
  totalCount,
  onClear,
}) {
  const hasFilters = searchQuery.trim() || selectedSubject || favouritesOnly;

  return (
    <section
      aria-label="Search and filter notes"
      className="rounded-3xl border border-emerald-300/15 bg-[#0a1224] p-4 sm:p-5">
      <div className="flex flex-col gap-3 xl:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />

          <label htmlFor="notes-search" className="sr-only">
            Search notes
          </label>

          <input
            id="notes-search"
            type="search"
            value={searchQuery}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search notes, formulas and tags…"
            className={`${INPUT_CLASS} pl-11`}
          />
        </div>

        <div className="flex min-w-0 gap-2 sm:gap-3">
          <div className="relative min-w-0 flex-1 xl:w-56">
            <Filter
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />

            <label htmlFor="notes-filter-subject" className="sr-only">
              Filter notes by subject
            </label>

            <select
              id="notes-filter-subject"
              value={selectedSubject}
              onChange={(event) => onSubjectChange(event.target.value)}
              className={`${INPUT_CLASS} appearance-none pl-10 pr-9`}>
              <option value="">All subjects</option>

              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>

            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
          </div>

          <button
            type="button"
            aria-label="Show favourites only"
            aria-pressed={favouritesOnly}
            onClick={() => onFavouritesChange(!favouritesOnly)}
            className={`
              inline-flex min-h-12 shrink-0 items-center
              justify-center gap-2 rounded-xl border px-4
              text-xs font-medium focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-amber-300
              ${
                favouritesOnly
                  ? "border-amber-300/35 bg-amber-400/10 text-amber-200"
                  : "border-white/15 bg-white/[0.02] text-slate-300 hover:bg-white/5"
              }
            `}>
            <Star
              size={17}
              className={favouritesOnly ? "fill-amber-200" : ""}
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Favourites</span>
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p role="status" className="text-xs text-slate-400">
          {visibleCount} of {totalCount} {totalCount === 1 ? "note" : "notes"}
        </p>

        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="min-h-9 rounded-lg px-2 text-xs text-emerald-300 hover:bg-emerald-400/10">
            Clear filters
          </button>
        )}
      </div>
    </section>
  );
}
