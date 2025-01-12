<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

// Konfigurasi database
$host = 'localhost';
$dbname = 'app_students'; // Sesuaikan dengan nama database Anda
$username = 'root';
$password = '';

try {
    // Koneksi ke database menggunakan PDO
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Membaca data JSON dari input
    $data = json_decode(file_get_contents("php://input"));

    $nama = $data->nama ?? null;
    $passwordInput = $data->password ?? null;
    $alamat = $data->alamat ?? null;
    $no_hp = $data->no_hp ?? null;
    $tanggalMasuk = $data->tanggalMasuk ?? null;
    $tanggalKeluar = $data->tanggalKeluar ?? null;
    $proyek = $data->proyek ?? null;

    // Validasi input
    if (empty($nama) || empty($passwordInput) || empty($alamat) || empty($no_hp) || empty($tanggalMasuk) || empty($tanggalKeluar) || empty($proyek)) {
        echo json_encode(['success' => false, 'message' => 'Semua data wajib diisi.']);
        exit;
    }

    // Hash password
    $hashedPassword = password_hash($passwordInput, PASSWORD_DEFAULT);

    // Menambahkan pengguna ke database
    $query = $conn->prepare("
        INSERT INTO users (nama, password, alamat, no_hp, tanggalMasuk, tanggalKeluar, proyek) 
        VALUES (:nama, :password, :alamat, :no_hp, :tanggalMasuk, :tanggalKeluar, :proyek)
    ");
    $query->bindParam(':nama', $nama);
    $query->bindParam(':password', $hashedPassword);
    $query->bindParam(':alamat', $alamat);
    $query->bindParam(':no_hp', $no_hp);
    $query->bindParam(':tanggalMasuk', $tanggalMasuk);
    $query->bindParam(':tanggalKeluar', $tanggalKeluar);
    $query->bindParam(':proyek', $proyek);

    if ($query->execute()) {
        echo json_encode(['success' => true, 'message' => 'Pengguna berhasil ditambahkan.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menambahkan pengguna.']);
    }
} catch (PDOException $e) {
    // Tangani kesalahan koneksi atau query
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>
