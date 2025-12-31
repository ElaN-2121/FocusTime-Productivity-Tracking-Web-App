import React from "react";
import styles from "./Layout.module.css";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className={styles.root}>
      <Sidebar />
      <div className={styles.content}>
        <TopNav />
        <div className={styles.page}><Outlet /></div>
      </div>
    </div>
  );
};

export default Layout;
