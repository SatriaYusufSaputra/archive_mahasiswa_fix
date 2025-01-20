import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Login1.css';

const Login1 = () => {
  const navigate = useNavigate();

  const handleUserLogin =  () => {
    navigate('/login')
  };

  const handleAdminLogin = () => {
    navigate('/login');
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>MAGANG KITA</h1>
        <p>Disdukcapil Kota Semarang</p>
      </div>
      <div className="login-right">
        <div className="login-buttons">
          <button 
            className="google-login-btn" 
            onClick={handleUserLogin}
          >
           Login sebagai Mahasiswa
          </button>
          <button 
            className="admin-login-btn"
            onClick={handleAdminLogin}
          >
            Login Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login1;
