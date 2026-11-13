// src/utils/dashboardUtils.js

const pad = (n) => String(n).padStart(2, "0");

// Accepts Date | ISO string | Firestore Timestamp. Returns Date or null.
export const parseDate = (value) => {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate();
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

// Local-timezone day key (YYYY-MM-DD). Avoids the UTC shift of toISOString().
export const toDateKey = (value) => {
  const d = parseDate(value);
  if (!d) return null;
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const getSessionDate = (session) =>
  session?.createdAt || session?.startedAt || null;

// Whole calendar days between today and the exam day (negative = passed)
export const getDaysLeft = (examDate) => {
  if (!examDate) return null;
  const startOfDay = (d) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  return Math.round((startOfDay(examDate) - startOfDay(new Date())) / 86400000);
};

// Consecutive days (ending today, or yesterday if nothing today yet) with a session
export const computeStreak = (focusHistory) => {
  const days = new Set(
    focusHistory.map((f) => toDateKey(getSessionDate(f))).filter(Boolean),
  );

  const d = new Date();
  if (!days.has(toDateKey(d))) d.setDate(d.getDate() - 1);

  let streak = 0;
  while (days.has(toDateKey(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
};

// Session counts for today and the previous 6 days (oldest first)
export const getLast7Days = (focusHistory) => {
  const counts = {};
  focusHistory.forEach((f) => {
    const key = toDateKey(getSessionDate(f));
    if (key) counts[key] = (counts[key] || 0) + 1;
  });

  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = toDateKey(d);
    days.push({
      key,
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      count: counts[key] || 0,
    });
  }
  return days;
};

// Most recent paper or focus session
export const buildLastActivity = (papers, focusHistory) => {
  const joinDetail = (...parts) => parts.filter(Boolean).join(" · ");

  const activities = [
    ...papers.map((p) => {
      const score = p.percentage ?? p.marks;
      return {
        title: p.paperName || "Past paper",
        detail: joinDetail(
          p.subject,
          score !== undefined && score !== null ? `${score}%` : null,
        ),
        date: parseDate(p.createdAt),
      };
    }),
    ...focusHistory.map((f) => ({
      title: "Focus session",
      detail: joinDetail(
        f.subject,
        f.duration !== undefined ? `${f.duration} min` : null,
      ),
      date: parseDate(getSessionDate(f)),
    })),
  ].filter((a) => a.date);

  if (!activities.length) return null;
  return activities.sort((a, b) => b.date - a.date)[0];
};
