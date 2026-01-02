import React from "react";
import FocusPetDashboard from "../focuspet/FocusPetDashboard.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "../../styles/progress.css";

const mockStats = {
  hoursSpent: 25.5, // Changed to 25 to show an evolved pet
  dailyGoal: 8,
  streak: 12,
  completedTasks: 9,
  totalTasks: 12,
  weeklyData: [
    { day: "M", value: 45 },
    { day: "T", value: 75 },
    { day: "W", value: 30 },
    { day: "T", value: 90 },
    { day: "F", value: 60 },
    { day: "S", value: 20 },
    { day: "S", value: 0 },
  ],
  assignments: [
    { title: "Database Schema Design", completed: true },
    { title: "UI Mockup Review", completed: true },
    { title: "Integrate Firebase Auth", completed: false },
    { title: "Weekly Progress Chart", completed: false },
  ],
  // New: Achievement Data
  achievements: [
    { id: 1, icon: "🌅", title: "Early Bird", unlocked: true },
    { id: 2, icon: "🔥", title: "7 Day Streak", unlocked: true },
    { id: 3, icon: "👑", title: "Deep Work Master", unlocked: false },
  ],
};

const COLORS = ["#8884d8", "#e0e0e0"];

export default function ProgressChart() {
  // Pet Evolution Logic
  const getPet = (hours) => {
    if (hours < 5)
      return { emoji: "🥚", stage: "Egg", status: "Focus to hatch!" };
    if (hours < 20)
      return { emoji: "🐣", stage: "Hatchling", status: "Growing fast!" };
    return { emoji: "🦉", stage: "Scholar Owl", status: "Studying hard!" };
  };

  const pet = getPet(mockStats.hoursSpent);

  const timeData = [
    { value: mockStats.hoursSpent % 10 }, // XP progress within current level
    { value: 10 - (mockStats.hoursSpent % 10) },
  ];

  const taskData = [
    { value: mockStats.completedTasks },
    { value: mockStats.totalTasks - mockStats.completedTasks },
  ];

  return (
    <div className="progress-dashboard">
      <div className="bento-grid">
        {/* 1. Time Spent */}
        <div className="card time-spent">
          <div className="card-content">
            <p className="card-label">Daily Focus</p>
            <div className="mini-chart">
              <ResponsiveContainer width="100%" height={70}>
                <PieChart>
                  <Pie
                    data={timeData}
                    innerRadius={18}
                    outerRadius={28}
                    dataKey="value"
                    stroke="none"
                  >
                    {timeData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 2. FOCUS PET (Replaces original Streak) */}
        <div className="card pet-card">
          <p className="card-label">Focus Companion</p>
          <FocusPetDashboard hours={mockStats.hoursSpent} />
        </div>
        {/* 3. ACHIEVEMENTS (Replaces original Motivation) */}
        <div className="card achievements-card">
          <p className="card-label">Achievements</p>
          <div className="badge-row">
            {mockStats.achievements.map((ach) => (
              <div
                key={ach.id}
                className={`badge-item ${ach.unlocked ? "" : "locked"}`}
              >
                <span className="badge-icon">{ach.icon}</span>
              </div>
            ))}
          </div>
          <p className="streak-text">Current Streak: {mockStats.streak} Days</p>
        </div>

        {/* 4. Task Completion */}
        <div className="card task-completion">
          <ResponsiveContainer width="100%" height={90}>
            <PieChart>
              <Pie
                data={taskData}
                innerRadius={25}
                outerRadius={38}
                dataKey="value"
                stroke="none"
              >
                {taskData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="tiny-label">Tasks Done</p>
        </div>

        {/* 5. Weekly Progress */}
        <div className="card weekly-chart">
          <h3>Weekly Progress Chart</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={mockStats.weeklyData}>
              <Bar
                dataKey="value"
                fill="#8884d8"
                radius={[6, 6, 0, 0]}
                barSize={18}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#999", fontSize: 12 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 6. Assignment Tracker */}
        <div className="card assignment-tracker">
          <h3>Assignments ({mockStats.assignments.length})</h3>
          <div className="tracker-list">
            {mockStats.assignments.map((item, index) => (
              <div key={index} className="tracker-item">
                <div
                  className={`checkbox-mock ${item.completed ? "checked" : ""}`}
                >
                  {item.completed && "✓"}
                </div>
                <span className={item.completed ? "strikethrough" : ""}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
