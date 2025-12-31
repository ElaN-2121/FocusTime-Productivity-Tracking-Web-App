import "../styles/stats-card.css"

export default function StatsCard({ title, type, children, className = "" }) {
  return (
    <div className={`stats-card ${type} ${className}`}>
      <h3 className="stats-title">{title}</h3>
      <div className="stats-content">{children}</div>
    </div>
  )
}
