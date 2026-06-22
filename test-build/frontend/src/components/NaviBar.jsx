const NaviBar = ({ currentView, setCurrentView }) => {
  const getButtonClasses = (viewName) => {
    // Base Classes: Flexbox for icon alignment, large click targets, and base inner ring
    const baseClasses = "flex items-center gap-3 px-8 py-3.5 font-bold tracking-wide rounded-2xl transition-all duration-300 ring-1 ring-inset cursor-pointer";
    
    // Dynamic Classes: Z-Axis Depth and Gradient Lighting
    const activeClasses = currentView === viewName 
      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white ring-white/20 shadow-lg shadow-blue-500/30 scale-[1.02]" 
      : "bg-neutral-900/40 text-neutral-400 ring-white/5 hover:bg-neutral-800 hover:text-neutral-200 hover:ring-white/10 hover:scale-[1.02]";

    return `${baseClasses} ${activeClasses}`;
  };

  return (
    // Replaced flat inline style with Glassmorphism and centered clustering
    <div className="flex items-center justify-center gap-6 h-24 bg-neutral-950/60 backdrop-blur-xl border-t border-white/5">
      
      <button 
        className={getButtonClasses('dashboard')}
        onClick={() => setCurrentView('dashboard')}
      >
        <span className="text-xl drop-shadow-md">🏠</span> Dashboard
      </button>
      
      <button 
        className={getButtonClasses('inventory')}
        onClick={() => setCurrentView('inventory')}
      >
        <span className="text-xl drop-shadow-md">🎒</span> Inventory
      </button>
      
      <button 
        className={getButtonClasses('gacha')}
        onClick={() => setCurrentView('gacha')}
      >
        <span className="text-xl drop-shadow-md">🌠</span> Gacha
      </button>

    </div>
  );
};

export default NaviBar;