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

// Cek apakah semua field yang dibutuhkan ada
$requiredFields = ['nama', 'nim', 'universitas', 'noHpEmail', 'kelompok', 'proyek', 'github', 'tanggalMasuk', 'tanggalKeluar', 'penempatan'];
foreach ($requiredFields as $field) {
    if (!isset($data[$field])) {
        echo json_encode(["success" => false, "message" => "Field '$field' tidak ditemukan."]);
        exit;
    }
}

// Koneksi ke database
$servername = "localhost"; // Ganti dengan server database Anda
$username = "root"; // Ganti dengan username database Anda
$password = ""; // Ganti dengan password database Anda
$dbname = "student_records"; // Ganti dengan nama database Anda

$conn = new mysqli($servername, $username, $password, $dbname);

// Memeriksa koneksi
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Koneksi ke database gagal: " . $conn->connect_error]);
    exit;
}

// Ambil data dari array
$nama = $data['nama'];
$nim = $data['nim'];
$universitas = $data['universitas'];
$noHpEmail = $data['noHpEmail'];
$kelompok = $data['kelompok'];
$proyek = $data['proyek'];
$github = $data['github'];
$tanggalMasuk = $data['tanggalMasuk'];
$tanggalKeluar = $data['tanggalKeluar'];
$penempatan = $data['penempatan'];

// Siapkan statement untuk memeriksa apakah profil sudah ada
$stmt = $conn->prepare("SELECT * FROM profiles WHERE noHpEmail = ?");
$stmt->bind_param("s", $noHpEmail);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Jika profil sudah ada, lakukan update
    $stmt->close();
    $stmt = $conn->prepare("UPDATE profiles SET name = ?, nim = ?, universitas = ?, noHpEmail = ?, kelompok = ?, proyek = ?, github = ?, tanggal_masuk = ?, tanggal_keluar = ?, penempatan = ? WHERE noHpEmail = ?");
    $stmt->bind_param("sssssssssss", $nama, $nim, $universitas, $noHpEmail, $kelompok, $proyek, $github, $tanggalMasuk, $tanggalKeluar, $penempatan, $noHpEmail);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Profil berhasil diperbarui!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Gagal memperbarui profil: " . $stmt->error]);
    }
} else {
    // Jika tidak ada, lakukan insert
    $stmt->close();
    $stmt = $conn->prepare("INSERT INTO profiles (name, nim, universitas, noHpEmail, kelompok, proyek, github, tanggal_masuk, tanggal_keluar, penempatan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssss", $nama, $nim, $universitas, $noHpEmail, $kelompok, $proyek, $github, $tanggalMasuk, $tanggalKeluar, $penempatan);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Profil berhasil disimpan!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Gagal menyimpan profil: " . $stmt->error]);
    }
}

$stmt->close();
$conn->close();
