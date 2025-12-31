import { Bell, Zap } from "../../mentora/components/Icons"
import "../styles/header.css"

const defaultAvatar = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><rect width='100%' height='100%' fill='%23e5e7eb'/><circle cx='32' cy='24' r='14' fill='%23f3f4f6'/><path d='M12 52c6-18 36-18 42 0' fill='%23f3f4f6'/></svg>`

export default function Header({ user }) {
  return (
    <header className="header">
      <h1 className="header-title">Progress Chart</h1>
      <div className="header-right">
        <button className="notification-btn">
          <Bell size={24} fill="currentColor" strokeWidth={0} />
        </button>
        <div className="user-profile">
          <img
            src={user.avatar || defaultAvatar}
            alt={user.name}
            className="user-avatar"
          />
          <div className="user-details">
            <span className="user-name">{user.name}</span>
            <div className="user-streak">
              <Zap className="streak-icon" />
              <span>21</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
