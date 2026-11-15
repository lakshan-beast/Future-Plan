import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

export function formatFocusMinutes(value) {
  const minutes = Math.max(0, Math.floor(Number(value) || 0));
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;

  return hours > 0 ? `${hours}h ${remaining}m` : `${remaining}m`;
}

export function useLeaderboard() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalUsers, setTotalUsers] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
  }, []);

  const uid = user?.uid;

  useEffect(() => {
    let active = true;

    setLeaders([]);
    setTotalUsers(null);
    setError("");

    if (!authReady) return;

    if (!uid) {
      setLoading(false);
      return;
    }

    setLoading(true);

    async function loadLeaderboard() {
      const usersCollection = collection(db, "users");

      const leaderboardQuery = query(
        usersCollection,
        orderBy("focusStats.totalMinutes", "desc"),
        limit(50),
      );

      const [rankingsResult, countResult] = await Promise.allSettled([
        getDocs(leaderboardQuery),
        getCountFromServer(usersCollection),
      ]);

      if (!active) return;

      if (rankingsResult.status === "fulfilled") {
        const data = rankingsResult.value.docs
          .map((snapshot) => {
            const data = snapshot.data();

            const rawMinutes = Number(data.focusStats?.totalMinutes);

            const rawStreak = Number(data.focusStats?.currentStreak);

            return {
              id: snapshot.id,
              displayName:
                typeof data.displayName === "string" && data.displayName.trim()
                  ? data.displayName.trim()
                  : "Student",
              photoURL: typeof data.photoURL === "string" ? data.photoURL : "",
              totalMinutes: Number.isFinite(rawMinutes)
                ? Math.max(0, rawMinutes)
                : 0,
              currentStreak: Number.isFinite(rawStreak)
                ? Math.max(0, Math.floor(rawStreak))
                : 0,
            };
          })
          .filter((leader) => leader.totalMinutes > 0);

        setLeaders(data);
      } else {
        setError(
          "Unable to load the leaderboard. Please check your connection and try again.",
        );
      }

      if (countResult.status === "fulfilled") {
        setTotalUsers(countResult.value.data().count);
      }

      setLoading(false);
    }

    loadLeaderboard();

    return () => {
      active = false;
    };
  }, [authReady, uid, refreshKey]);

  return {
    user,
    authReady,
    leaders,
    totalUsers,
    loading,
    error,
    refresh: () => setRefreshKey((value) => value + 1),
  };
}
