import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [data, setData] = useState({
    nama: '',
    nim: '',
    universitas: '',
    noHpEmail: '',
    kelompok: '',
    proyek: '',
    github: '',
    tanggal_masuk: '',
    tanggal_keluar: '',
    penempatan: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);
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
      const response = await fetch(`http://localhost/archive_mahasiswa_fix/student-api/getProfile.php?user_id=${userId}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();

      if (result.success && result.data && result.data.length > 0) {
        setData(result.data[0]); // Ambil data pengguna pertama
        setIsProfileCompleted(true);
        localStorage.setItem('isProfileCompleted', 'true');
      } else {
        setIsProfileCompleted(false);
        setErrorMessage(result.message || 'Anda belum melengkapi profil.');
      }
    } catch (error) {
      setErrorMessage('Anda belum melengkapi profil.');
      console.error('Error saat mengambil profil:', error);
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
          nama: data.nama,
          nim: data.nim, 
          universitas: data.universitas, 
          noHpEmail: data.noHpEmail,
          kelompok: data.kelompok, 
          proyek: data.proyek, 
          github: data.github, 
          tanggalMasuk: data.tanggalMasuk,
          tanggalKeluar: data.tanggalMeluar,
          penempatan: data.penempatan 
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage('Profil berhasil disimpan!');
        setIsProfileCompleted(true);
        localStorage.setItem('isProfileCompleted', 'true');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setErrorMessage('Gagal menyimpan profil.');
      console.error('Error saat menyimpan profil:', error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>Profil Anda</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {isProfileCompleted ? (
          <div className="profile-locked">
            <p><strong>Nama:</strong> {data.nama || 'Tidak tersedia'}</p>
            <p><strong>NIM:</strong> {data.nim || 'Tidak tersedia'}</p>
            <p><strong>Universitas:</strong> {data.universitas || 'Tidak tersedia'}</p>
            <p><strong>No HP / Email:</strong> {data.noHpEmail || 'Tidak tersedia'}</p>
            <p><strong>Kelompok:</strong> {data.kelompok || 'Tidak tersedia'}</p>
            <p><strong>Proyek:</strong> {data.proyek || 'Tidak tersedia'}</p>
            <p><strong>GitHub:</strong> {data.github || 'Tidak tersedia'}</p>
            <p><strong>Tanggal Masuk:</strong> {data.tanggalMasuk || 'Tidak tersedia'}</p>
            <p><strong>Tanggal Keluar:</strong> {data.tanggalKeluar || 'Tidak tersedia'}</p>
            <p><strong>Penempatan:</strong> {data.penempatan || 'Tidak tersedia'}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Nama:
                <input type="text" name="nama" value={data.nama} onChange={handleChange} required />
              </label>
              <label>
                NIM:
                <input type="text" name="nim" value={data.nim} onChange={handleChange} required />
              </label>
              <label>
                Universitas:
                <input type="text" name="universitas" value={data.universitas} onChange={handleChange} required />
              </label>
              <label>
                No HP / Email:
                <input type="text" name="noHpEmail" value={data.noHpEmail} onChange={handleChange} required />
              </label>
              <label>
                Tanggal Masuk:
                <input type="date" name="tanggalMasuk" value={data.tanggalMasuk} onChange={handleChange} required />
              </label>
              <label>
                Tanggal Keluar:
                <input type="date" name="tanggalKeluar" value={data.tanggalKeluar} onChange={handleChange} required />
              </label>
              <label>
                Kelompok:
                <input type="text" name="kelompok" value={data.kelompok} onChange={handleChange} required />
              </label>
              <label>
                Proyek:
                <input type="text" name="proyek" value={data.proyek} onChange={handleChange} required />
              </label>
              <label>
                GitHub:
                <input type="text" name="github" value={data.github} onChange={handleChange} required />
              </label>
              <label>
                Penempatan:
                <input type="text" name="penempatan" value={data.penempatan} onChange={handleChange} required />
              </label>
            </div>
            <button type="submit">Simpan Profil</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
