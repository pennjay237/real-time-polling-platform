// src/pages/SignUp/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Button from '../../components/Button/Button.jsx';
import Input from '../../components/Input/Input.jsx';
import styles from './SignUp.module.css';

const SignUp = ({ onSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign Up attempt:', { name, email, password });
    onSignUp();
    navigate('/dashboard');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <Sparkles size={32} />
          <h1 className={styles.logoTitle}>PollStream5</h1>
        </div>
        <p className={styles.subtitle}>Real-time polling platform</p>
        <h2 className={styles.formTitle}>Host Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <Input
            label="Name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
          />
          <Button type="submit" fullWidth>Sign Up</Button>
        </form>
        <div className={styles.authLinkContainer}>
          <p>Already have an account? <a href="#" onClick={() => navigate('/login')} className={styles.authLink}>Log In</a></p>
        </div>
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

export default SignUp;