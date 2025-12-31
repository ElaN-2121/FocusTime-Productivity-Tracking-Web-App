import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  Home,
  Target,
  CheckSquare,
  FileText,
  Youtube,
  PieChart,
  User,
  Bot,
  LogOut,
} from "./Icons";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const { theme, setTheme, logoSrc, setUser } = useAppContext();
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
        <div className="logo-container">
          <div className="logo-border">
            <span className="logo-focus">FOCUS</span>
            <span className="logo-time">TIME</span>
          </div>
          {/* Clock/Sunburst Graphic */}
          <div className="clock-hand"></div>
          <div className="clock-center"></div>
          <div className="clock-ticks">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="tick"
                style={{ transform: `rotate(${i * 30}deg) translateY(-25px)` }}
              />
            ))}
          </div>
          </div>
        </div>
      </div>

      <nav className="nav-menu">
        <NavLink className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} to="/home">
          <Home className="nav-icon" size={20} />
          <span className="nav-label">Home</span>
        </NavLink>
        <NavLink className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} to="/focus">
          <Target className="nav-icon" size={20} />
          <span className="nav-label">Focus Session</span>
        </NavLink>
        <NavLink className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} to="/todo">
          <CheckSquare className="nav-icon" size={20} />
          <span className="nav-label">Todo</span>
        </NavLink>
        <NavLink className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} to="/notes">
          <FileText className="nav-icon" size={20} />
          <span className="nav-label">Notes</span>
        </NavLink>
        <NavLink className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} to="/youtube">
          <Youtube className="nav-icon" size={20} />
          <span className="nav-label">YouTube</span>
        </NavLink>
        <NavLink className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} to="/progress">
          <PieChart className="nav-icon" size={20} />
          <span className="nav-label">Progress Chart</span>
        </NavLink>
        <NavLink className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} to="/profile">
          <User className="nav-icon" size={20} />
          <span className="nav-label">Profile</span>
        </NavLink>

        <NavLink className={({ isActive }) => `nav-item${isActive ? " active" : ""}`} to="/mentora">
          <Bot className="nav-icon" size={20} />
          <span className="nav-label">Mentora</span>
        </NavLink>

        <div className="extra-controls">
          <button
            type="button"
            className="bottom-item diminished"
            onClick={() => {
              setUser({ firstName: "", lastName: "" });
              navigate("/login");
            }}
          >
            <LogOut size={18} />
            <span className="nav-label">Logout</span>
          </button>

          <div className="theme-toggle" style={{ marginTop: "0.6rem" }}>
            <button
              type="button"
              className={`theme-btn ${theme === "light" ? "active" : ""}`}
              onClick={() => setTheme("light")}
            >
              Light
            </button>
            <button
              type="button"
              className={`theme-btn ${theme === "dark" ? "active" : ""}`}
              onClick={() => setTheme("dark")}
            >
              Dark
            </button>
          </div>
          <div className="theme-subtitle">Theme</div>
        </div>
      </nav>

      <div className="sidebar-bottom"></div>
    </aside>
  );
};

export default Sidebar;
