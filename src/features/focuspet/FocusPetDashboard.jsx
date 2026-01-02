// FocusPetDashboard.jsx
export default function FocusPetDashboard({ hours }) {
  const getPet = (h) => {
    if (h < 5) return { emoji: "🥚", stage: "Egg" };
    if (h < 20) return { emoji: "🐣", stage: "Hatchling" };
    return { emoji: "🦉", stage: "Scholar Owl" };
  };

  const pet = getPet(hours);

  return (
    <div className="pet-container">
      <span className="pet-emoji">{pet.emoji}</span>
      <div className="pet-info">
        <span className="pet-stage">{pet.stage}</span>
        <div className="xp-bar-mini">
          <div className="xp-fill-mini" style={{ width: `${(hours % 10) * 10}%` }}></div>
        </div>
      </div>
    </div>
  );
}