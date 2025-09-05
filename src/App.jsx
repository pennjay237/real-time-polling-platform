import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HostDashboard from './pages/HostDashboard/HostDashboard';
import ParticipantJoin from './pages/ParticipantJoin/ParticipantJoin';
import Session from './pages/Session/Session';
import Login from './pages/Login/Login';

import { AuthProvider } from './context/AuthContext';
import { PollProvider } from './context/PollContext';
import styles from './App.module.css';

function App() {
  return (
    <AuthProvider>
      <PollProvider>
        <div className={styles.app}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/host" element={<HostDashboard />} />
            <Route path="/join" element={<ParticipantJoin />} />
            <Route path="/session/:code" element={<Session />} />
          </Routes>
        </div>
      </PollProvider>
    </AuthProvider>
  );
}

export default App;
