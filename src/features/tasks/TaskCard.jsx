// src/features/tasks/TaskCard.jsx
import "../../styles/pages.css";
import "../../styles/taskboard.css";
export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div 
      className="task-card" 
      draggable 
      onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
    >
      <div className="task-card-header">
        <span className={`task-badge ${task.type}`}>{task.type}</span>
        <div className="task-actions">
          <button className="action-btn edit" onClick={() => onEdit(task)}>✎</button>
          <button className="action-btn delete" onClick={() => onDelete(task.id)}>&times;</button>
        </div>
      </div>
      
      <h4>{task.title}</h4>
      <p className="task-desc">{task.description}</p>
      
      <div className="task-footer">
        <span>{task.dueDate ? `📅 ${task.dueDate}` : "No deadline"}</span>
      </div>
    </div>
  );
}