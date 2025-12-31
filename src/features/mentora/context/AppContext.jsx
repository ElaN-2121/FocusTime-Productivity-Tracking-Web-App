import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ firstName: "", lastName: "" });
  const [theme, setTheme] = useState("light");
  const [streak, setStreak] = useState(21);
  const [avatarIndex, setAvatarIndex] = useState(1);
  const avatars = [
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23f59e0b'/><stop offset='1' stop-color='%233b82f6'/></linearGradient></defs><rect width='120' height='120' rx='60' fill='url(%23g)'/><circle cx='60' cy='46' r='18' fill='white'/><path d='M30 90c8-22 52-22 60 0' fill='white'/></svg>",
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><rect width='120' height='120' rx='60' fill='%2322c55e'/><circle cx='60' cy='40' r='18' fill='%23fde68a'/><path d='M20 100c0-28 80-28 80 0' fill='%2322c55e' stroke='%230f766e' stroke-width='3'/></svg>",
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><rect width='120' height='120' rx='60' fill='%230ea5e9'/><circle cx='60' cy='46' r='18' fill='white'/><path d='M30 90c8-22 52-22 60 0' fill='white'/></svg>",
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><rect width='120' height='120' rx='60' fill='%23a78bfa'/><circle cx='60' cy='46' r='18' fill='white'/><path d='M30 90c8-22 52-22 60 0' fill='white'/></svg>",
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><rect width='120' height='120' rx='60' fill='%23f472b6'/><circle cx='60' cy='46' r='18' fill='white'/><path d='M30 90c8-22 52-22 60 0' fill='white'/></svg>"
  ];
  const avatarSrc = avatars[avatarIndex];
  const profileImageSrc = avatarSrc;
  const logoSrc = null;

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(theme === "light" ? "theme-light" : "theme-dark");
  }, [theme]);

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme, toggleTheme, fullName, avatarIndex, setAvatarIndex, avatarSrc, avatars, profileImageSrc, logoSrc, streak, setStreak }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
};
