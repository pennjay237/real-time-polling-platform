// src/pages/HostDashboard/HostDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Plus, Users, LayoutDashboard, Share2, CircleDot, LogOut, Activity, Sparkles, SlidersHorizontal, BarChart4, ChevronRight, User, CirclePlus } from 'lucide-react';
import Button from '../../components/Button/Button.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import Input from '../../components/Input/Input.jsx';
import styles from './HostDashboard.module.css';

const DashboardCard = ({ title, value, status, icon }) => (
  <div className={styles.dashboardCard}>
    <div className={styles.cardHeader}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <div className={styles.cardIcon}>{icon}</div>
    </div>
    <div className={styles.cardContent}>
      <h2 className={styles.cardValue}>{value}</h2>
      <div className={styles.cardStatus}>
        <CircleDot size={8} className={styles.statusDot} />
        {status}
      </div>
    </div>
  </div>
);

const HostDashboard = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewSessionModalOpen, setIsNewSessionModalOpen] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sessions, setSessions] = useState([
    { id: '1', name: 'Product Meeting Q3', status: 'Live', participants: 45, polls: 10 },
    { id: '2', name: 'Team Retrospective', status: 'Closed', participants: 22, polls: 5 },
  ]);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCreateSession = () => setIsNewSessionModalOpen(true);

  const handleModalSubmit = (e) => {
    e.preventDefault();
    console.log('Creating new session:', newSessionName);
    const newSession = {
      id: Date.now().toString(),
      name: newSessionName,
      status: 'Draft',
      participants: 0,
      polls: 0
    };
    setSessions([...sessions, newSession]);
    setIsNewSessionModalOpen(false);
    setNewSessionName('');
  };

  return (
    <div className={styles.dashboard}>
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <Sparkles size={28} />
            <div className={styles.logoText}>
              <h1 className={styles.logoTitle}>PollStream</h1>
              <p className={styles.logoSubtitle}>Real-time polling platform</p>
            </div>
          </div>
          <button onClick={toggleSidebar} className={styles.sidebarToggleBtn}>
            <X size={24} />
          </button>
        </div>
        <nav className={styles.navigation}>
          <h3 className={styles.navHeader}>Navigation</h3>
          <div onClick={() => setActiveTab('dashboard')} className={`${styles.navItem} ${activeTab === 'dashboard' ? styles.navItemActive : ''}`}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>
          <div onClick={handleCreateSession} className={styles.navItem}>
            <SlidersHorizontal size={20} />
            <span>Create Session</span>
          </div>
          <div onClick={() => setActiveTab('live-sessions')} className={`${styles.navItem} ${activeTab === 'live-sessions' ? styles.navItemActive : ''}`}>
            <BarChart4 size={20} />
            <span>Live Sessions</span>
          </div>
        </nav>
        <div className={styles.quickActionsNav}>
          <h3 className={styles.navHeader}>Quick Actions</h3>
          <div onClick={() => navigate('/participant')} className={styles.navItem}>
            <User size={20} />
            <span>Join as Participant</span>
          </div>
        </div>
        <div className={styles.profileSection}>
          <div className={styles.profileInfo}>
            <div className={styles.profileAvatar}>P</div>
            <div>
              <div className={styles.profileName}>Penn Jude</div>
              <div className={styles.profileEmail}>pennjude31@gmail.com</div>
            </div>
          </div>
          <div onClick={onLogout} className={styles.signOut}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </div>
        </div>
      </aside>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <button onClick={toggleSidebar} className={styles.mobileMenuBtn}>
            <Menu size={24} />
          </button>
          <div className={styles.headerLeft}>
            <h2 className={styles.headerTitle}>{activeTab === 'dashboard' ? 'Dashboard' : 'Live Sessions'}</h2>
          </div>
          <div className={styles.headerRight}>
            <Button variant="primary" icon={<Plus size={16} />} onClick={handleCreateSession}>
              New Session
            </Button>
          </div>
        </header>

        <main className={styles.contentBody}>
          {activeTab === 'dashboard' && (
            <>
              <div className={styles.welcomeSection}>
                <div>
                  <h1 className={styles.welcomeTitle}>Welcome back, Penn! 👋</h1>
                  <p className={styles.welcomeSubtitle}>Manage your polling sessions and engage with your audience in real-time</p>
                </div>
                <Button className={styles.welcomeBtn} icon={<Plus size={16} />} onClick={handleCreateSession}>
                  New Session
                </Button>
              </div>
              <div className={styles.cardGrid}>
                <DashboardCard title="Total Sessions" value={sessions.length} status="Live tracking" icon={<BarChart4 size={20} />} />
                <DashboardCard title="Active Sessions" value={sessions.filter(s => s.status === 'Live').length} status="Live tracking" icon={<Activity size={20} />} />
                <DashboardCard title="Total Participants" value={sessions.reduce((acc, s) => acc + s.participants, 0)} status="Live tracking" icon={<Users size={20} />} />
                <DashboardCard title="Total Polls" value={sessions.reduce((acc, s) => acc + s.polls, 0)} status="Live tracking" icon={<BarChart4 size={20} />} />
              </div>
              <div className={styles.bottomSection}>
                <div className={styles.sessionsPanel}>
                  <div className={styles.panelHeader}>
                    <h3 className={styles.panelTitle}>Your Sessions</h3>
                    <a href="#" className={styles.viewAll}>
                      View All <ChevronRight size={16} />
                    </a>
                  </div>
                  {sessions.length === 0 ? (
                    <div className={styles.emptyState}>
                      <BarChart4 size={64} className={styles.emptyIcon} />
                      <p className={styles.emptyTitle}>No sessions yet</p>
                      <p className={styles.emptySubtitle}>Create your first polling session to get started with real-time audience engagement</p>
                      <Button className={styles.emptyBtn} icon={<Plus size={16} />} onClick={handleCreateSession}>
                        Create Your First Session
                      </Button>
                    </div>
                  ) : (
                    <div className={styles.sessionList}>
                      {sessions.map((session) => (
                        <div key={session.id} className={styles.sessionItem}>
                          <div>
                            <h4 className={styles.sessionName}>{session.name}</h4>
                            <p className={styles.sessionStats}>{session.participants} Participants | {session.polls} Polls</p>
                          </div>
                          <div className={styles.sessionActions}>
                            <span className={`${styles.sessionStatus} ${session.status === 'Live' ? styles.live : styles.closed}`}>{session.status}</span>
                            <Button className={styles.viewBtn} onClick={() => navigate(`/session/${session.id}`)}>View</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {activeTab === 'live-sessions' && (
            <div className={styles.emptyState}>
              <BarChart4 size={64} className={styles.emptyIcon} />
              <p className={styles.emptyTitle}>No live sessions</p>
              <p className={styles.emptySubtitle}>Published sessions will appear here in real-time.</p>
            </div>
          )}
        </main>
      </div>
      <Modal isOpen={isNewSessionModalOpen} onClose={() => setIsNewSessionModalOpen(false)} title="Create New Session">
        <form onSubmit={handleModalSubmit}>
          <Input
            label="Session Name"
            name="sessionName"
            value={newSessionName}
            onChange={(e) => setNewSessionName(e.target.value)}
            placeholder="e.g., Q4 Strategy Meeting Polls"
            required
          />
          <div className={styles.modalActions}>
            <Button variant="secondary" onClick={() => setIsNewSessionModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default HostDashboard;