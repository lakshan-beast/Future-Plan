import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, RotateCcw, Music, VolumeX } from "lucide-react";

import HourglassVisual from "./HourglassVisual";
import { formatFocusTime } from "../../utils/focusViewUtils";

export default function FocusTimerCard({
  subjects,
  subjectsLoading,
  session,
  secondsLeft,
  progress,
  saving,
  onSubjectChange,
  onStart,
  onPause,
  onReset,
}) {
  const audioRef = useRef(null);
  const [musicOn, setMusicOn] = useState(false);
  const [audioError, setAudioError] = useState("");

  const running = session.status === "running";
  const completed = session.status === "completed";
  const locked = session.status !== "idle";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let active = true;

    if (running && musicOn) {
      audio.play().catch(() => {
        if (active) {
          setAudioError(
            "Music could not play. Check the audio file or try again.",
          );
          setMusicOn(false);
        }
      });
    } else {
      audio.pause();
    }

    return () => {
      active = false;
      audio.pause();
    };
  }, [running, musicOn]);

  const options = [
    ...new Set([...(session.subject ? [session.subject] : []), ...subjects]),
  ];

  const iconButton =
    "flex size-12 items-center justify-center rounded-xl " +
    "border border-white/15 bg-white/5 text-slate-300 " +
    "hover:bg-white/10 focus-visible:outline-2 " +
    "focus-visible:outline-offset-2 focus-visible:outline-emerald-300 " +
    "disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <section
      aria-label="Focus session timer"
      className="rounded-3xl border border-emerald-300/20 bg-[#0a1224] p-5 sm:p-6">
      <label
        htmlFor="focus-subject"
        className="mb-2 block text-sm font-medium text-slate-200">
        Study subject
      </label>

      <select
        id="focus-subject"
        value={session.subject}
        onChange={(event) => onSubjectChange(event.target.value)}
        disabled={locked || subjectsLoading}
        className="min-h-12 w-full rounded-xl border border-white/15 bg-[#080f20] px-4 text-sm text-white focus-visible:outline-2 focus-visible:outline-emerald-300 disabled:opacity-60">
        <option value="" disabled>
          {subjectsLoading ? "Loading subjects…" : "Select a subject"}
        </option>

        {options.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>

      {!subjectsLoading && options.length === 0 && (
        <Link
          to="/onboarding"
          className="mt-3 inline-block text-xs text-emerald-300 underline underline-offset-4">
          Add subjects to your profile
        </Link>
      )}

      <div className="py-4 text-center">
        <HourglassVisual progress={progress} running={running} />

        <p className="text-xs text-emerald-200">
          {completed
            ? "Session complete. Well done."
            : running
              ? "One task. Your full attention."
              : session.status === "paused"
                ? "Paused. Continue when you are ready."
                : "Make room for 25 minutes of focus."}
        </p>

        <p
          role="timer"
          aria-live="off"
          aria-label={`${Math.floor(secondsLeft / 60)} minutes and ${secondsLeft % 60} seconds remaining`}
          className="mt-4 font-heading text-6xl font-bold tabular-nums tracking-tight text-white">
          {formatFocusTime(secondsLeft)}
        </p>

        <div
          role="progressbar"
          aria-label="Focus session completed"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          className="mx-auto mt-5 h-1.5 max-w-xs overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-200"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={running ? onPause : onStart}
            disabled={completed || saving || (!running && !session.subject)}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-emerald-300 px-6 text-sm font-semibold text-emerald-950 hover:bg-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 disabled:cursor-not-allowed disabled:opacity-50">
            {running ? (
              <Pause size={18} aria-hidden="true" />
            ) : (
              <Play size={18} aria-hidden="true" />
            )}

            {completed
              ? "Completed"
              : running
                ? "Pause"
                : session.status === "paused"
                  ? "Resume"
                  : "Start focus"}
          </button>

          <button
            type="button"
            onClick={onReset}
            disabled={saving}
            aria-label={completed ? "Prepare a new session" : "Reset timer"}
            title={completed ? "New session" : "Reset timer"}
            className={iconButton}>
            <RotateCcw size={18} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => {
              setAudioError("");
              setMusicOn((value) => !value);
            }}
            aria-label="Background music"
            aria-pressed={musicOn}
            className={`${iconButton} ${
              musicOn ? "border-emerald-300/30 text-emerald-300" : ""
            }`}>
            {musicOn ? (
              <Music size={18} aria-hidden="true" />
            ) : (
              <VolumeX size={18} aria-hidden="true" />
            )}
          </button>
        </div>

        <p role="status" className="mt-4 text-xs text-slate-400">
          {saving
            ? "Updating your study stats…"
            : completed
              ? "Use the reset button to prepare your next session."
              : "Only completed sessions count towards your stats."}
        </p>

        {audioError && (
          <p role="alert" className="mt-3 text-xs text-amber-200">
            {audioError}
          </p>
        )}
      </div>

      <audio ref={audioRef} src="/bg-music.wav" preload="none" loop />
    </section>
  );
}
