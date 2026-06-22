const Header = ({ user }) => {
  // Prevent crash with Z-Axis matching placeholder
  if (!user) return <div className="p-6 text-neutral-500 bg-neutral-950/40 backdrop-blur-xl border-b border-white/5">Loading Header...</div>;

  const expBarWidth = user.pet && user.pet.requiredExp
    ? Math.min((user.pet.exp / user.pet.requiredExp) * 100, 100)
    : 0;

  return (
    <div className="flex items-start justify-between p-6 border-b bg-neutral-950/40 backdrop-blur-xl border-white/5">
      
      {/* Profile & EXP Section - Upgraded to Group Interaction */}
      <div className="flex flex-col p-2 -ml-2 transition-colors duration-200 cursor-pointer group rounded-2xl hover:bg-neutral-800/40">
        <h2 className="m-0 text-2xl font-black tracking-tight text-neutral-100 group-hover:text-blue-400 transition-colors">
          {user.username} 
          <span className="opacity-0 group-hover:opacity-100 text-xs font-bold text-blue-500/70 ml-2 transition-opacity">
            View Profile ↗
          </span>
        </h2>
        
        <div className="mt-1 text-xs font-medium text-neutral-400">
          Current EXP: {user.pet?.exp || 0} / {user.pet?.requiredExp || 100}
        </div>
        
        {/* The Z-Axis EXP Bar Track (Inner Ring & Overflow Containment) */}
        <div className="w-56 h-2.5 mt-2 overflow-hidden rounded-full bg-neutral-900 ring-1 ring-inset ring-white/10 shadow-inner">
          {/* The Gradient Fill - Dynamic Width via Inline Style */}
          <div 
            className="h-full rounded-full bg-linear-to-r from-blue-600 to-cyan-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            style={{ width: `${expBarWidth}%` }}
          ></div>
        </div>
      </div>

      {/* Economy & Settings Section */}
      <div className="flex flex-col items-end text-right">
        {/* Drop Shadow applied specifically to text rendering */}
        <h3 className="m-0 text-xl font-black tracking-wide text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
          <span className="opacity-80">🪙</span> Tokens: {user.gachaTokens}
        </h3>
        
        <button className="px-4 py-2 mt-3 text-sm font-semibold transition-all duration-200 cursor-pointer text-neutral-300 bg-neutral-800/50 rounded-xl hover:bg-neutral-700 hover:text-amber-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/10 ring-1 ring-inset ring-white/5 active:scale-[0.98]">
          ⚙️ Settings
        </button>
      </div>
      
    </div>
  )
}

export default Header