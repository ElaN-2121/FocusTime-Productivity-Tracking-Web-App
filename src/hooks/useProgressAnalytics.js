import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { syncUserProgress } from "../services/progressService";
import { database } from "../services/firebase/firebaseConfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

export const useProgressAnalytics = () => {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    let unsubscribeProgress = null;
    let isMounted = true;

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        const analyticsData = {
          hoursSpent: 0,
          dailyGoal: 8,
          streak: 0,
          completedTasks: 0,
          totalTasks: 0,
          weeklyData: [
            { day: "M", value: 0 },
            { day: "T", value: 0 },
            { day: "W", value: 0 },
            { day: "T", value: 0 },
            { day: "F", value: 0 },
            { day: "S", value: 0 },
            { day: "S", value: 0 },
          ],
          assignments: [],
          achievements: [],
        };

        unsubscribeProgress = syncUserProgress(user.uid, (progressData) => {
          if (!isMounted) return;

          if (progressData) {
            analyticsData.hoursSpent =
              typeof progressData.hoursSpent === "number"
                ? progressData.hoursSpent
                : 0;

            analyticsData.dailyGoal =
              typeof progressData.dailyGoal === "number"
                ? progressData.dailyGoal
                : 8;

            analyticsData.streak =
              typeof progressData.streak === "number" ? progressData.streak : 0;

            analyticsData.assignments = Array.isArray(progressData.assignments)
              ? progressData.assignments
              : [];

            analyticsData.achievements = Array.isArray(
              progressData.achievements
            )
              ? progressData.achievements
              : [];

            if (
              progressData.weeklyData &&
              Array.isArray(progressData.weeklyData)
            ) {
              analyticsData.weeklyData = normalizeWeeklyData(
                progressData.weeklyData
              );
            }
          }

          fetchSessionData(user.uid, analyticsData).then(
            async (updatedData) => {
              if (!isMounted) return;

              const finalData = await fetchTaskData(updatedData);
              if (!isMounted) return;

              setData({
                hoursSpent: finalData.hoursSpent || 0,
                dailyGoal: finalData.dailyGoal || 8,
                streak: finalData.streak || 0,
                completedTasks: finalData.completedTasks || 0,
                totalTasks: finalData.totalTasks || 0,
                weeklyData: Array.isArray(finalData.weeklyData)
                  ? finalData.weeklyData
                  : analyticsData.weeklyData,
                assignments: Array.isArray(finalData.assignments)
                  ? finalData.assignments
                  : [],
                achievements: Array.isArray(finalData.achievements)
                  ? finalData.achievements
                  : [],
              });

              setLoading(false);
            }
          );
        });
      } catch (err) {
        if (!isMounted) return;

        if (err?.code === "permission-denied" || err?.code === "unavailable") {
          setError("Unable to load analytics. Please check your connection.");
        }

        setData({
          hoursSpent: 0,
          dailyGoal: 8,
          streak: 0,
          completedTasks: 0,
          totalTasks: 0,
          weeklyData: [
            { day: "M", value: 0 },
            { day: "T", value: 0 },
            { day: "W", value: 0 },
            { day: "T", value: 0 },
            { day: "F", value: 0 },
            { day: "S", value: 0 },
            { day: "S", value: 0 },
          ],
          assignments: [],
          achievements: [],
        });

        setLoading(false);
      }
    };

    fetchAnalytics();

    return () => {
      isMounted = false;
      if (typeof unsubscribeProgress === "function") {
        unsubscribeProgress();
      }
    };
  }, [user?.uid]);

  return { data, loading, error };
};

/* helpers */

const fetchSessionData = async (userId, analyticsData) => {
  try {
    const sessionsRef = collection(database, "users", userId, "sessions");

    let snapshot;
    let sessions = [];
    let totalHours = 0;

    try {
      const q = query(
        sessionsRef,
        where("mode", "==", "focus"),
        where("status", "==", "completed"),
        orderBy("timestamp", "desc")
      );
      snapshot = await getDocs(q);
    } catch {
      try {
        const q = query(sessionsRef, orderBy("timestamp", "desc"));
        snapshot = await getDocs(q);
      } catch {
        snapshot = await getDocs(sessionsRef);
      }
    }

    snapshot.forEach((doc) => {
      const session = { id: doc.id, ...doc.data() };

      if (session.mode === "focus" && session.status === "completed") {
        sessions.push(session);
        if (session.duration) {
          totalHours += session.duration / 3600;
        }
      }
    });

    if (!analyticsData.hoursSpent) {
      analyticsData.hoursSpent = totalHours;
    }

    const weeklyData = calculateWeeklyData(sessions);
    if (weeklyData.some((d) => d.value > 0)) {
      analyticsData.weeklyData = weeklyData;
    }

    return analyticsData;
  } catch {
    return analyticsData;
  }
};

const normalizeWeeklyData = (weeklyData) => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const normalized = days.map((day) => ({ day, value: 0 }));

  if (!Array.isArray(weeklyData)) return normalized;

  weeklyData.forEach((item, index) => {
    if (index < 7 && typeof item?.value === "number") {
      normalized[index] = {
        day: item.day || days[index],
        value: item.value,
      };
    }
  });

  return normalized;
};

const calculateWeeklyData = (sessions) => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const weeklyData = days.map((day) => ({ day, value: 0 }));

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  startOfWeek.setHours(0, 0, 0, 0);

  sessions.forEach((session) => {
    if (!session.timestamp) return;

    const date =
      typeof session.timestamp.toDate === "function"
        ? session.timestamp.toDate()
        : new Date(session.timestamp.seconds * 1000);

    if (date >= startOfWeek) {
      const index = (date.getDay() + 6) % 7;
      weeklyData[index].value += (session.duration || 0) / 60;
    }
  });

  return weeklyData;
};

const fetchTaskData = async (analyticsData) => {
  try {
    const q = query(
      collection(database, "tasks"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    const tasks = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    analyticsData.totalTasks = tasks.length;
    analyticsData.completedTasks = tasks.filter(
      (t) => t.status === "Done" || t.completed === true
    ).length;

    if (!analyticsData.assignments.length) {
      analyticsData.assignments = tasks.slice(0, 10).map((t) => ({
        title: t.title || t.name || "Untitled Task",
        completed: t.status === "Done" || t.completed === true,
      }));
    }

    return analyticsData;
  } catch {
    return analyticsData;
  }
};

export default useProgressAnalytics;
