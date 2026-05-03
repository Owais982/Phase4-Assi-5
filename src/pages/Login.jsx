import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, User, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('emilys'); // Pre-filled for demo
  const [password, setPassword] = useState('emilyspass');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Please enter both username and password.');
      setIsLoading(false);
      return;
    }

    const result = await login(username, password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
    
    setIsLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      background: '#FDFBF7', // Light cream background
      position: 'absolute', // To cover global body styles
      top: 0,
      left: 0,
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      overflow: 'hidden',
      color: '#4A3320' // Dark chocolate text
    }}>
      
      {/* Background Geometric Shapes */}
      <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'rgba(210, 180, 140, 0.2)', borderRadius: '50%', top: '-10%', left: '-5%' }}></div>
      <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'rgba(196, 164, 132, 0.15)', transform: 'rotate(45deg)', bottom: '5%', right: '5%' }}></div>
      <div style={{ position: 'absolute', width: '200px', height: '200px', background: 'rgba(196, 164, 132, 0.2)', borderRadius: '30%', top: '20%', right: '-5%', transform: 'rotate(20deg)' }}></div>

      {/* Login Card */}
      <div className="animate-fade-in" style={{ 
        maxWidth: '420px', 
        width: '100%', 
        padding: '3rem 2.5rem',
        background: '#C4A484', // Light chocolate color
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(139, 90, 43, 0.15), inset 0 1px 0 rgba(255,255,255,0.4)',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="text-center mb-8">
          <div style={{ fontSize: '2.5rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#3B2818', marginBottom: '0.5rem' }}>
            <Lock size={36} color="#3B2818" />
            LumiAuth
          </div>
          <p style={{ color: '#5C4033', fontSize: '1.1rem' }}>Sign in to your account</p>
        </div>

        {error && (
          <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#991B1B', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Demo Credentials Box */}
        <div style={{ background: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.4)', color: '#4A3320', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: '#3B2818' }}>Demo Credentials:</p>
          <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}><strong>Username/Email:</strong> emilys</p>
          <p style={{ margin: 0, fontSize: '0.875rem' }}><strong>Password:</strong> emilyspass</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: '#4A3320' }}>Email or Username</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#8B5A2B' }} />
              <input
                type="text"
                placeholder="Enter email or username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ 
                  width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem', 
                  background: '#FDFBF7', border: '1px solid #EBD9C8', 
                  borderRadius: '12px', color: '#4A3320', fontSize: '1rem',
                  outline: 'none', transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#8B5A2B'}
                onBlur={(e) => e.target.style.borderColor = '#EBD9C8'}
              />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: '#4A3320' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#8B5A2B' }} />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem', 
                  background: '#FDFBF7', border: '1px solid #EBD9C8', 
                  borderRadius: '12px', color: '#4A3320', fontSize: '1rem',
                  outline: 'none', transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#8B5A2B'}
                onBlur={(e) => e.target.style.borderColor = '#EBD9C8'}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              width: '100%', padding: '0.875rem', 
              background: '#5C4033', color: '#FDFBF7', 
              border: 'none', borderRadius: '12px', 
              fontSize: '1.1rem', fontWeight: '600', 
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              transition: 'all 0.2s', opacity: isLoading ? 0.7 : 1,
              boxShadow: '0 4px 12px rgba(92, 64, 51, 0.3)'
            }}
            onMouseOver={(e) => { if(!isLoading) e.target.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { if(!isLoading) e.target.style.transform = 'translateY(0)'; }}
          >
            {isLoading ? 'Signing in...' : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
