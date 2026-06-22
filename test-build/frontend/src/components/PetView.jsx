const PetView = ({ pet }) => {
  return (
    <div className="flex group w-[35%] flex-col items-center p-8 bg-neutral-950/20 border-r border-white/5 backdrop-blur-md overflow-y-auto">
      
      {/* Nameplate & Level Wrapper */}
      <div className="flex flex-col items-center mb-6">
        <div className="m-0 text-2xl font-black tracking-tight text-neutral-100">
          {pet?.name || 'SOC Cat'}
        </div>
        <div className="mt-1 text-sm font-bold bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          Level {pet?.level || 1}
        </div>
      </div>
      
      {/* Decoupled Animation & Glow Canvas */}
      <div className="relative flex items-center justify-center w-full h-40 mb-8">
        
        {/* Ambient Glow Back-Layer */}
        <div className="absolute w-24 h-24 rounded-full opacity-20 bg-amber-500 blur-3xl z-0 transition-all duration-500 group-hover:opacity-40 group-hover:scale-125"></div>
        
        {/* Outer Scale Wrapper (Handles Hover Scale cleanly) */}
        <div className="z-10 transition-transform duration-500 ease-out group-hover:scale-110">
          
          {/* Inner Animation Wrapper (Handles Infinite Bounce cleanly without property collision) */}
          <div className="animate-bounce text-8xl drop-shadow-[0_0_25px_rgba(251,191,36,0.5)] select-none">
            🐱
          </div>
          
        </div>
      </div>

      <div className="w-full p-4 mb-6 bg-neutral-900/50 border border-white/5 rounded-2xl">
        <span className="text-xs font-bold tracking-widest text-neutral-500 uppercase">Stats</span>
        <div className="flex flex-col gap-2 mt-3">
          
          <div className="flex justify-between items-center px-4 py-2.5 bg-neutral-950/80 border border-white/5 rounded-xl">
            <span className="text-sm font-medium text-neutral-400">Focus</span>
            <span className="text-base font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)] animate-pulse">{pet.stats.focus}</span>
          </div>
          
          <div className="flex justify-between items-center px-4 py-2.5 bg-neutral-950/80 border border-white/5 rounded-xl">
            <span className="text-sm font-medium text-neutral-400">Determination</span>
            <span className="text-base font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)] animate-pulse">{pet.stats.determination}</span>
          </div>
          
        </div>
      </div>

      {/* Action Grid (Corrected Hitbox Dimensions & Flex Growth) */}
      <div className="flex w-full gap-3 mt-auto">
        <button className="flex-1 py-3 text-sm font-bold text-neutral-200 cursor-pointer bg-neutral-900 border border-white/5 hover:bg-neutral-800 hover:text-white rounded-xl transition-all duration-200 active:scale-[0.97]">
          Feed
        </button>
        <button className="flex-1 py-3 text-sm font-bold text-neutral-200 cursor-pointer bg-neutral-900 border border-white/5 hover:bg-neutral-800 hover:text-white rounded-xl transition-all duration-200 active:scale-[0.97]">
          Customize
        </button>
      </div>

    </div>
  );
};

export default PetView;