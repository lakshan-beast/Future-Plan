export function getLocalDateKey(value) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

export function buildWeeklyFocus(history, now = new Date()) {
  const totals = new Map();

  for (const session of history) {
    if (!session.createdAt) continue;

    const key = getLocalDateKey(session.createdAt);
    const minutes = Number(session.duration);

    if (key && Number.isFinite(minutes) && minutes > 0) {
      totals.set(key, (totals.get(key) || 0) + minutes);
    }
  }

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (6 - index));

    const key = getLocalDateKey(date);

    return {
      key,
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      minutes: totals.get(key) || 0,
    };
  });
}

export function getFocusStreak(history, now = new Date()) {
  const activeDays = new Set(
    history
      .filter((session) => Number(session.duration) > 0)
      .map((session) =>
        session.createdAt ? getLocalDateKey(session.createdAt) : null,
      )
      .filter(Boolean),
  );

  const date = new Date(now);

  if (!activeDays.has(getLocalDateKey(date))) {
    date.setDate(date.getDate() - 1);
  }

  let streak = 0;

  while (activeDays.has(getLocalDateKey(date))) {
    streak += 1;
    date.setDate(date.getDate() - 1);
  }

  return streak;
}

export function formatFocusTime(seconds) {
  const safeSeconds = Math.max(0, Math.ceil(seconds));

  return [
    String(Math.floor(safeSeconds / 60)).padStart(2, "0"),
    String(safeSeconds % 60).padStart(2, "0"),
  ].join(":");
}
