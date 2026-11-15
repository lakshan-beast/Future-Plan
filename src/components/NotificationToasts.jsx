// // src/components/NotificationToasts.jsx
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { X, Bell } from "lucide-react";
// import { Link } from "react-router-dom";
// import { NOTIFICATION_EVENT } from "../utils/notification";

// const MESSAGES = [
//   {
//     message: "ඔයාගේ streak leaderboard එක අද බැලුවද?",
//     link: "/leaderboard",
//     label: "Check leaderboard",
//   },
//   {
//     message: "අද focus session එකක් කරන්න — streak එක රැකගන්න.",
//     link: "/focus",
//     label: "Start focus",
//   },
//   {
//     message: "අලුත් paper එකක් add කරලා progress බලන්න.",
//     link: "/practice",
//     label: "Add paper",
//   },
// ];

// const NotificationToasts = () => {
//   const [toast, setToast] = useState(null);
//   const [msgIndex, setMsgIndex] = useState(0);

//   // Every 5 min — rotating message
//   useEffect(() => {
//     const show = () => {
//       const msg = MESSAGES[msgIndex % MESSAGES.length];
//       setToast({ ...msg, id: Date.now() });
//       setMsgIndex((i) => i + 1);

//       // Auto dismiss — 8s
//       setTimeout(() => setToast(null), 8000);
//     };

//     const interval = setInterval(show, 5 * 60 * 1000); // 5 min
//     return () => clearInterval(interval);
//   }, [msgIndex]);

//   // Listen — custom events (future use)
//   useEffect(() => {
//     const handler = (e) => setToast(e.detail);
//     window.addEventListener(NOTIFICATION_EVENT, handler);
//     return () => window.removeEventListener(NOTIFICATION_EVENT, handler);
//   }, []);

//   return (
//     <AnimatePresence>
//       {toast && (
//         <motion.div
//           initial={{ opacity: 0, y: 30, scale: 0.95 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           exit={{ opacity: 0, y: 30, scale: 0.95 }}
//           className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-80 z-[90] rounded-2xl border border-white/15 bg-[#0e1424]/95 backdrop-blur-xl shadow-2xl p-4">
//           <div className="flex items-start gap-3">
//             <div className="w-9 h-9 rounded-xl bg-emerald-400/15 flex items-center justify-center shrink-0">
//               <Bell size={16} className="text-emerald-300" />
//             </div>

//             <div className="flex-1 min-w-0">
//               <p className="font-body text-sm text-white/80">{toast.message}</p>

//               {toast.link && (
//                 <Link
//                   to={toast.link}
//                   onClick={() => setToast(null)}
//                   className="font-body text-xs text-emerald-300 hover:text-emerald-200 mt-1.5 inline-block">
//                   {toast.label} →
//                 </Link>
//               )}
//             </div>

//             <button
//               type="button"
//               onClick={() => setToast(null)}
//               aria-label="Dismiss"
//               className="text-white/30 hover:text-white transition shrink-0">
//               <X size={16} />
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default NotificationToasts;

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Bell,
  CheckCircle2,
  CircleAlert,
  Info,
  X,
} from "lucide-react";

import { NOTIFICATION_EVENT } from "../utils/notification";

const REMINDER_INTERVAL = 5 * 60 * 1000;
const DEFAULT_DURATION = 10_000;

const MESSAGES = [
  {
    message: "DreamTrack community එකේ study progress එක බලන්න.",
    link: "/leaderboard",
    label: "View leaderboard",
  },
  {
    message: "පාඩම් කරන්න වෙලාවක්ද? Focus session එකක් පටන්ගන්න.",
    link: "/focus",
    label: "Start focus",
  },
  {
    message: "කරපු paper එකක marks සටහන් කරලා progress එක බලන්න.",
    link: "/practice",
    label: "Open practice",
  },
];

const TOAST_STYLES = {
  info: {
    icon: Info,
    title: "DreamTrack",
    color: "text-sky-200",
    background: "bg-sky-400/10",
    border: "border-sky-300/20",
  },
  success: {
    icon: CheckCircle2,
    title: "Completed",
    color: "text-emerald-200",
    background: "bg-emerald-400/10",
    border: "border-emerald-300/20",
  },
  error: {
    icon: CircleAlert,
    title: "Something needs attention",
    color: "text-red-200",
    background: "bg-red-400/10",
    border: "border-red-300/20",
  },
  reminder: {
    icon: Bell,
    title: "Study reminder",
    color: "text-amber-200",
    background: "bg-amber-400/10",
    border: "border-amber-300/20",
  },
};

function normalizeToast(detail, id) {
  if (!detail || typeof detail.message !== "string" || !detail.message.trim()) {
    return null;
  }

  const type = Object.prototype.hasOwnProperty.call(TOAST_STYLES, detail.type)
    ? detail.type
    : "info";

  // Only allow internal app links.
  const link =
    typeof detail.link === "string" &&
    /^\/(?!\/)/.test(detail.link) &&
    !/[\\\s]/.test(detail.link)
      ? detail.link
      : null;

  const requestedDuration = Number(detail.duration);

  const duration =
    detail.duration === 0
      ? 0
      : Number.isFinite(requestedDuration) && requestedDuration > 0
        ? Math.max(5000, requestedDuration)
        : type === "error"
          ? 0
          : DEFAULT_DURATION;

  return {
    id,
    type,
    message: detail.message.trim(),
    title:
      typeof detail.title === "string" && detail.title.trim()
        ? detail.title.trim()
        : TOAST_STYLES[type].title,
    link,
    label:
      typeof detail.label === "string" && detail.label.trim()
        ? detail.label.trim()
        : "Open page",
    duration,
  };
}

export default function NotificationToasts() {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();

  const [toast, setToast] = useState(null);

  const toastRef = useRef(null);
  const containerRef = useRef(null);
  const sequenceRef = useRef(0);
  const messageIndexRef = useRef(0);

  const timerRef = useRef(null);
  const startedAtRef = useRef(0);
  const remainingRef = useRef(0);
  const pauseReasonsRef = useRef(new Set());

  function clearTimer() {
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }

  function dismissToast() {
    clearTimer();
    toastRef.current = null;
    setToast(null);
  }

  function startDismissTimer() {
    clearTimer();

    const current = toastRef.current;

    if (
      !current ||
      current.duration === 0 ||
      pauseReasonsRef.current.size > 0
    ) {
      return;
    }

    const toastId = current.id;
    startedAtRef.current = Date.now();

    timerRef.current = window.setTimeout(
      () => {
        if (toastRef.current?.id === toastId) {
          dismissToast();
        }
      },
      Math.max(0, remainingRef.current),
    );
  }

  function pauseDismiss(reason) {
    if (pauseReasonsRef.current.has(reason)) return;

    if (pauseReasonsRef.current.size === 0 && timerRef.current !== null) {
      remainingRef.current = Math.max(
        0,
        remainingRef.current - (Date.now() - startedAtRef.current),
      );

      clearTimer();
    }

    pauseReasonsRef.current.add(reason);
  }

  function resumeDismiss(reason) {
    pauseReasonsRef.current.delete(reason);

    if (pauseReasonsRef.current.size === 0) {
      startDismissTimer();
    }
  }

  function showToast(detail) {
    const next = normalizeToast(detail, ++sequenceRef.current);

    if (!next) return;

    clearTimer();

    const reasons = new Set();

    if (document.hidden) {
      reasons.add("hidden");
    }

    const container = containerRef.current;

    if (container?.matches(":hover")) {
      reasons.add("pointer");
    }

    if (container?.contains(document.activeElement)) {
      reasons.add("focus");
    }

    pauseReasonsRef.current = reasons;
    remainingRef.current = next.duration;
    toastRef.current = next;
    setToast(next);

    startDismissTimer();
  }

  // Optional study reminders.
  useEffect(() => {
    // No promotional reminders on the Focus page.
    if (pathname === "/focus" || pathname.startsWith("/focus/")) {
      return;
    }

    const interval = window.setInterval(() => {
      // Do not interrupt an existing toast, hidden page or modal.
      if (
        document.hidden ||
        toastRef.current ||
        document.querySelector("dialog[open]")
      ) {
        return;
      }

      const availableMessages = MESSAGES.filter(
        (message) => message.link !== pathname,
      );

      if (!availableMessages.length) return;

      const message =
        availableMessages[messageIndexRef.current % availableMessages.length];

      messageIndexRef.current += 1;

      showToast({
        ...message,
        type: "reminder",
      });
    }, REMINDER_INTERVAL);

    return () => window.clearInterval(interval);
  }, [pathname]);

  // Existing custom notification events.
  useEffect(() => {
    function handleNotification(event) {
      showToast(event.detail);
    }

    function handleVisibility() {
      if (document.hidden) {
        pauseDismiss("hidden");
      } else {
        resumeDismiss("hidden");
      }
    }

    window.addEventListener(NOTIFICATION_EVENT, handleNotification);

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearTimer();

      window.removeEventListener(NOTIFICATION_EVENT, handleNotification);

      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Clear a study reminder when navigating elsewhere.
  useEffect(() => {
    if (toastRef.current?.type === "reminder") {
      dismissToast();
    }
  }, [pathname]);

  const style = toast ? TOAST_STYLES[toast.type] : TOAST_STYLES.info;

  const Icon = style.icon;

  return (
    <>
      {/* Keep the live region mounted for announcements. */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only">
        {toast ? `${toast.title}. ${toast.message}` : ""}
      </div>

      <AnimatePresence>
        {toast && (
          <motion.aside
            key={toast.id}
            ref={containerRef}
            aria-label="DreamTrack notification"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
            onPointerEnter={() => pauseDismiss("pointer")}
            onPointerLeave={() => resumeDismiss("pointer")}
            onFocusCapture={() => pauseDismiss("focus")}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                resumeDismiss("focus");
              }
            }}
            className={`
              fixed inset-x-3
              bottom-[calc(6rem+env(safe-area-inset-bottom))]
              z-[90] rounded-2xl border bg-[#0a1224]
              p-4 text-white shadow-2xl shadow-black/40
              sm:left-auto sm:right-5 sm:w-96
              lg:bottom-6 lg:right-6
              ${style.border}
            `}>
            <div className="flex items-start gap-3">
              <span
                className={`
                  mt-0.5 flex size-10 shrink-0
                  items-center justify-center rounded-xl
                  ${style.background}
                `}>
                <Icon size={19} className={style.color} aria-hidden="true" />
              </span>

              <div className="min-w-0 flex-1">
                <h2 className="text-xs font-semibold text-slate-100">
                  {toast.title}
                </h2>

                <p className="mt-1.5 break-words text-sm leading-6 text-slate-300">
                  {toast.message}
                </p>

                {toast.link && (
                  <Link
                    to={toast.link}
                    onClick={dismissToast}
                    className="
                      mt-2 inline-flex min-h-10
                      items-center gap-1.5 rounded-lg
                      px-1 text-xs font-medium
                      text-emerald-300
                      hover:text-emerald-100
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-emerald-300
                    ">
                    {toast.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                )}
              </div>

              <button
                type="button"
                onClick={dismissToast}
                aria-label="Dismiss notification"
                className="
                  -mr-1 -mt-1 flex size-10 shrink-0
                  items-center justify-center rounded-xl
                  text-slate-400 hover:bg-white/5
                  hover:text-white
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-emerald-300
                ">
                <X size={17} aria-hidden="true" />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
