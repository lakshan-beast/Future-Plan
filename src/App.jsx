import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Focus from "./pages/Focus";
import Notes from "./pages/Notes";
import Practice from "./pages/Practice";
import Insights from "./pages/Insights";
import Leaderboard from "./pages/LeaderBoard";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/onboarding",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Onboarding />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "focus",
            element: <Focus />,
          },
          {
            path: "notes",
            element: <Notes />,
          },
          {
            path: "practice",
            element: <Practice />,
          },
          {
            path: "insights",
            element: <Insights />,
          },
          {
            path: "leaderboard",
            element: <Leaderboard />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
