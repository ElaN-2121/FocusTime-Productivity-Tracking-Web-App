import React from "react";
import { markAsRead, clearAllNotifications } from "../../services/notificationService.js";

const NotificationItem = ({ note, userId }) => {
  const isRead = note.read;

  const currentItemStyle = {
    ...styles.item,
    backgroundColor: isRead ? "rgba(var(--fp-text-main-rgb, 255, 255, 255), 0.03)" : "var(--fp-active-item)",
    borderLeft: isRead ? "4px solid var(--fp-text-sub)" : "4px solid var(--fp-baby-blue)",
    opacity: isRead ? 0.6 : 1,
    borderColor: "var(--fp-border)"
  };

  const currentTextStyle = {
    ...styles.text,
    color: "var(--fp-text-main)",
    textDecoration: isRead ? "line-through" : "none"
  };

  return (
    <div style={currentItemStyle}>
      <div style={currentTextStyle}>{note.text}</div>
      <div style={styles.actionRow}>
        {!isRead && (
          <button 
            style={styles.readBtn}
            onClick={() => markAsRead(userId, note.id)}
          >
            Mark as Read
          </button>
        )}
      </div>
    </div>
  );
};

export default function NotificationList({ userId, notifications }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h3 style={styles.title}>Notifications</h3>
        {notifications.length > 0 && (
          <button 
            style={styles.clearAllBtn}
            onClick={() => clearAllNotifications(userId, notifications)}
          >
            Clear All
          </button>
        )}
      </div>
      <div style={styles.listContainer}>
        {notifications.length === 0 ? (
          <p style={styles.emptyState}>No notifications yet.</p>
        ) : (
          notifications.map((note) => (
            <NotificationItem key={note.id} note={note} userId={userId} />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: { 
    background: "var(--fp-sidebar-bg)", 
    backdropFilter: "blur(10px)",
    padding: "20px", 
    borderRadius: "16px", 
    border: "1px solid var(--fp-border)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)", 
    marginTop: "20px" 
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  title: { fontSize: "1.1rem", fontWeight: "700", color: "var(--fp-text-main)", margin: 0 },
  clearAllBtn: { background: "none", border: "none", color: "#f87171", fontSize: "0.8rem", cursor: "pointer", fontWeight: "600" },
  listContainer: { maxHeight: "350px", overflowY: "auto", paddingRight: "8px" },
  item: { 
    padding: "14px", 
    borderRadius: "10px", 
    marginBottom: "10px", 
    display: "flex", 
    flexDirection: "column", 
    gap: "8px", 
    border: "1px solid var(--fp-border)", 
    transition: "all 0.2s ease" 
  },
  text: { fontSize: "0.9rem", lineHeight: "1.4" },
  actionRow: { display: "flex", alignItems: "center" },
  readBtn: { 
    padding: "5px 12px", 
    borderRadius: "6px", 
    fontSize: "0.75rem", 
    fontWeight: "600", 
    cursor: "pointer", 
    border: "none", 
    backgroundColor: "var(--fp-baby-blue)", 
    color: "#ffffff",
    transition: "background 0.2s"
  },
  emptyState: { textAlign: "center", color: "var(--fp-text-sub)", fontSize: "0.9rem", padding: "30px 0" }
};