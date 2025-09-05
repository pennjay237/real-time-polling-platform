import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ParticipantJoin.module.css';

function ParticipantJoin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sessionCode, setSessionCode] = useState('');
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    if (!name || !email || !sessionCode) return;

    // Save participant info in localStorage (simplified)
    localStorage.setItem('participant', JSON.stringify({ name, email }));
    navigate(`/session/${sessionCode}`);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleJoin}>
        <h2>Join Session</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Session Code"
          value={sessionCode}
          onChange={(e) => setSessionCode(e.target.value)}
          required
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default ParticipantJoin;
