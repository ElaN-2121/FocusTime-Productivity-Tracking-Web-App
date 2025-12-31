import React from "react";
import { useAppContext } from "../context/AppContext";
import { Bell } from "./Icons";

const TopBar = ({ title }) => {
  const { fullName } = useAppContext();

  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-right">
        <span className="bell"><Bell size={24} /></span>
        <div className="user-chip">
          <div className="user-avatar-circle" />
          <div className="user-texts">
            <span className="user-name">
              {fullName || "Biruk Alemu"}
            </span>
            <span className="user-energy">⚡21</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
