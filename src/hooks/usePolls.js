import { useState } from 'react';

/**
 * A custom hook to manage the state of a single poll.
 * @returns {object} The poll state and functions to update it.
 */
export const usePoll = () => {
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Initializes the poll state with data.
   * @param {object} pollData The data to initialize the poll with.
   */
  const initializePoll = (pollData) => {
    setPoll(pollData);
    setLoading(false);
    setError(null);
  };

  /**
   * Updates the votes for a specific option in the poll.
   * @param {string} optionId The ID of the option to vote for.
   */
  const updateVote = (optionId) => {
    if (!poll) return;

    setPoll(prevPoll => {
      const updatedOptions = prevPoll.options.map(option =>
        option.id === optionId ? { ...option, votes: option.votes + 1 } : option
      );
      return { ...prevPoll, options: updatedOptions };
    });
  };

  /**
   * Resets the poll state to null.
   */
  const resetPoll = () => {
    setPoll(null);
    setLoading(true);
    setError(null);
  };

  return {
    poll,
    loading,
    error,
    initializePoll,
    updateVote,
    resetPoll,
  };
};