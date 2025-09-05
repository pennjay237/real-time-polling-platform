import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { useAuth } from './AuthContext';
import { usePoll } from '../hooks/usePoll';
import { useSocket } from '../hooks/useSocket';

const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const PollContext = createContext();

export const usePollContext = () => useContext(PollContext);

export const PollProvider = ({ children }) => {
  const [poll, setPoll] = useState(null);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, currentUser } = useAuth();
  const userId = currentUser?.uid || 'anonymous-user';

  // State management for the current active poll.
  const { poll: activePoll, initializePoll, updateVote: updateVoteInHook } = usePoll();

  // Socket for real-time updates. This assumes a WebSocket server URL is available.
  const { sendMessage } = useSocket('ws://localhost:8080', (message) => {
    // Handle real-time vote updates from the socket
    if (message.type === 'vote_update' && message.payload.pollId === activePoll.id) {
      updateVoteInHook(message.payload.optionId);
    }
    // Handle new poll events
    if (message.type === 'new_poll') {
      initializePoll(message.payload);
    }
  });

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
      if (initialAuthToken) {
        try {
          await signInWithCustomToken(auth, initialAuthToken);
        } catch (error) {
          console.error("Custom token sign-in failed:", error);
          await signInAnonymously(auth);
        }
      } else {
        await signInAnonymously(auth);
      }
    });

    const pollsCollectionRef = collection(db, 'artifacts', appId, 'public/data', 'polls');
    const unsubscribe = onSnapshot(pollsCollectionRef, (snapshot) => {
      const fetchedPolls = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPolls(fetchedPolls);
      setLoading(false);
    }, (err) => {
      console.error("Firestore onSnapshot error:", err);
      setError("Failed to fetch polls.");
      setLoading(false);
    });

    return () => {
      authUnsubscribe();
      unsubscribe();
    };
  }, []);

  const addPoll = async (newPollData) => {
    if (!isAuthenticated) {
      console.error("Authentication required to add a poll.");
      return;
    }
    try {
      const pollDocRef = doc(collection(db, `artifacts/${appId}/public/data/polls`));
      await setDoc(pollDocRef, { ...newPollData, creatorId: userId, createdAt: new Date() });
      sendMessage({ type: 'new_poll', payload: { ...newPollData, id: pollDocRef.id } });
    } catch (e) {
      console.error("Error adding poll: ", e);
    }
  };

  const vote = async (pollId, optionId) => {
    const pollRef = doc(db, `artifacts/${appId}/public/data/polls/${pollId}`);
    try {
      // Logic for updating the vote count in Firestore
      // ...
      sendMessage({ type: 'vote_update', payload: { pollId, optionId } });
    } catch (e) {
      console.error("Error updating vote: ", e);
    }
  };

  const value = {
    polls,
    activePoll,
    loading,
    error,
    initializePoll,
    addPoll,
    vote,
  };

  return (
    <PollContext.Provider value={value}>
      {children}
    </PollContext.Provider>
  );
};