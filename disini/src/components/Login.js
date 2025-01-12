import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Login admin
    if (nama === 'admin' && password === 'admin') {
      navigate('/dashboard');
    } else {
      try {
        // Login user biasa
        const response = await fetch('http://localhost/archive_mahasiswa_fix/student-api/login.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nama, password }),
        });

        const data = await response.json();

        if (data.success) {
          localStorage.setItem('userId', data.userId); // Simpan userId di localStorage
          navigate('/profile'); // Arahkan ke halaman profil
        } else {
          alert(data.message || 'Login gagal. Pastikan nama dan password benar.');
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
          <label>Nama:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
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
    </div>
  );
}

export default Login;
