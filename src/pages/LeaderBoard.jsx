// src/pages/Leaderboard.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { motion } from "motion/react";
import { Trophy, Flame, Clock, Crown } from "lucide-react";

const Leaderboard = () => {
  const [user, setUser] = useState(null);
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  // ---------------- Helpers ----------------
  const formatMinutes = (mins) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const isCurrentUser = (leaderId) => user?.uid === leaderId;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1020]">
        <p className="font-body text-white/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="pb-24 md:pb-8 mt-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <Trophy size={24} className="text-amber-300" />
          Leaderboard
        </h1>
        <p className="font-body text-sm text-white/50 mt-1">
          All-time focus time ranking — DreamUTrack community.
        </p>
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
          <div className="w-8 h-8 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
        </div>
      ) : leaders.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center">
          <Trophy size={40} className="text-white/20 mx-auto mb-3" />
          <p className="font-body text-sm text-white/50">
            තවම leaderboard එකේ කවුරුත් නැහැ. Focus session එකක් complete කරලා
            පළවෙනි තැනට යන්න!
          </p>
        </div>
      ) : (
        <>
          {/* Top 3 — podium cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
            {leaders.slice(0, 3).map((leader, i) => {
              const rank = i + 1;
              const isMe = isCurrentUser(leader.id);

              return (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl border p-3 sm:p-4 text-center backdrop-blur-xl ${
                    rank === 1
                      ? "border-amber-400/40 bg-gradient-to-b from-amber-400/15 to-transparent"
                      : rank === 2
                        ? "border-white/20 bg-gradient-to-b from-white/10 to-transparent"
                        : "border-orange-400/30 bg-gradient-to-b from-orange-400/10 to-transparent"
                  }`}>
                  {/* Medal */}
                  <div className="text-2xl sm:text-3xl mb-2">
                    {getRankBadge(rank)}
                  </div>

                  {/* Avatar */}
                  {leader.photoURL ? (
                    <img
                      src={leader.photoURL}
                      alt={leader.displayName || "User"}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mx-auto mb-2 border-2 border-emerald-400/30"
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-2">
                      <span className="font-heading text-sm font-bold text-emerald-950">
                        {(leader.displayName ||
                          leader.email ||
                          "U")[0].toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Name */}
                  <p className="font-body text-xs sm:text-sm font-medium truncate">
                    {leader.displayName || "Student"}
                    {isMe && <span className="text-emerald-300"> (You)</span>}
                  </p>

                  {/* Minutes */}
                  <p className="font-heading text-base sm:text-lg font-bold text-emerald-300 mt-1">
                    {formatMinutes(leader.focusStats?.totalMinutes || 0)}
                  </p>

                  {/* Streak */}
                  <p className="font-body text-[10px] sm:text-xs text-white/40 mt-0.5 flex items-center justify-center gap-1">
                    <Flame size={11} className="text-orange-400" />
                    {leader.focusStats?.currentStreak || 0} day streak
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Rest — 4 onwards */}
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
                ඔයා තවම top 50 ඇතුළේ නැහැ. Focus sessions වැඩි කරලා rank එක උඩට
                යන්න!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard;
