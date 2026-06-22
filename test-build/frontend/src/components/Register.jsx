import { useState } from 'react';
import userService from '../services/users';

const Register = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    try {
      // Sends payload to the backend 
      const user = await userService.register({ username, token });
      onLogin(user); 
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Failed to connect to Canvas. Check your token.');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    // 1. The Environment Engine (Full viewport, hidden overflow)
    <div className="relative flex items-center justify-center w-screen min-h-screen overflow-hidden bg-neutral-950">
      
      {/* 2. The Ambient Background Physics (Blurred Plasma Spheres) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 3. The Glassmorphic Terminal (Z-Axis Depth) */}
      <form 
        onSubmit={handleRegister}
        className="relative z-10 flex flex-col w-full max-w-md gap-6 p-10 shadow-2xl bg-neutral-900/40 backdrop-blur-2xl rounded-3xl border border-white/10 ring-1 ring-inset ring-white/5"
      >
        
        {/* Header Block */}
        <div className="text-center mb-2">
          <h2 className="text-3xl font-black tracking-tight text-transparent bg-gradient-to-br from-neutral-100 to-neutral-400 bg-clip-text">
            Initialize System
          </h2>
          <p className="mt-2 text-sm font-medium text-neutral-400">
            Insert credentials to manipulate your academic reality.
          </p>
        </div>

        {/* Input Physics (Focus Rings & Inner Shadow) */}
        <div className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Desired Username" 
            value={username} 
            onChange={({ target }) => setUsername(target.value)} 
            required
            className="w-full px-5 py-4 text-neutral-100 placeholder-neutral-500 transition-all duration-200 border outline-none bg-neutral-950/50 border-white/5 rounded-xl focus:bg-neutral-900 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 shadow-inner" 
          />
          <input 
            type="password" 
            placeholder="Canvas API Token" 
            value={token} 
            onChange={({ target }) => setToken(target.value)} 
            required 
            className="w-full px-5 py-4 text-neutral-100 placeholder-neutral-500 transition-all duration-200 border outline-none bg-neutral-950/50 border-white/5 rounded-xl focus:bg-neutral-900 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 shadow-inner" 
          />
        </div>

        {/* Execution Button (Gradient Lighting & Disabled State Logic) */}
        <button 
          type="submit" 
          disabled={isRegistering}
          className="w-full py-4 mt-2 font-bold tracking-wide text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:grayscale"
        >
          {isRegistering ? 'Compiling Canvas Data...' : 'Link Canvas Account'}
        </button>

      </form>
    </div>
  );
};

export default Register;