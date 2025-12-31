import React from "react";
import styles from "./TopNav.module.css";
import { useAppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";

const TopNav = () => {
  const { fullName, profileImageSrc, streak } = useAppContext();
  const { pathname } = useLocation();

  const titles = {
    "/home": "Home",
    "/focus": "Focus Session",
    "/todo": "Todo",
    "/notes": "Notes",
    "/youtube": "YouTube",
    "/progress": "Progress Chart",
    "/profile": "Personal Information",
    "/mentora": "Mentora",
  };
  const title = titles[pathname] || "Home";

  const BellIcon = ({ size = 20, className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18.6 14.6V11a6 6 0 1 0-12 0v3.6c0 .538-.214 1.055-.595 1.435L4 17h5" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );

  return (
    <header className={styles.topnav}>
      <div className={styles.centerTitle}>{title}</div>
      <div className={styles.rightRow}>
        <div className={styles.themeToggle} aria-hidden="true"></div>
        <span className={styles.bell}><BellIcon size={20} /></span>
        <div className={styles.userChip}>
          <div className={styles.avatar}>
            <img className={styles.avatarImg} src={profileImageSrc} alt="avatar" />
          </div>
          <div className={styles.userTexts}>
            <span className={styles.userName}>{fullName || "Biruk Alemu"}</span>
            <span className={styles.userEnergy}>🔥 {streak}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
