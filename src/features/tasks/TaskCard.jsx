// src/features/tasks/TaskCard.jsx
import "../../styles/pages.css";
import "../../styles/taskboard.css";

export default function TaskCard({ task, onEdit, onDelete, onToggleComplete, isSaving }) {
  // Matches capitalized names used in useTaskBoard and Firestore
  const isDone = task.status === "Done";

  const handleCheckboxClick = (e) => {
    e.stopPropagation(); 
    // This calls the handleToggleComplete function in TaskBoard.jsx
    onToggleComplete(task.id, task.completed);
  };

  return (
    <div 
      className={`task-card ${isDone ? "completed" : ""}`}
      draggable 
      onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
    >
      <div className="task-card-header">
        <div className="task-status-toggle">
          <input 
            type="checkbox" 
            checked={task.completed || false} 
            onChange={handleCheckboxClick}
            disabled={!!isSaving}
            className="status-checkbox"
            title={isDone ? "Mark as To-Do" : "Mark as Done"}
          />
          <span className={`task-badge ${task.type}`}>{task.type}</span>
        </div>
        <div className="task-actions">
          <button className="action-btn edit" onClick={() => onEdit(task)}>✎</button>
          <button className="action-btn delete" onClick={() => onDelete(task.id)}>&times;</button>
        </div>
      </div>
      
      <h4 className={isDone ? "text-strike" : ""}>{task.title}</h4>
      <p className="task-desc">{task.description}</p>
      
      <div className="task-footer">
        <span>{task.dueDate ? `📅 ${task.dueDate}` : "No deadline"}</span>
        <span className="status-label">{task.status}</span>
      </div>
    </div>
  );
}