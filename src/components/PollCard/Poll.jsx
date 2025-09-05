import React from 'react';
import styles from './PollCard.module.css';

function PollCard({ poll }) {
  return (
    <div className={styles.card}>
      <h3>{poll.title}</h3>
      <p>Status: {poll.status}</p>
    </div>
  );
}

export default PollCard;
