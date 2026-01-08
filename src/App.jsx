import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "./context/AuthContext";
import "./styles/index.css";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import TaskBoard from "./features/tasks/TaskBoard";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Profile from "./features/auth/Profile";
import Pomodoro from "./features/pomodoro/Pomodoro";
import ProgressChart from "./features/progress/ProgressChart";
import FocusPad from "./features/focuspad/FocusPad.jsx";
import Mentora from "./features/mentora/Mentora.jsx";
import YouTubeFocus from "./features/youtube/YouTubeFocus.jsx";
import { listenToNotifications, markAsRead } from "./services/notificationService";

export default function App() {
  const { user, loading } = useContext(AuthContext);
  const [currentView, setCurrentView] = useState("login");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [mentoraMessages, setMentoraMessages] = useState([
    { role: "assistant", content: "### Welcome! \n\nHi there! I'm **Mentora**. I'm so happy to help you find your focus today. What's on your mind?" }
  ]);
  const prevNotifsRef = useRef([]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (loading) return;
    if (user && user.emailVerified) {
      if (currentView === "login" || currentView === "register") setCurrentView("home");
    } else if (currentView !== "register") {
      setCurrentView("login");
    }
  }, [user, loading, currentView]);

  useEffect(() => {
    if (!user?.emailVerified) return;
    const unsubscribe = listenToNotifications(user.uid, (data) => {
      if (data.length > 0 && prevNotifsRef.current.length > 0) {
        if (!prevNotifsRef.current.find(n => n.id === data[0].id) && !data[0].read) {
          setActiveNote(data[0]);
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 10000);
        }
      }
      prevNotifsRef.current = data;
      setNotifications(data);
    });
    return () => unsubscribe();
  }, [user]);

  if (loading) return null;

  if (!user || !user.emailVerified) {
    return (
      <div className="auth-wrapper" data-theme={theme}>
        {currentView === "register" ? <Register onNavigate={setCurrentView} /> : <Login onNavigate={setCurrentView} />}
      </div>
    );
  }

  return (
    <div className={`app-container ${theme}`} data-theme={theme} style={{ display: "flex", minHeight: "100vh", position: "relative" }}>
      
      {showPopup && activeNote && (
        <div style={styles.popupOverlay}>
          <div className="notification-popup" style={styles.popupCard}>
            <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: "1.4" }}>{activeNote.text}</p>
            <button 
              style={styles.popupBtn}
              onClick={() => { markAsRead(user.uid, activeNote.id); setShowPopup(false); }}
            >
              Mark as Read
            </button>
          </div>
        </div>
      )}

      <Sidebar 
        onNavigate={setCurrentView} 
        currentView={currentView} 
        theme={theme} 
        setTheme={setTheme} 
      />

      <div style={styles.mainWrapper}>
        <Navbar 
          title={currentView === "profile" ? "PROFILE" : currentView.toUpperCase()} 
          onNotificationClick={() => setCurrentView("home")}
          onProfileClick={() => setCurrentView("progress")}
        />
        
        <div className="content-container" style={{ flex: 1, overflowY: "auto" }}>
          {currentView === "home" && <Home onNavigate={setCurrentView} notifications={notifications} userId={user.uid} />}
          {currentView === "tasks" && <TaskBoard />}
          {currentView === "profile" && <Profile />}
          {currentView === "pomodoro" && <Pomodoro onFocusComplete={() => {}} />}
          {currentView === "progress" && <ProgressChart />}
          {currentView === "focuspad" && <FocusPad userId={user.uid} />}
          {currentView === "mentora" && (
            <Mentora 
              userId={user.uid} 
              messages={mentoraMessages} 
              setMessages={setMentoraMessages} 
            />
          )}
          {currentView === "youtube" && <YouTubeFocus />}
        </div>
      </div>
    </div>
  );
}

const styles = {
  mainWrapper: { 
    flex: 1, 
    marginLeft: "240px", 
    display: "flex", 
    flexDirection: "column",
    minWidth: 0 
  },
  popupOverlay: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 9999,
    pointerEvents: "none"
  },
  popupCard: {
    pointerEvents: "auto",
    backgroundColor: "var(--fp-sidebar-bg)",
    backdropFilter: "blur(12px)",
    border: "1px solid var(--fp-border)",
    color: "var(--fp-text-main)",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    width: "280px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    transition: "all 0.3s ease"
  },
  popupBtn: {
    backgroundColor: "var(--fp-baby-blue, #3b82f6)",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: "bold",
    transition: "opacity 0.2s"
  }
};