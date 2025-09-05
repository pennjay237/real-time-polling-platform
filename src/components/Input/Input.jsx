import React from 'react';
import styles from './Input.module.css';

function Input({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      className={styles.input}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  );
}

export default Input;
