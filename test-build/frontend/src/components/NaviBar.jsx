const NaviBar = ({ currentView, setCurrentView }) => {
  const navStyle = {
    height: '80px', display: 'flex', justifyContent: 'space-around', 
    alignItems: 'center', backgroundColor: '#242424', borderTop: '1px solid #444'
  };

  const getButtonStyle = (viewName) => ({
    padding: '10px 20px', 
    backgroundColor: currentView === viewName ? '#3b82f6' : 'transparent',
    color: 'white', border: '1px solid #555', borderRadius: '4px', cursor: 'pointer'
  });

  return (
    <div style={navStyle}>
      <button 
        style={getButtonStyle('dashboard')} 
        onClick={() => setCurrentView('dashboard')}
      >
        🏠 Dashboard
      </button>
      <button 
        style={getButtonStyle('inventory')} 
        onClick={() => setCurrentView('inventory')}
      >
        🎒 Inventory
      </button>
      <button 
        style={getButtonStyle('gacha')} 
        onClick={() => setCurrentView('gacha')}
      >
        🌠 Gacha
      </button>
    </div>
  );
};

export default NaviBar;