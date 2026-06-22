const QuestView = ({ quests, onManualSync }) => {
  return (
    <div className="w-[65%] p-6 overflow-y-auto bg-neutral-950 border-l border-neutral-800">
      
      <button 
        onClick={onManualSync}
        className="w-full p-4 mb-6 font-bold text-white transition-all duration-500 bg-emerald-600 rounded-xl hover:bg-emerald-500 hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-emerald-900/20 cursor-pointer"
      >
        Refresh Quests
      </button>

      <h3 className="pb-3 mb-4 text-lg font-semibold tracking-wide border-b text-neutral-200 border-neutral-800">
        Active Quests
      </h3>
      
      {quests.length === 0 ? (
        <p className="text-neutral-500">No active quests. You are caught up.</p>
      ) : (
        quests.map(quest => (
          <div 
            key={quest.canvasId} 
            className="flex items-center justify-between p-5 mb-4 transition-all duration-500 border bg-neutral-900/50 border-neutral-800 rounded-2xl hover:border-emerald-500/50 hover:bg-neutral-800 hover:scale-[1.02] backdrop-blur-md"
          >
            <div className="flex flex-col">
              <span className="font-bold tracking-wide text-neutral-100">
                {quest.title}
              </span>
              <div className="flex items-center gap-3 mt-2 text-xs font-medium text-neutral-400">
                <span className="px-2 py-1 rounded-md bg-neutral-800">
                  {quest.courseCode}
                </span>
                <span>
                  Due: {new Date(quest.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="text-xl font-black text-amber-500">
              🏆 {quest.pointsPossible * 10} <span className="text-sm font-bold bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent drop-shadow-md">EXP</span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default QuestView