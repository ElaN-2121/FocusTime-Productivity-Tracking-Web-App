import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, onClick, variant = "default", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${styles[variant] || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;

