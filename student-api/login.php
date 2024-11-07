<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

$host = 'localhost';
$dbname = 'student_records';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Membaca data JSON dari input
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email ?? null;  // Menggunakan null coalescing untuk menghindari kesalahan
    $passwordInput = $data->password ?? null;  // Menggunakan null coalescing

    // Memeriksa apakah email dan password diberikan
    if (empty($email) || empty($passwordInput)) {
        echo json_encode(['success' => false, 'message' => 'Email atau password tidak boleh kosong.']);
        exit;
    }

    // Query untuk mengambil data pengguna berdasarkan email
    $query = $conn->prepare("SELECT * FROM users WHERE email = :email");
    $query->bindParam(':email', $email);
    $query->execute();

    // Memeriksa jika pengguna ditemukan
    if ($query->rowCount() > 0) {
        $user = $query->fetch(PDO::FETCH_ASSOC);
        
        // Memverifikasi password
        if (password_verify($passwordInput, $user['password'])) {
            echo json_encode(['success' => true, 'profileCompleted' => $user['profileCompleted']]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Password salah']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Email tidak ditemukan']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
