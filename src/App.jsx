// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HostDashboard from './pages/HostDashboard/HostDashboard.jsx';
import Login from './pages/Login/Login.jsx';
import ParticipantJoin from './pages/ParticipantJoin/ParticipantJoin.jsx';
import Session from './pages/Session/Session.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulate authentication state

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/participant" element={<ParticipantJoin />} />
        <Route path="/dashboard" element={isAuthenticated ? <HostDashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
        <Route path="/session/:sessionId" element={isAuthenticated ? <Session /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;