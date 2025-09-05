// src/pages/Session/Session.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, CirclePlus } from 'lucide-react';
import Button from '../../components/Button/Button.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import Input from '../../components/Input/Input.jsx';
import PollCard from '../../components/PollCard/PollCard.jsx';
import styles from './Session.module.css';

const Session = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [polls, setPolls] = useState([
    { id: 1, question: "How are you feeling today?", type: "mcq", status: "Draft", options: ["Great", "Okay", "Stressed"] },
    { id: 2, question: "What is your biggest challenge with the project?", type: "essay", status: "Published" },
  ]);
  const [newPollModalOpen, setNewPollModalOpen] = useState(false);
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState('');
  const [newPollType, setNewPollType] = useState('mcq');

  const handleCreatePoll = (e) => {
    e.preventDefault();
    const newPoll = {
      id: Date.now(),
      question: newPollQuestion,
      type: newPollType,
      status: "Draft",
      options: newPollType === 'mcq' ? newPollOptions.split(',').map(opt => opt.trim()) : undefined,
    };
    setPolls([...polls, newPoll]);
    setNewPollModalOpen(false);
    setNewPollQuestion('');
    setNewPollOptions('');
  };

  const handlePollAction = (action, pollId) => {
    setPolls(polls.map(poll => {
      if (poll.id === pollId) {
        if (action === 'publish') return { ...poll, status: 'Published' };
        if (action === 'close') return { ...poll, status: 'Closed' };
      }
      return poll;
    }));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button onClick={() => navigate('/dashboard')} className={styles.backButton}>
            <ChevronRight size={24} className={styles.backIcon} />
          </button>
          <h1 className={styles.headerTitle}>Session: {sessionId}</h1>
        </div>
        <Button onClick={() => setNewPollModalOpen(true)} icon={<CirclePlus size={16} />}>
          New Poll
        </Button>
      </header>
      <main className={styles.mainContent}>
        <h2 className={styles.contentTitle}>Polls</h2>
        <div className={styles.pollGrid}>
          {polls.map(poll => (
            <PollCard key={poll.id} poll={poll} onAction={handlePollAction} />
          ))}
        </div>
      </main>

      <Modal isOpen={newPollModalOpen} onClose={() => setNewPollModalOpen(false)} title="Create New Poll">
        <form onSubmit={handleCreatePoll}>
          <Input
            label="Poll Question"
            name="question"
            value={newPollQuestion}
            onChange={(e) => setNewPollQuestion(e.target.value)}
            placeholder="e.g., What's our main priority?"
            required
          />
          <div className={styles.formGroup}>
            <label className={styles.label}>Poll Type</label>
            <select
              value={newPollType}
              onChange={(e) => setNewPollType(e.target.value)}
              className={styles.select}
            >
              <option value="mcq">Multiple Choice</option>
              <option value="essay">Essay</option>
            </select>
          </div>
          {newPollType === 'mcq' && (
            <Input
              label="Options (comma-separated)"
              name="options"
              value={newPollOptions}
              onChange={(e) => setNewPollOptions(e.target.value)}
              placeholder="e.g., Option 1, Option 2, Option 3"
              required
            />
          )}
          <div className={styles.modalActions}>
            <Button variant="secondary" onClick={() => setNewPollModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Create Poll</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Session;