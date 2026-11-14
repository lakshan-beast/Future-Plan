// src/pages/Leaderboard.jsx
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
import { motion } from "motion/react";
import { Trophy, Flame, Clock, Crown } from "lucide-react";
import Loader from "../components/Loader";

const Leaderboard = () => {
  const [user, setUser] = useState(null);
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);

  // ---------------- Auth state ----------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // ---------------- Fetch leaderboard ----------------
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError("");

        const q = query(
          collection(db, "users"),
          orderBy("focusStats.totalMinutes", "desc"),
          limit(50),
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((u) => (u.focusStats?.totalMinutes || 0) > 0);

        setLeaders(data);
      } catch (err) {
        console.error("Leaderboard fetch error:", err);
        setError(
          "Leaderboard load වෙන්නේ නැහැ. Internet connection එක check කරන්න.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError("");

        // Users count
        const countSnapshot = await getCountFromServer(collection(db, "users"));
        setTotalUsers(countSnapshot.data().count);

        // Leaderboard query (existing code)
        const q = query(
          collection(db, "users"),
          orderBy("focusStats.totalMinutes", "desc"),
          limit(50),
        );
        const snapshot = await getDocs(q);
        // ... existing mapping code ...
      } catch (err) {
        // ... existing error handling ...
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // ---------------- Helpers ----------------
  const formatMinutes = (mins) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  //   const getRankBadge = (rank) => {
  //     if (rank === 1) return "🥇";
  //     if (rank === 2) return "🥈";
  //     if (rank === 3) return "🥉";
  //     return `#${rank}`;
  //   };

  const isCurrentUser = (leaderId) => user?.uid === leaderId;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1020]">
        <Loader size="md" />
      </div>
    );
  }

  return (
    <div className="pb-24 md:pb-8 mt-23 lg:mt-6">
      {/* Header */}
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          {/* <Trophy size={22} className="text-amber-300" /> */}
          <h1 className="font-heading text-2xl font-bold">Leaderboard</h1>
        </div>
        <p className="font-body text-sm text-white/50 leading-tight">
          See how your focus time compares with the DreamUTrack community.
        </p>

        {/* Users count — NEW */}
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-body text-xs text-white/60">
            {totalUsers} {totalUsers === 1 ? "student" : "students"} using
            DreamUTrack
          </span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-body text-red-300 mb-4">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader />
        </div>
      ) : leaders.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center">
          <Trophy size={40} className="text-white/20 mx-auto mb-3" />
          <p className="font-body text-sm text-white/50">
            There is no one on the leaderboard yet. Complete a focus session and
            take the top spot!
          </p>
        </div>
      ) : (
        <>
          {/* Top 03 label */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-body text-[11px] uppercase tracking-[0.2em] text-white/40">
              Top 03
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Top 3 */}
          <div className="space-y-1.5 mb-8">
            {leaders.slice(0, 3).map((leader, i) => {
              const rank = i + 1;
              const isMe = isCurrentUser(leader.id);

              const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉";

              const rankBadgeClass =
                rank === 1
                  ? "bg-amber-400/20 text-amber-300 border-amber-400/40"
                  : rank === 2
                    ? "bg-white/10 text-white/70 border-white/20"
                    : "bg-orange-400/15 text-orange-300 border-orange-400/30";

              return (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={`group flex items-center gap-3 rounded-2xl border p-3 sm:p-4 backdrop-blur-xl transition-colors ${rankBadgeClass} ${
                    isMe
                      ? "border-emerald-400/40 bg-emerald-400/10"
                      : "hover:border-white/20 hover:bg-white/[0.07]"
                  }`}>
                  {/* Rank badge — medal circle */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border ${rankBadgeClass}`}>
                    <span className="text-base sm:text-lg">{medal}</span>
                  </div>

                  {/* Avatar */}
                  {leader.photoURL ? (
                    <img
                      src={leader.photoURL}
                      alt={leader.displayName || "User"}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0 ring-2 ring-white/10"
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0 ring-2 ring-white/10">
                      <span className="font-heading text-sm font-bold text-emerald-950">
                        {(leader.displayName ||
                          leader.email ||
                          "U")[0].toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Name + streak */}
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm sm:text-[15px] font-medium truncate">
                      {leader.displayName || "Student"}
                      {isMe && (
                        <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 align-middle">
                          You
                        </span>
                      )}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-300/10 px-2.5 py-0.5">
                        <Flame size={11} className="text-orange-400" />
                        <span className="font-body text-[10px] sm:text-xs text-orange-200">
                          {leader.focusStats?.currentStreak || 0} day streak
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Minutes — right */}
                  <div className="text-right shrink-0">
                    <p className="font-heading text-sm sm:text-base font-bold text-emerald-300">
                      {formatMinutes(leader.focusStats?.totalMinutes || 0)}
                    </p>
                    <p className="font-body text-[10px] text-white/30 flex items-center justify-end gap-1">
                      <Clock size={10} />
                      focus time
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Rest — 4 onwards */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-body text-[11px] uppercase tracking-[0.2em] text-white/40">
              Rankings
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="space-y-2">
            {leaders.slice(3).map((leader, i) => {
              const rank = i + 4;
              const isMe = isCurrentUser(leader.id);

              return (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`flex items-center gap-3 rounded-2xl border p-3.5 backdrop-blur-xl ${
                    isMe
                      ? "border-emerald-400/40 bg-emerald-400/10"
                      : "border-white/10 bg-white/5"
                  }`}>
                  {/* Rank */}
                  <span
                    className={`font-heading text-sm font-bold w-8 shrink-0 ${
                      isMe ? "text-emerald-300" : "text-white/40"
                    }`}>
                    #{rank}
                  </span>

                  {/* Avatar */}
                  {leader.photoURL ? (
                    <img
                      src={leader.photoURL}
                      alt={leader.displayName || "User"}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0">
                      <span className="font-heading text-xs font-bold text-emerald-950">
                        {(leader.displayName ||
                          leader.email ||
                          "U")[0].toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium truncate">
                      {leader.displayName || "Student"}
                      {isMe && <span className="text-emerald-300"> (You)</span>}
                    </p>
                    <p className="font-body text-xs text-white/40 flex items-center gap-1">
                      <Flame size={11} className="text-orange-400" />
                      {leader.focusStats?.currentStreak || 0} day streak
                    </p>
                  </div>

                  {/* Minutes */}
                  <div className="text-right shrink-0">
                    <p className="font-heading text-sm font-bold text-emerald-300">
                      {formatMinutes(leader.focusStats?.totalMinutes || 0)}
                    </p>
                    <p className="font-body text-[10px] text-white/30 flex items-center justify-end gap-1">
                      <Clock size={10} />
                      focus time
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Your rank — if not in top 50 */}
          {!leaders.some((l) => isCurrentUser(l.id)) && (
            <div className="mt-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-center">
              <Crown size={20} className="text-emerald-300 mx-auto mb-2" />
              <p className="font-body text-sm text-white/60">
                You aren't in the top 50 yet. Increase your focus sessions to
                move up in the rankings!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard;
