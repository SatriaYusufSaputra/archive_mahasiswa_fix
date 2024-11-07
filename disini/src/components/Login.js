import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (emailOrUsername === 'admin' && password === 'admin') {
      navigate('/dashboard');
    } else {
      try {
        const response = await fetch('http://localhost/archive_mahasiswa_fix/student-api/login.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailOrUsername, password }),
        });

        const data = await response.json();

        if (data.success) {
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('isProfileCompleted', data.profileCompleted ? 'true' : 'false');
          navigate('/profile');
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert(`Terjadi kesalahan saat login: ${error.message}`);
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1>Login</h1>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <div className="register-link">
        <span>Belum punya akun? </span>
        <button className="register-button" onClick={() => navigate('/register')}>Daftar di sini</button>
      </div>
    </div>
  );
}

export default Login;
