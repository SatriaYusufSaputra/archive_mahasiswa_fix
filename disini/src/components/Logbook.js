import React, { useState, useEffect, useCallback } from 'react';
import '../style/Logbook.css';

const Logbook = () => {
  const [data, setData] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [formInput, setFormInput] = useState({
    tanggal: '',
    uraian_projek: '',
    status: 'ongoing', // Default value sesuai dengan ENUM pada database
  });
  const userId = localStorage.getItem('userId'); // Ambil userId dari localStorage

  // Fungsi untuk mengambil data logbook dari server
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost/archive_mahasiswa_fix/student-api/logbook.php?userId=${userId}`);
      const result = await response.json();
      setData(result); // Mengupdate state dengan data terbaru dari server
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [userId]);

  // Panggil fetchData saat komponen pertama kali dimount
  useEffect(() => {
    if (userId) {
      fetchData();
    } else {
      console.error('User ID tidak ditemukan. Pastikan pengguna sudah login.');
    }
  }, [fetchData, userId]);

  const handleAddEntry = async () => {
    if (formInput.tanggal && formInput.uraian_projek && formInput.status) {
      const newEntry = {
        userId, // Tambahkan userId ke dalam data entri
        tanggal: formInput.tanggal,
        uraian_projek: formInput.uraian_projek,
        status: formInput.status,
      };

      try {
        const response = await fetch('http://localhost/archive_mahasiswa_fix/student-api/logbook.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEntry),
        });

        if (!response.ok) {
          throw new Error('Gagal mengirim data');
        }

        const result = await response.json();
        console.log(result.message);
        fetchData(); // Memperbarui data setelah menambah entri
        setFormInput({ tanggal: '', uraian_projek: '', status: 'ongoing' });
      } catch (error) {
        alert(`Terjadi kesalahan saat mengirim data: ${error.message}`);
        console.error('Error:', error);
      }
    } else {
      alert("Semua field harus diisi!");
    }
  };

  const handleEntriesPerPageChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleEdit = (index) => {
    const entryToEdit = data[index];
    setFormInput({
      tanggal: entryToEdit.tanggal,
      uraian_projek: entryToEdit.uraian_projek,
      status: entryToEdit.status,
    });
  };

  const handleDelete = async (index) => {
    const entryToDelete = data[index];
    if (window.confirm(`Apakah Anda yakin ingin menghapus entri tanggal ${entryToDelete.tanggal}?`)) {
      try {
        const response = await fetch(`http://localhost/archive_mahasiswa_fix/student-api/logbook.php?id=${entryToDelete.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message);
        }

        setData(data.filter((_, i) => i !== index));
        alert(result.message);
      } catch (error) {
        alert(`Terjadi kesalahan saat menghapus data: ${error.message}`);
        console.error('Error:', error);
      }
    }
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <div className="logbook-container">
      <h1>Logbook</h1>
      <p>Berikut merupakan daftar pemaparan yang telah kalian lakukan</p>
      <div className="input-container">
        <input
          type="date"
          name="tanggal"
          value={formInput.tanggal}
          onChange={(e) => setFormInput({ ...formInput, tanggal: e.target.value })}
        />
        <textarea
          name="uraian_projek"
          placeholder="Uraian Projek"
          value={formInput.uraian_projek}
          onChange={(e) => setFormInput({ ...formInput, uraian_projek: e.target.value })}
        />
        <select
          name="status"
          value={formInput.status}
          onChange={(e) => setFormInput({ ...formInput, status: e.target.value })}
        >
          <option value="revisi">Revisi</option>
          <option value="ongoing">Ongoing</option>
          <option value="selesai">Selesai</option>
        </select>
      </div>
      <div className="button-container">
        <button className="button-tambah" onClick={handleAddEntry}>Tambah</button>
      </div>
      <div className="pagination">
        <label htmlFor="entriesPerPage">Show Entries: </label>
        <select id="entriesPerPage" value={entriesPerPage} onChange={handleEntriesPerPageChange}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div className="logbook-entries">
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Uraian Projek</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.tanggal}</td>
                <td>{entry.uraian_projek}</td>
                <td>{entry.status}</td>
                <td>
                  <button className="button-edit" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="button-delete" onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logbook;
