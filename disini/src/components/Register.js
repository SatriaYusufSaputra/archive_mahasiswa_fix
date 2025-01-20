import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validasi apakah password cocok
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Mengirim data ke backend
      const response = await fetch('http://localhost/archive_mahasiswa_fix/student-api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Data yang dikirim
      });

      const data = await response.json(); // Parsing response dari server

      if (data.success) {
        // Jika berhasil, arahkan ke halaman login
        alert('Registration successful! Redirecting to login page.');
        navigate('/login'); // Mengarahkan ke halaman login
      } else {
        // Tampilkan pesan kesalahan jika gagal
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      // Tangani error
      console.error('Error:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h1>Register</h1>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;