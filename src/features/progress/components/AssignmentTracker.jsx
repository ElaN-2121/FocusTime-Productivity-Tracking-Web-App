import { useState } from "react"
import "../styles/assignment-tracker.css"
import { Check } from "../../mentora/components/Icons"

export default function AssignmentTracker({ assignments: initialAssignments }) {
  const [assignments, setAssignments] = useState(initialAssignments)

  const handleToggle = (id) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === id ? { ...assignment, completed: !assignment.completed } : assignment,
      ),
    )
  }

  return (
    <div className="assignment-tracker">
      <div className="tracker-header">
        <h3 className="tracker-title">Assignment Tracker</h3>
        <span className="tracker-count">{assignments.filter(a => a.completed).length}/{assignments.length}</span>
      </div>
      <div className="assignments-list">
        {assignments.map((assignment) => (
          <label key={assignment.id} className={`assignment-item ${assignment.completed ? "completed" : ""}`}>
            <div className="custom-checkbox">
              <input
                type="checkbox"
                checked={assignment.completed}
                onChange={() => handleToggle(assignment.id)}
              />
              <span className="checkmark">
                {assignment.completed && <Check size={14} strokeWidth={3} color="#7e57c2" />}
              </span>
            </div>
            <span className="assignment-name">{assignment.name}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
