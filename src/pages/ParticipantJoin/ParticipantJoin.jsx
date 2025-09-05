// src/pages/ParticipantJoin/ParticipantJoin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Button from '../../components/Button/Button.jsx';
import Input from '../../components/Input/Input.jsx';
import styles from './ParticipantJoin.module.css';

const ParticipantJoin = () => {
  const [sessionId, setSessionId] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleJoinSession = (e) => {
    e.preventDefault();
    if (sessionId && name) {
      // In a real app, you would validate the session ID with your backend here.
      console.log(`Participant "${name}" attempting to join session "${sessionId}"`);
      setMessage('Joining session...');
      // Simulate success and navigate to a participant view.
      navigate(`/session/${sessionId}`);
    } else {
      setMessage('Please enter a session code and your name.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <Sparkles size={32} />
          <h1 className={styles.logoTitle}>PollStream</h1>
        </div>
        <p className={styles.subtitle}>Join a real-time polling session.</p>
        <h2 className={styles.formTitle}>Join Session</h2>
        <form onSubmit={handleJoinSession}>
          <Input
            label="Session Code"
            name="sessionId"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            placeholder="e.g., WRT78L"
            required
          />
          <Input
            label="Your Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
          <Button type="submit" fullWidth>Join</Button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.divider}>
          <span className={styles.dividerText}>or</span>
        </div>
        <Button onClick={() => navigate('/')} variant="secondary" fullWidth>
          Host Login
        </Button>
      </div>
    </div>
  );
};

export default ParticipantJoin;