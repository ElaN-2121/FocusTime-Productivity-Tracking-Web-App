import React from "react";
// Recharts for data visualization
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
// Gamification logic for Pet evolution and outfits
import { getPetMood, getPetEvolution } from "../../services/gamificationLogic";
import "../../styles/progress.css";

// Mock Data for UI Review (Replace with Firestore data later)
const mockStats = {
  hoursSpent: 28.5,
  dailyGoal: 8,
  streak: 15, // Change this to 0, 5, or 15 to test different outfits!
  completedTasks: 10,
  totalTasks: 15,
  weeklyData: [
    { day: "M", value: 45 },
    { day: "T", value: 75 },
    { day: "W", value: 30 },
    { day: "T", value: 90 },
    { day: "F", value: 60 },
    { day: "S", value: 20 },
    { day: "S", value: 10 },
  ],
  assignments: [
    { title: "Database Schema Design", completed: true },
    { title: "UI Mockup Review", completed: true },
    { title: "Integrate Firebase Auth", completed: false },
    { title: "Weekly Progress Chart", completed: false },
  ],
  achievements: [
    { id: 1, icon: "🌅", title: "Early Bird", unlocked: true },
    { id: 2, icon: "🔥", title: "7 Day Streak", unlocked: true },
    { id: 3, icon: "👑", title: "Deep Work Master", unlocked: false },
  ],
};

const COLORS = ["#8884d8", "#e0e0e0"]; // Purple for progress, Light gray for empty

export default function ProgressChart() {
  // Get Gamified states based on stats
  const petBase = getPetEvolution(mockStats.hoursSpent);
  const petMood = getPetMood(mockStats.streak);

  // Chart Data Calculations
  const timeData = [
    { value: mockStats.hoursSpent % 10 },
    { value: 10 - (mockStats.hoursSpent % 10) },
  ];

  const taskData = [
    { value: mockStats.completedTasks },
    { value: mockStats.totalTasks - mockStats.completedTasks },
  ];

  return (
    <div className="progress-dashboard">
      <div className="bento-grid">
        {/* 1. Time Spent Card */}
        <div className="card time-spent">
          <div className="card-content">
            <p className="card-label">Focus XP</p>
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

        {/* 2. FOCUS PET (With Dynamic Outfits/Moods) */}
        <div className={`card pet-card ${petMood.class}`}>
          <p className="card-label">Focus Companion</p>
          <div className="pet-container">
            <div className="pet-visual-wrapper">
              <span className="pet-accessory">{petMood.accessory}</span>
              <span className="pet-emoji">{petBase.emoji}</span>
            </div>
            <div className="pet-info">
              <span
                className="pet-mood-tag"
                style={{ backgroundColor: petMood.color }}
              >
                {petMood.mood}
              </span>
              <h4 className="pet-stage-name">{petBase.stage}</h4>
            </div>
          </div>
        </div>

        {/* 3. ACHIEVEMENTS GALLERY */}
        <div className="card achievements-card">
          <p className="card-label">Milestones</p>
          <div className="badge-row">
            {mockStats.achievements.map((ach) => (
              <div
                key={ach.id}
                className={`badge-item ${ach.unlocked ? "" : "locked"}`}
              >
                <span className="badge-icon" title={ach.title}>
                  {ach.icon}
                </span>
              </div>
            ))}
          </div>
          <p className="streak-footer">
            Current Streak: {mockStats.streak} Days
          </p>
        </div>

        {/* 4. Task Completion Mini-Chart */}
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

        {/* 5. Weekly Progress Bar Chart (Spans 3 columns in CSS) */}
        <div className="card weekly-chart">
          <h3>Weekly Progress</h3>
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
