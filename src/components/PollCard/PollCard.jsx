// src/components/PollCard/PollCard.jsx
import React from 'react';
import Button from '../Button/Button.jsx';
import styles from './PollCard.module.css';

const PollCard = ({ poll, onAction }) => {
  const statusColors = {
    'Draft': styles.draft,
    'Published': styles.published,
    'Closed': styles.closed
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h4 className={styles.question}>{poll.question}</h4>
        <span className={`${styles.status} ${statusColors[poll.status]}`}>{poll.status}</span>
      </div>
      <p className={styles.type}>Type: {poll.type === 'mcq' ? 'Multiple Choice' : 'Essay'}</p>
      <div className={styles.actions}>
        {poll.status === 'Draft' && (
          <Button onClick={() => onAction('publish', poll.id)} variant="primary" className={styles.btnSmall}>Publish</Button>
        )}
        {poll.status === 'Published' && (
          <>
            <Button onClick={() => onAction('close', poll.id)} variant="secondary" className={styles.btnSmall}>Close</Button>
            <Button onClick={() => onAction('view-results', poll.id)} variant="primary" className={styles.btnSmall}>Results</Button>
          </>
        )}
        {poll.status === 'Closed' && (
          <Button onClick={() => onAction('view-results', poll.id)} variant="primary" className={styles.btnSmall}>Results</Button>
        )}
      </div>
    </div>
  );
};

export default PollCard;