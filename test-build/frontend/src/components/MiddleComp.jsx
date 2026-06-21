import PetView from './PetView';
import QuestView from './QuestView';

const MiddleComp = ({ user, quests, onManualSync }) => {
  const layoutStyle = {
    display: 'flex', flexGrow: 1, overflow: 'hidden'
  };

  return (
    <div style={layoutStyle}>
      <PetView pet={user?.pet} />
      <QuestView quests={quests} onManualSync={onManualSync} />
    </div>
  );
};

export default MiddleComp;