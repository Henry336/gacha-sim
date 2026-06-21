import { useState, useEffect } from 'react';
import Register from './components/Register';
import Header from './components/Header'
import MiddleComp from './components/MiddleComp';
import NaviBar from './components/NaviBar';
import userService from './services/users';
import assignmentService from './services/assignments';

import './App.css'; // Global resets (margin: 0, box-sizing: border-box)

const App = () => {
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard'); // conditional routing state

  // Check if user ID exists in local storage on initial boot
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('canvasImpactUserId');
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);
      setUser(parsedUser);
      fetchAssignments(parsedUser._id);
    }
  }, []);

  const fetchAssignments = async (userId) => {
    try {
      const activeQuests = await assignmentService.getActive(userId);
      setAssignments(activeQuests);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleLogin = (newUserPayload) => {
    // Save to browser memory to bypass login next time
    window.localStorage.setItem('canvasImpactUserId', JSON.stringify(newUserPayload));
    setUser(newUserPayload);
    fetchAssignments(newUserPayload._id);
  };

  const handleManualSync = async () => {
    if (!user) return;
    try {
      const syncData = await userService.sync(user._id);
      console.log('Sync Results:', syncData.yield);
      
      // If sync yields results, we must re-fetch the user data and assignments
      // For now, we'll just refetch assignments to update the quest list
      fetchAssignments(user._id);
      
      if (syncData.yield.expGained > 0) {
        alert(`Sync Complete! Gained ${syncData.yield.expGained} EXP`);
      }
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  const appContainerStyle = {
    display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#000'
  };

  // Auth Gate: If no user is stored in state, force the Register view
  if (!user) {
    return <Register onLogin={handleLogin} />;
  }

  return (
    <div style={appContainerStyle}>
      <Header user={user} />
      
      {/* Conditional Rendering Block to simulate a Router */}
      {currentView === 'dashboard' && (
        <MiddleComp
          user={user} 
          quests={assignments} 
          onManualSync={handleManualSync} 
        />
      )}
      
      {currentView === 'inventory' && (
        <div style={{ flexGrow: 1, color: 'white', padding: '20px' }}>
          <h2>Inventory System Offline</h2>
        </div>
      )}

      {currentView === 'gacha' && (
        <div style={{ flexGrow: 1, color: 'white', padding: '20px' }}>
          <h2>Gacha Terminal Offline</h2>
        </div>
      )}

      <NaviBar currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
};

export default App;