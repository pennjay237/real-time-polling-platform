// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Button from '../../components/Button/Button.jsx';
import Input from '../../components/Input/Input.jsx';
import styles from './Login.module.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <Sparkles size={32} />
          <h1 className={styles.logoTitle}>PollStream</h1>
        </div>
        <p className={styles.subtitle}>Real-time polling platform</p>
        <h2 className={styles.formTitle}>Host Login</h2>
        <form onSubmit={handleLogin}>
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="host@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <Button type="submit" fullWidth>Log In</Button>
        </form>
        <div className={styles.divider}>
          <span className={styles.dividerText}>or</span>
        </div>
        <Button onClick={() => navigate('/participant')} variant="secondary" fullWidth>
          Join as a Participant
        </Button>
      </div>
    </div>
  );
};

export default Login;