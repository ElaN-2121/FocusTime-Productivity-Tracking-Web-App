import React from "react";
import styles from "./InputField.module.css";

const InputField = ({ label, placeholder, value, onChange, onKeyDown }) => {
  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default InputField;

