const Header = ({ user }) => {
  const headerStyle = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: '20px', backgroundColor: '#242424', color: 'white', borderBottom: '1px solid #444'
  };

  const expBarStyle = {
    width: '200px', height: '10px', backgroundColor: '#444', borderRadius: '5px', marginTop: '5px'
  };

  // Prevent crash if user state hasn't loaded yet
  if (!user) return <div style={headerStyle}>Loading Header...</div>;

  return (
    <div style={headerStyle}>
      <div>
        <h2 style={{ margin: 0 }}>{user.username}</h2>
        <div style={{ fontSize: '12px', color: '#aaa', marginTop: '5px' }}>
          {/* Safely targets the nested pet logic with a fallback */}
          Current EXP: {user.pet?.exp || 0} / {user.pet?.requiredExp || 100}
        </div>
        <div style={expBarStyle}>
          {/* Visual representation of EXP - hardcoded width for now */}
          <div style={{ width: '40%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '5px' }}></div>
        </div>
      </div>
      
      <div style={{ textAlign: 'right' }}>
        <h3 style={{ margin: 0, color: '#fbbf24' }}>🪙 Tokens: {user.gachaTokens}</h3>
        <button style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}>⚙️ Settings</button>
      </div>
    </div>
  );
};

export default Header;