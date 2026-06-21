import { useState } from 'react';
import userService from '../services/users'

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

  const overlayStyle = {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    height: '100vh', width: '100vw', backgroundColor: '#1a1a1a', color: '#fff'
  };

  const formStyle = {
    display: 'flex', flexDirection: 'column', gap: '15px',
    backgroundColor: '#2d2d2d', padding: '40px', borderRadius: '8px',
    width: '350px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
  };

  const inputStyle = {
    padding: '10px', borderRadius: '4px', border: 'none', outline: 'none'
  };

  const buttonStyle = {
    padding: '12px', backgroundColor: '#3b82f6', color: 'white',
    border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
  };

  return (
    <div style={overlayStyle}>
      <form style={formStyle} onSubmit={handleRegister}>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <h2 style={{ margin: '0 0 10px 0' }}>Initialize System</h2>
          <p style={{ fontSize: '14px', color: '#aaa', margin: 0 }}>
            Insert credentials to manipulate your academic reality.
          </p>
        </div>

        <input 
          style={inputStyle} type="text" placeholder="Desired Username" 
          value={username} onChange={({ target }) => setUsername(target.value)} required 
        />
        <input 
          style={inputStyle} type="password" placeholder="Canvas API Token" 
          value={token} onChange={({ target }) => setToken(target.value)} required 
        />

        <button style={buttonStyle} type="submit" disabled={isRegistering}>
          {isRegistering ? 'Compiling Canvas Data...' : 'Link Canvas Account'}
        </button>
      </form>
    </div>
  );
};

export default Register;