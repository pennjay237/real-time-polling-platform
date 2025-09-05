// src/components/Input/Input.jsx
import React from 'react';
import styles from './Input.module.css';

const Input = ({ type = 'text', label, name, value, onChange, placeholder, required = false, className = '' }) => {
  return (
    <div className={styles.inputGroup}>
      {label && <label htmlFor={name} className={styles.label}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${styles.input} ${className}`}
      />
    </div>
  );
};

export default Input;