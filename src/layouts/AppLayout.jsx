import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import ScrollToTop from "../components/ScrollTop";
import Navbar from "../components/Navbar";
import NotificationToasts from "../components/NotificationToasts";

export default function AppLayout() {
  return (
    <div className="min-h-dvh bg-app text-content">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

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
