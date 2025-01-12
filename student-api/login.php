<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000"); // Ganti dengan URL frontend Anda
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Include the database configuration file
include 'config.php';

/** @var PDO $conn */
if (!$conn) {
    echo json_encode(["success" => false, "message" => "Failed to connect to the database."]);
    exit();
}

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Handle POST request for login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $nama = isset($data['nama']) ? trim($data['nama']) : null;
    $password = isset($data['password']) ? trim($data['password']) : null;

    if ($nama && $password) {
        $query = "SELECT id, password FROM users WHERE nama = :nama";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':nama', $nama, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                echo json_encode([
                    "success" => true,
                    "userId" => $user['id'],
                    "message" => "Login berhasil!"
                ]);
            } else {
                echo json_encode(["success" => false, "message" => "Nama atau password salah."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Terjadi kesalahan pada server."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Nama dan password harus diisi."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Method not allowed."]);
}

// Close the database connection
$conn = null;
