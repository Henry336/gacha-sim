const PetView = ({ pet }) => {
  const containerStyle = {
    width: '35%', display: 'flex', flexDirection: 'column', 
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e1e1e', color: 'white'
  };

  const petSpriteStyle = {
    fontSize: '60px', margin: '20px 0'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ margin: 0 }}>{pet?.name || 'SOC Cat'}</h2>
      <div style={{ fontSize: '14px', color: '#aaa' }}>Level {pet?.level || 1}</div>
      
      <div style={petSpriteStyle}>
        🐱
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button style={{ padding: '8px 16px', cursor: 'pointer' }}>Feed</button>
        <button style={{ padding: '8px 16px', cursor: 'pointer' }}>Equip Item</button>
      </div>
    </div>
  );
};

export default PetView;