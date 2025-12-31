import { useState } from "react"
import {
  Home,
  Target,
  CheckSquare,
  FileText,
  Youtube,
  BarChart2,
  User,
  Bot,
  LogOut,
  Sun,
  Moon,
} from "../../mentora/components/Icons"
import "../styles/sidebar.css"

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Progress Chart")
  const [theme, setTheme] = useState("light")

  const menuItems = [
    { icon: Home, label: "Home" },
    { icon: Target, label: "Focus Session" },
    { icon: CheckSquare, label: "Todo" },
    { icon: FileText, label: "Notes" },
    { icon: Youtube, label: "YouTube" },
    { icon: BarChart2, label: "Progress Chart" },
    { icon: User, label: "Profile" },
  ]

  const bottomItems = [
    { icon: Bot, label: "Mentora" },
    { icon: LogOut, label: "Logout" },
  ]

  return (
    <aside className="sidebar">
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

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`nav-item ${activeItem === item.label ? "active" : ""}`}
            onClick={() => setActiveItem(item.label)}
          >
            <item.icon className="nav-icon" strokeWidth={1.5} />
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        {bottomItems.map((item) => (
          <button key={item.label} className="bottom-item">
            <item.icon className="nav-icon" strokeWidth={1.5} />
            <span className="nav-label">{item.label}</span>
          </button>
        ))}

        <div className="theme-toggle">
          <button
            className={`theme-btn ${theme === "light" ? "active" : ""}`}
            onClick={() => setTheme("light")}
          >
            <Sun size={14} /> Light
          </button>
          <button
            className={`theme-btn ${theme === "dark" ? "active" : ""}`}
            onClick={() => setTheme("dark")}
          >
            <Moon size={14} /> Dark
          </button>
        </div>
      </div>
    </aside>
  )
}
