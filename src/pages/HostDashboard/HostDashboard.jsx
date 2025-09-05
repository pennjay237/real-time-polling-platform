import React, { useState } from 'react';
import { usePolls } from '../../context/PollContext';
import PollCard from '../../components/PollCard/PollCard';
import styles from './HostDashboard.module.css';

function HostDashboard() {
  const { polls, addPoll } = usePolls();
  const [title, setTitle] = useState('');

  const handleAddPoll = () => {
    if (title.trim() === '') return;
    addPoll({ id: Date.now(), title, status: 'draft' });
    setTitle('');
  };

  return (
    <div className={styles.container}>
      <h1>Host Dashboard</h1>
      <div className={styles.newPoll}>
        <input
          type="text"
          placeholder="New Poll Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAddPoll}>Add Poll</button>
      </div>
      <div className={styles.pollList}>
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>
    </div>
  );
}

export default HostDashboard;
