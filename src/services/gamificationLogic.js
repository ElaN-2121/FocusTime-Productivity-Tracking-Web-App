// src/services/gamificationLogic.js

export const getPetMood = (streak) => {
  if (streak === 0) return { mood: "Resting", accessory: "💤", color: "#999", class: "mood-resting" };
  if (streak < 3) return { mood: "Happy", accessory: "🌱", color: "#4CAF50", class: "mood-happy" };
  if (streak < 7) return { mood: "Fired Up", accessory: "🔥", color: "#ff9800", class: "mood-fired" };
  if (streak < 14) return { mood: "Elite", accessory: "🕶️", color: "#2196f3", class: "mood-elite" };
  return { mood: "Legendary", accessory: "👑", color: "#ffd700", class: "mood-legendary" };
};

export const getPetEvolution = (hours) => {
  if (hours < 5) return { emoji: "🥚", stage: "Egg" };
  if (hours < 20) return { emoji: "🐣", stage: "Hatchling" };
  return { emoji: "🦉", stage: "Scholar Owl" };
};