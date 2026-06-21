const QuestView = ({ quests, onManualSync }) => {
  const containerStyle = {
    width: '65%', padding: '20px', overflowY: 'auto', 
    backgroundColor: '#121212', color: 'white'
  };

  const cardStyle = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#2a2a2a', padding: '15px', borderRadius: '8px', marginBottom: '10px'
  };

  const syncButtonStyle = {
    width: '100%', padding: '15px', backgroundColor: '#10b981', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px'
  };

  return (
    <div style={containerStyle}>
      <button style={syncButtonStyle} onClick={onManualSync}>
        Refresh Quests (Sync with Canvas)
      </button>

      <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '10px' }}>Active Assignments</h3>
      
      {quests.length === 0 ? (
        <p>No active quests. You are caught up.</p>
      ) : (
        quests.map(quest => (
          <div key={quest.canvasId} style={cardStyle}>
            <div>
              <div style={{ fontWeight: 'bold' }}>{quest.title}</div>
              <div style={{ fontSize: '12px', color: '#aaa', marginTop: '5px' }}>
                {quest.courseCode} | Due: {new Date(quest.dueDate).toLocaleDateString()}
              </div>
            </div>
            <div style={{ color: '#fbbf24', fontWeight: 'bold' }}>
              🏆 {quest.pointsPossible * 10} EXP
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default QuestView;