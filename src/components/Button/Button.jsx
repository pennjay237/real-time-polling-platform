// src/components/Button/Button.jsx
import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, type = 'button', variant = 'primary', icon, fullWidth, className = '' }) => {
  const buttonClasses = `${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className}`;

  return (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;