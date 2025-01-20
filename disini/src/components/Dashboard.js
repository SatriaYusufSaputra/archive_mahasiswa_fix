import React, { useState } from 'react';
import '../style/Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState({
    nama: '',
    password: '',
    alamat: '',
    no_hp: '',
    tanggalMasuk: '',
    tanggalKeluar: '',
    proyek: ''
  });

  const [successMessage, setSuccessMessage] = useState(''); // Menyimpan pesan sukses
  const [errorMessage, setErrorMessage] = useState(''); // Menyimpan pesan error

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sinkronisasi nama dan password
    if (name === 'nama') {
      setData({ ...data, nama: value, password: value });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/archive_mahasiswa_fix/student-api/addUser.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Mengirim data dalam format JSON
      });

      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage(responseData.message); // Tampilkan pesan sukses dari backend
        setErrorMessage('');
        setData({
          nama: '',
          password: '',
          alamat: '',
          no_hp: '',
          tanggalMasuk: '',
          tanggalKeluar: '',
          proyek: ''
        }); // Reset form
      } else {
        throw new Error(responseData.message || 'Error occurred while submitting data');
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('');
      setErrorMessage('Failed to submit data. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="texttengah">Mendaftarkan Mahasiswa</h1>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <input
              type="text"
              name="nama"
              placeholder="Nama"
              value={data.nama}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="alamat"
              placeholder="Alamat"
              value={data.alamat}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="no_hp"
              placeholder="No HP"
              value={data.no_hp}
              onChange={handleChange}
              required
            />
            <label htmlFor="tanggalMasuk">Tanggal Masuk</label>
            <input
              type="date"
              name="tanggalMasuk"
              id="tanggalMasuk"
              value={data.tanggalMasuk}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tanggalKeluar">Tanggal Keluar</label>
            <input
              type="date"
              name="tanggalKeluar"
              id="tanggalKeluar"
              value={data.tanggalKeluar}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="proyek"
              placeholder="Proyek"
              value={data.proyek}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
