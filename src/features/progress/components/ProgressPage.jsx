import CircularChart from "./CircularChart"
import StatsCard from "./StatsCard"
import WeeklyChart from "./WeeklyChart"
import AssignmentTracker from "./AssignmentTracker"
import "../styles/progress-page.css"
import { Zap } from "../../mentora/components/Icons"

export default function ProgressPage({ data }) {
  return (
    <div className="progress-content">
      <div className="content-area">
          <div className="top-row">
            <StatsCard title="Time Spent" type="circular" className="time-spent-card">
              <CircularChart
                segments={data.timeSpent.segments}
                centerText={`<span class="chart-value">${data.timeSpent.total}</span><span class="chart-label">hours</span>`}
                size={140}
              />
            </StatsCard>

            <div className="middle-section">
              <StatsCard title="Streak" type="streak" className="streak-card">
                <div className="streak-content">
                  <Zap className="card-streak-icon" fill="#f5a623" color="#f5a623" size={28} />
                  <span className="streak-days">{data.streak} days</span>
                </div>
              </StatsCard>

              <StatsCard title="Daily Motivation" type="motivation" className="motivation-card">
                <div className="motivation-content">
                  {data.motivation.map((text, idx) => (
                    <p key={idx}>{text}</p>
                  ))}
                </div>
              </StatsCard>
            </div>

            <StatsCard title="Tasks Completed" type="tasks" className="tasks-card">
              <CircularChart
                segments={[
                  { color: "#00D084", value: data.tasksCompleted.percentage },
                  { color: "#FFFFFF", value: 100 - data.tasksCompleted.percentage },
                ]}
                centerText={`<span class="chart-value">${data.tasksCompleted.percentage}%</span><span class="chart-label">solved<br>successfully</span>`}
                size={120}
              />
              <div className="legend">
                <div className="legend-item">
                  <span className="legend-dot done"></span>
                  <span>Done</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot in-progress"></span>
                  <span>In Progress</span>
                </div>
              </div>
            </StatsCard>
          </div>

          <div className="bottom-row">
            <WeeklyChart data={data.weeklyProgress} />
            <AssignmentTracker assignments={data.assignments} />
          </div>
      </div>
    </div>
  )
}
