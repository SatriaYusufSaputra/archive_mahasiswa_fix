import React, { useEffect, useState } from 'react';
import '../style/Record.css';

const Record = () => {
  const [records, setRecords] = useState([]); // Menyimpan data record
  const [logbookEntries, setLogbookEntries] = useState([]); // Menyimpan data logbook untuk pengguna
  const [searchTerm, setSearchTerm] = useState(''); // Input pencarian
  const [loading, setLoading] = useState(false); // Status loading
  const [error, setError] = useState(null); // Menyimpan error jika ada
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Jumlah entri per halaman
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [isModalOpen, setIsModalOpen] = useState(false); // Menyimpan status apakah modal terbuka
  const [currentUserId, setCurrentUserId] = useState(null); // Menyimpan userId yang sedang dilihat logbook-nya

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

  // Fungsi untuk mengambil logbook berdasarkan userId
  const fetchLogbook = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost/archive_mahasiswa_fix/student-api/logbook.php?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setLogbookEntries(data);
      } else {
        setError('Data logbook tidak valid');
      }
    } catch (error) {
      setError('Gagal mengambil logbook');
    } finally {
      setLoading(false);
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

  // Filter berdasarkan kolom dari Dashboard.js
  const filteredRecords = currentRecords.filter(record =>
    (record.nama && record.nama.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (record.alamat && record.alamat.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (record.no_hp && record.no_hp.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (record.tanggalMasuk && record.tanggalMasuk.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (record.tanggalKeluar && record.tanggalKeluar.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (record.proyek && record.proyek.toLowerCase().includes(searchTerm.toLowerCase()))
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

  const handleUserClick = (userId) => {
    setCurrentUserId(userId); // Menyimpan ID pengguna yang dipilih
    fetchLogbook(userId); // Mengambil data logbook pengguna berdasarkan userId
    setIsModalOpen(true); // Menampilkan modal pop-up
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Menutup modal
    setLogbookEntries([]); // Menghapus logbook yang ditampilkan
  };

  return (
    <div className="record-container">
      <div className="record-content">
        <h1>Record Mahasiswa</h1>
        <input
          type="text"
          placeholder="Kolom Pencarian"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <label htmlFor="entriesPerPage">Tampilkan Entri: </label>
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
                <th>Alamat</th>
                <th>No HP</th>
                <th>Tanggal Masuk</th>
                <th>Tanggal Keluar</th>
                <th>Proyek</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <button onClick={() => handleUserClick(record.id)}>
                        {record.nama}
                      </button>
                    </td>
                    <td>{record.alamat}</td>
                    <td>{record.no_hp}</td>
                    <td>{record.tanggalMasuk}</td>
                    <td>{record.tanggalKeluar}</td>
                    <td>{record.proyek}</td>
                    <td>
                      <button onClick={() => handleDelete(record.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Tidak ada data yang tersedia</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Logbook Pengguna</h2>
              <button className="close-button" onClick={handleCloseModal}>X</button>
              <table>
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Uraian Proyek</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {logbookEntries.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.tanggal}</td>
                      <td>{entry.uraian_projek}</td>
                      <td>{entry.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Record;
