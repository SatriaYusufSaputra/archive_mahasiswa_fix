<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000"); // Sesuaikan dengan URL frontend Anda
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

include 'config.php'; // Pastikan file config.php sudah benar

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['user_id'])) {
            $user_id = intval($_GET['user_id']);
            $query = "SELECT id, nama, alamat, no_hp, tanggalMasuk, tanggalKeluar, proyek FROM users WHERE id = :user_id";
            try {
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($result) {
                    echo json_encode(["success" => true, "data" => $result]);
                } else {
                    echo json_encode(["success" => false, "message" => "Profil tidak ditemukan."]);
                }
            } catch (PDOException $e) {
                echo json_encode(["success" => false, "message" => "Kesalahan database: " . $e->getMessage()]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Parameter user_id diperlukan."]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['userId'], $data['nama'], $data['alamat'], $data['no_hp'], $data['tanggalMasuk'], $data['tanggalKeluar'], $data['proyek'])) {
            $user_id = intval($data['userId']);
            $query = "UPDATE users 
                      SET nama = :nama, alamat = :alamat, no_hp = :no_hp, 
                          tanggalMasuk = :tanggalMasuk, tanggalKeluar = :tanggalKeluar, proyek = :proyek 
                      WHERE id = :user_id";

            try {
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
                $stmt->bindParam(':nama', $data['nama'], PDO::PARAM_STR);
                $stmt->bindParam(':alamat', $data['alamat'], PDO::PARAM_STR);
                $stmt->bindParam(':no_hp', $data['no_hp'], PDO::PARAM_STR);
                $stmt->bindParam(':tanggalMasuk', $data['tanggalMasuk'], PDO::PARAM_STR);
                $stmt->bindParam(':tanggalKeluar', $data['tanggalKeluar'], PDO::PARAM_STR);
                $stmt->bindParam(':proyek', $data['proyek'], PDO::PARAM_STR);

                if ($stmt->execute()) {
                    echo json_encode(["success" => true, "message" => "Profil berhasil diperbarui."]);
                } else {
                    echo json_encode(["success" => false, "message" => "Gagal memperbarui profil."]);
                }
            } catch (PDOException $e) {
                echo json_encode(["success" => false, "message" => "Kesalahan database: " . $e->getMessage()]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Data tidak lengkap untuk menyimpan profil."]);
        }
        break;

    default:
        echo json_encode(["success" => false, "message" => "Metode tidak diizinkan."]);
        break;
}

$conn = null; 
?>
