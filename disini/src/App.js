import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faClipboardList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Logbook from './components/Logbook';
import Record from './components/Record';
import Login1 from './components/Login1';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    fetch('http://localhost/archive_mahasiswa_fix/student-api/logout.php', { 
        method: 'POST',
        credentials: 'include',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); // Konfirmasi logout berhasil
        navigate('/');
    })
    .catch(error => {
        console.error('Error during logout:', error);
    });
};


  return (
      <nav className="sidebar">
          <div className="logo">
              <img src="image/logo.png" alt="Magang Kita" />
              <div>MAGANG KITA</div>
          </div>
          <ul>
              <li>
                  <NavLink to="/dashboard" className="sidebar-link">
                      <FontAwesomeIcon icon={faTachometerAlt} className="icon" /> Dashboard
                  </NavLink>
              </li>
              <li>
                  <NavLink to="/record" className="sidebar-link">
                      <FontAwesomeIcon icon={faClipboardList} className="icon" /> Record
                  </NavLink>
              </li>
              <li>
                  <button onClick={handleLogout} className="sidebar-link logout-button">
                      <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Logout
                  </button>
              </li>
          </ul>
      </nav>
  );
}

function LogbookSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    fetch('http://localhost/archive_mahasiswa_fix/student-api/logout.php', { 
        method: 'POST',
        credentials: 'include',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); // Konfirmasi logout berhasil
        navigate('/');
    })
    .catch(error => {
        console.error('Error during logout:', error);
    });
};


  return (
      <nav className="sidebar logbook-sidebar">
          <div className="logo">
              <img src="image/logo.png" alt="Magang Kita" />
              <div>Magang Kita</div>
          </div>
          <ul>
              <li>
                  <NavLink to="/profile" className="sidebar-link">
                      <FontAwesomeIcon icon={faClipboardList} className="icon" /> Profile
                  </NavLink>
              </li>
              <li>
                  <NavLink to="/logbook" className="sidebar-link">
                      <FontAwesomeIcon icon={faClipboardList} className="icon" /> Logbook
                  </NavLink>
              </li>
              <li>
                  <button onClick={handleLogout} className="sidebar-link logout-button">
                      <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Logout
                  </button>
              </li>
          </ul>
      </nav>
  );
}


function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/logout' || location.pathname === '/' || location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isLogbookPage = location.pathname === '/logbook';
  const isProfilePage = location.pathname === '/profile';

  return (
    <div className="app">
      {!isLoginPage && !isRegisterPage && !isLogbookPage && !isProfilePage && <Sidebar />}
      {(isLogbookPage || isProfilePage) && <LogbookSidebar />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Login1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logbook" element={<Logbook />} />
          <Route path="/record" element={<Record />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
