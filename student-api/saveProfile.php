<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Header CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Ambil input JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validasi input
if (!isset($data['userId'], $data['nama'], $data['alamat'], $data['no_hp'], $data['tanggalMasuk'], $data['tanggalKeluar'], $data['proyek'])) {
    echo json_encode(["success" => false, "message" => "Semua field harus diisi."]);
    exit;
}

// Koneksi ke database
$servername = "localhost"; // Sesuaikan dengan server database Anda
$username = "root";        // Sesuaikan dengan username database Anda
$password = "";            // Sesuaikan dengan password database Anda
$dbname = "app_students";  // Sesuaikan dengan nama database Anda

$conn = new mysqli($servername, $username, $password, $dbname);

// Periksa koneksi
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Koneksi ke database gagal: " . $conn->connect_error]);
    exit;
}

// Ambil data dari input
$userId = $data['userId'];
$nama = $data['nama'];
$alamat = $data['alamat'];
$no_hp = $data['no_hp'];
$tanggalMasuk = $data['tanggalMasuk'];
$tanggalKeluar = $data['tanggalKeluar'];
$proyek = $data['proyek'];

// Periksa apakah pengguna sudah ada
$stmt = $conn->prepare("SELECT 1 FROM users WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Jika pengguna sudah ada, update data
    $stmt->close();
    $stmt = $conn->prepare("UPDATE users SET nama = ?, alamat = ?, no_hp = ?, tanggal_masuk = ?, tanggal_keluar = ?, proyek = ? WHERE id = ?");
    $stmt->bind_param("ssssssi", $nama, $alamat, $no_hp, $tanggalMasuk, $tanggalKeluar, $proyek, $userId);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Profil berhasil diperbarui!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Gagal memperbarui profil: " . $stmt->error]);
    }
} else {
    // Jika pengguna belum ada, tambahkan data
    $stmt->close();
    $stmt = $conn->prepare("INSERT INTO users (id, nama, alamat, no_hp, tanggal_masuk, tanggal_keluar, proyek) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("issssss", $userId, $nama, $alamat, $no_hp, $tanggalMasuk, $tanggalKeluar, $proyek);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Profil berhasil disimpan!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Gagal menyimpan profil: " . $stmt->error]);
    }
}

$stmt->close();
$conn->close();
