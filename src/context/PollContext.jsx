import React, { createContext, useState, useContext } from 'react';

const PollContext = createContext();

export const PollProvider = ({ children }) => {
  const [polls, setPolls] = useState([]); // All polls in session

  const addPoll = (poll) => setPolls((prev) => [...prev, poll]);
  const updatePoll = (updatedPoll) =>
    setPolls((prev) => prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p)));

  return (
    <PollContext.Provider value={{ polls, addPoll, updatePoll }}>
      {children}
    </PollContext.Provider>
  );
};

export const usePolls = () => useContext(PollContext);
