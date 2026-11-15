import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import ScrollToTop from "../components/ScrollTop";
import Navbar from "../components/Navbar";
import NotificationToasts from "../components/NotificationToasts";
import AchievementModal from "../components/dashboard/AchievementModal";

function readSeenBadges(uid) {
  try {
    const value = JSON.parse(
      localStorage.getItem(`dreamutrack-unlocked-badges-${uid}`) || "[]",
    );

    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export default function AppLayout() {
  const [uid, setUid] = useState(null);
  const [badgeQueue, setBadgeQueue] = useState([]);

  //   const nextBadge = badges.find((badge) => !badge.unlocked);
  const currentBadge = badgeQueue[0] || null;
  function handleCloseAchievement() {
    if (!currentBadge || !uid) return;

    try {
      const seen = readSeenBadges(uid);

      localStorage.setItem(
        `dreamutrack-unlocked-badges-${uid}`,
        JSON.stringify([...new Set([...seen, currentBadge.id])]),
      );
    } catch {
      // Keep the modal usable if browser storage is unavailable.
    }

    setBadgeQueue((queue) => queue.slice(1));
  }

  return (
    <div className="min-h-dvh bg-app text-content">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <AchievementModal badge={currentBadge} onClose={handleCloseAchievement} />

      <ScrollToTop />

      <Navbar />

      <div className="flex">
        <Sidebar />

        <main
          id="main-content"
          tabIndex={-1}
          className="
            mt-2 min-w-0 flex-1
            px-4 pb-24
            sm:px-6
            lg:ml-72 lg:px-8 lg:pb-8
          ">
          <Outlet />
        </main>
      </div>

      <NotificationToasts />
      <BottomNav />
    </div>
  );
}
