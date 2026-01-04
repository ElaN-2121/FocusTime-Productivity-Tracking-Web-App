// src/features/tasks/TaskCard.jsx
import "../../styles/pages.css";
import "../../styles/taskboard.css";

export default function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  return (
    <div 
      className={`task-card ${task.completed ? "completed-task" : ""}`} 
      draggable 
      onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
    >
      <div className="task-card-header">
        <div className="task-check-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input 
            type="checkbox" 
            checked={task.completed || false} 
            onChange={() => onToggleComplete(task.id, task.completed)}
            style={{ cursor: 'pointer', width: '18px', height: '18px' }}
          />
          <span className={`task-badge ${task.type}`}>{task.type}</span>
        </div>
        <div className="task-actions">
          <button className="action-btn edit" onClick={() => onEdit(task)}>✎</button>
          <button className="action-btn delete" onClick={() => onDelete(task.id)}>&times;</button>
        </div>
      </div>
      
      <h4 className={task.completed ? "strikethrough" : ""} style={{ marginTop: '10px' }}>
        {task.title}
      </h4>
      <p className={`task-desc ${task.completed ? "strikethrough" : ""}`}>
        {task.description}
      </p>
      
      <div className="task-footer">
        <span>{task.dueDate ? `📅 ${task.dueDate}` : "No deadline"}</span>
      </div>
    </div>
  );
}