import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState({
    nama: '',
    nim: '',
    universitas: '',
    noHpEmail: '',
    kelompok: '',
    proyek: '',
    github: '',
    tanggalMasuk: '',
    tanggalKeluar: '',
    penempatan: ''
  });

  const [successMessage, setSuccessMessage] = useState(''); // Menyimpan pesan sukses

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kirim data ke backend
      const response = await fetch('http://localhost/archive_mahasiswa_fix/student-api/getProfile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Mengirim data dalam format JSON
      });

      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage(responseData.message); // Tampilkan pesan dari backend
        setData({ // Reset form setelah submit
          nama: '',
          nim: '',
          universitas: '',
          noHpEmail: '',
          tanggalMasuk: '',
          tanggalKeluar: '',
          kelompok: '',
          proyek: '',
          github: '',
          penempatan: ''
        });
      } else {
        throw new Error(responseData.message || 'Error occurred while submitting data');
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('Failed to submit data. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="texttengah">SILAHKAN INPUT</h1>
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Tampilkan pesan sukses */}
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label htmlFor="tanggalMasuk" className="tanggal">Tanggal Masuk</label>
            <input 
              type="date" 
              name="tanggalMasuk" 
              id="tanggalMasuk" 
              value={data.tanggalMasuk} 
              onChange={handleChange} 
              required 
              style={{ width: '150px' }} 
            />
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
              name="nim" 
              placeholder="NIM" 
              value={data.nim} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="universitas" 
              placeholder="Asal Universitas" 
              value={data.universitas} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="noHpEmail" 
              placeholder="No HP / Email" 
              value={data.noHpEmail} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="tanggalKeluar" className="tanggal">Tanggal Keluar</label>
            <input 
              type="date" 
              name="tanggalKeluar" 
              id="tanggalKeluar" 
              value={data.tanggalKeluar} 
              onChange={handleChange} 
              required 
              style={{ width: '150px' }} 
            />
            <input 
              type="text" 
              name="kelompok" 
              placeholder="Nama Kelompok" 
              value={data.kelompok} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="proyek" 
              placeholder="Nama Proyek" 
              value={data.proyek} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="github" 
              placeholder="Link GitHub" 
              value={data.github} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="penempatan" 
              placeholder="Penempatan" 
              value={data.penempatan} 
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
