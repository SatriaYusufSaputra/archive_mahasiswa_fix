import React, { useEffect, useState } from 'react';
import './Record.css';

const Record = () => {
  const [records, setRecords] = useState([]); // Menyimpan data record
  const [searchTerm, setSearchTerm] = useState(''); // Input pencarian
  const [loading, setLoading] = useState(false); // Status loading
  const [error, setError] = useState(null); // Menyimpan error jika ada
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Jumlah entri per halaman
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini

  useEffect(() => {
    fetchRecords(); // Ambil data saat komponen di-mount
  }, []);

  // Fungsi untuk mengambil data dari server
  const fetchRecords = async () => {
    setLoading(true); // Mulai loading
    setError(null); // Reset error

    try {
      const response = await fetch('http://localhost/archive_mahasiswa_fix/student-api/getProfile.php', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setRecords(data.data); // Set data jika berbentuk array
      } else {
        setError(data.message || 'Data tidak valid');
      }
    } catch (error) {
      setError('Gagal mengambil data');
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  const handleEntriesPerPageChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Kembali ke halaman pertama
  };

  // Paginasi
  const indexOfLastRecord = currentPage * entriesPerPage;
  const indexOfFirstRecord = indexOfLastRecord - entriesPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const filteredRecords = currentRecords.filter(record =>
    (record.nama && record.nama.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (record.nim && record.nim.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (record.universitas && record.universitas.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (record.kelompok && record.kelompok.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (record.proyek && record.proyek.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (record.github && record.github.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (record.noHpEmail && record.noHpEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (record.penempatan && record.penempatan.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost/archive_mahasiswa_fix/student-api/getProfile.php?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();
      if (data.success) {
        setRecords((prevRecords) => prevRecords.filter(record => record.id !== id));
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className="record-container">
      <div className="record-content">
        <h1>Record</h1>
        <input
          type="text"
          placeholder="Kolom Pencarian"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <label htmlFor="entriesPerPage">Show Entries: </label>
        <select id="entriesPerPage" value={entriesPerPage} onChange={handleEntriesPerPageChange}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
        </select>

        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>NIM</th>
                <th>Universitas</th>
                <th>No HP/Email</th>
                <th>Kelompok</th>
                <th>Proyek</th>
                <th>GitHub</th>
                <th>Tanggal Masuk</th>
                <th>Tanggal Keluar</th>
                <th>Penempatan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.nama}</td>
                    <td>{record.nim}</td>
                    <td>{record.universitas}</td>
                    <td>{record.noHpEmail}</td>
                    <td>{record.kelompok}</td>
                    <td>{record.proyek}</td>
                    <td>
                      <a href={record.github} target="_blank" rel="noopener noreferrer">
                        {record.github}
                      </a>
                    </td>
                    <td>{record.tanggalMasuk}</td>
                    <td>{record.tanggalKeluar}</td>
                    <td>{record.penempatan}</td>
                    <td>
                      <button onClick={() => handleDelete(record.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11">Tidak ada data yang tersedia</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Record;
