import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../../services/socket';
import PollCard from '../../components/PollCard/Poll';
import styles from './Session.module.css';

function Session() {
  const { code } = useParams();
  const [polls, setPolls] = useState([]);
  const participant = JSON.parse(localStorage.getItem('participant'));

  useEffect(() => {
    if (!participant) return;

    // Join session room
    socket.emit('joinSession', { sessionCode: code, participant });

    // Listen for polls published by host
    socket.on('newPoll', (poll) => {
      setPolls((prev) => [...prev, poll]);
    });

    // Cleanup on unmount
    return () => {
      socket.off('newPoll');
    };
  }, [code, participant]);

  const handleVote = (pollId, option) => {
    socket.emit('submitVote', { sessionCode: code, pollId, participant, option });
  };

  return (
    <div className={styles.container}>
      <h1>Session {code}</h1>
      <div className={styles.pollList}>
        {polls.map((poll) => (
          <div key={poll.id} className={styles.poll}>
            <PollCard poll={poll} />
            {poll.options?.map((opt, idx) => (
              <button key={idx} onClick={() => handleVote(poll.id, opt)}>
                {opt}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Session;
