import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../style/Profile.css';

const Profile = () => {
  const [data, setData] = useState({
    nama: '',
    alamat: '',
    no_hp: '',
    tanggalMasuk: '',
    tanggalKeluar: '',
    proyek: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }
    fetchUserProfile(userId);
  }, [navigate]);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await fetch(`http://localhost/archive_mahasiswa_fix/student-api/saveProfile.php?user_id=${userId}`, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await response.json();
      if (result.success && result.data) {
        setData(result.data);
      } else {
        setErrorMessage(result.message || 'Profil tidak ditemukan.');
      }
    } catch (error) {
      setErrorMessage('Gagal mengambil data profil.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    try {
      const response = await fetch('http://localhost/archive_mahasiswa_fix/student-api/saveProfile.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId,
          ...data,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSuccessMessage('Profil berhasil disimpan!');
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage('Gagal menyimpan profil.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>Profil Anda</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label>Nama: <input type="text" name="nama" value={data.nama} onChange={handleChange} required /></label>
          <label>Alamat: <input type="text" name="alamat" value={data.alamat} onChange={handleChange} required /></label>
          <label>No HP: <input type="text" name="no_hp" value={data.no_hp} onChange={handleChange} required /></label>
          <label>Tanggal Masuk: <input type="date" name="tanggalMasuk" value={data.tanggalMasuk} onChange={handleChange} required /></label>
          <label>Tanggal Keluar: <input type="date" name="tanggalKeluar" value={data.tanggalKeluar} onChange={handleChange} required /></label>
          <label>Proyek: <input type="text" name="proyek" value={data.proyek} onChange={handleChange} required /></label>
          <button type="submit">Simpan Profil</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
