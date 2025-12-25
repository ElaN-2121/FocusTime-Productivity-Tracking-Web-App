import React from "react";
import "../../styles/global.css";
import "../../styles/buttons.css";
import "../../styles/forms.css";

export default function TaskCard({ task, onDelete, onMove, onEdit, stages }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
  };
  return (
    <div className="task-card" draggable onDragStart={handleDragStart}>
      <div className="task header">
        <h4 className="task-title">{task.title}</h4>
        <span className={`badge ${task.type}`}>
          {task.type === "assignment" && "📘 Assignment"}
          {task.type === "exam" && "📝 exam"}
          {task.type === "task" && "📘 task"}
        </span>
      </div>
      <p className="task-desc">{task.description}</p>
      {task.dueDate && (
        <div
          style={{ fontSize: "0.8rem", color: "#6b7280", marginBottom: "10px" }}
        >
          📅Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
      <div className="task-actions" style={{display: "flex", 
      
    flexWrap: "wrap", /* Allows buttons to wrap to next line if no space */
    gap: "10px", 
    justifyContent: "space-between",
    alignItems: "center"}}>
        <select
          className="form-select"
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value)}
        >
          {stages.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
        <div>
          <button className="btn btn-edit" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button className="btn btn-delete" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
