import "../styles/weekly-chart.css"

export default function WeeklyChart({ data }) {
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="weekly-chart-container">
      <h3 className="chart-title">Weekly Progress Chart</h3>
      <div className="chart-wrapper">
        <div className="y-axis">
          {[100, 80, 60, 40, 20, 0].map((val) => (
            <span key={val} className="y-label">
              {val}
            </span>
          ))}
        </div>
        <div className="chart-area">
          <div className="bars">
            {data.map((item, idx) => (
              <div key={idx} className="bar-column">
                <div className="bar" style={{ height: `${item.value}%` }} title={`${item.day}: ${item.value}%`} />
                <span className="x-label">{item.day}</span>
              </div>
            ))}
          </div>
          <div className="grid-lines">
            {[0, 20, 40, 60, 80, 100].map((val) => (
              <div key={val} className="grid-line" style={{ bottom: `${val}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
