import { usePolls as usePollsContext } from '../context/PollContext';

export const usePolls = () => {
  const { polls, addPoll, updatePoll } = usePollsContext();

  const publishPoll = (pollId) => {
    updatePoll({ id: pollId, status: 'published' });
  };

  const closePoll = (pollId) => {
    updatePoll({ id: pollId, status: 'closed' });
  };

  return { polls, addPoll, publishPoll, closePoll };
};
