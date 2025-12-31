import { useEffect, useRef } from "react"
import "../styles/circular-chart.css"

export default function CircularChart({ segments, centerText, size = 140, thickness = 15 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - thickness / 2

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Draw background circle (if needed, e.g. for "In Progress")
    // But for this design, we just draw segments.
    // Actually for "Tasks Completed", the white part is a segment.

    let currentAngle = 0 // CSS rotates it -90deg

    segments.forEach((segment) => {
      const sliceAngle = (segment.value / 100) * 2 * Math.PI

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
      ctx.lineWidth = thickness
      ctx.strokeStyle = segment.color
      ctx.lineCap = "butt" // Image shows butt caps mostly, or maybe round? Let's stick to butt for segments
      // Actually the "Time Spent" one looks like a gradient or solid colors.
      // The "Tasks Completed" has round ends? Hard to tell. Butt is safer for connected segments.
      ctx.stroke()

      currentAngle += sliceAngle
    })

    // Center text is HTML overlay
  }, [segments, size, thickness])

  return (
    <div className="circular-chart" style={{ width: size, height: size }}>
      <canvas ref={canvasRef} className="chart-canvas" />
      <div className="chart-center-text" dangerouslySetInnerHTML={{ __html: centerText }}></div>
    </div>
  )
}
