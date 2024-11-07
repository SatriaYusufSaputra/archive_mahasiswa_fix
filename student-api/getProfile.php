<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3001"); // Ganti dengan URL frontend Anda
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
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

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // General search functionality
        $search = isset($_GET['search']) ? $_GET['search'] : '';
        $query = "SELECT id, nama, nim, universitas, noHpEmail, kelompok, proyek, github, tanggalMasuk, tanggalKeluar, penempatan FROM students";

        if ($search !== '') {
            $query .= " WHERE nama LIKE :search OR nim LIKE :search OR universitas LIKE :search OR kelompok LIKE :search OR proyek LIKE :search";
            $stmt = $conn->prepare($query);
            $searchTerm = "%$search%";
            $stmt->bindParam(':search', $searchTerm, PDO::PARAM_STR);
        } else {
            $stmt = $conn->prepare($query);
        }

        $stmt->execute();
        $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["success" => true, "data" => $students]);
        break;

    case 'POST':
        // Get data from the request
        $data = json_decode(file_get_contents("php://input"), true);

        // Check if all required data is present
        if (isset($data['nama'], $data['nim'], $data['universitas'], $data['noHpEmail'], $data['kelompok'], $data['proyek'], $data['github'], $data['tanggalMasuk'], $data['tanggalKeluar'], $data['penempatan'])) {
            $query = "INSERT INTO students (nama, nim, universitas, noHpEmail, kelompok, proyek, github, tanggalMasuk, tanggalKeluar, penempatan) 
                      VALUES (:nama, :nim, :universitas, :noHpEmail, :kelompok, :proyek, :github, :tanggalMasuk, :tanggalKeluar, :penempatan)";
            
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':nama', $data['nama'], PDO::PARAM_STR);
            $stmt->bindParam(':nim', $data['nim'], PDO::PARAM_STR);
            $stmt->bindParam(':universitas', $data['universitas'], PDO::PARAM_STR);
            $stmt->bindParam(':noHpEmail', $data['noHpEmail'], PDO::PARAM_STR);
            $stmt->bindParam(':kelompok', $data['kelompok'], PDO::PARAM_STR);
            $stmt->bindParam(':proyek', $data['proyek'], PDO::PARAM_STR);
            $stmt->bindParam(':github', $data['github'], PDO::PARAM_STR);
            $stmt->bindParam(':tanggalMasuk', $data['tanggalMasuk'], PDO::PARAM_STR);
            $stmt->bindParam(':tanggalKeluar', $data['tanggalKeluar'], PDO::PARAM_STR);
            $stmt->bindParam(':penempatan', $data['penempatan'], PDO::PARAM_STR);
            
            if ($stmt->execute()) {
                echo json_encode([
                    "success" => true,
                    "message" => "Data successfully saved!",
                    "id" => $conn->lastInsertId(),
                    "data" => $data
                ]);
            } else {
                echo json_encode(["success" => false, "message" => "Failed to save data: " . $stmt->errorInfo()[2]]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Incomplete data."]);
        }
        break;

    case 'DELETE':
        // Get id from the URL parameter
        $id = isset($_GET['id']) ? intval($_GET['id']) : null;

        if ($id) {
            $query = "DELETE FROM students WHERE id = :id";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT); 

            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    echo json_encode(["success" => true, "message" => "Data successfully deleted!"]);
                } else {
                    echo json_encode(["success" => false, "message" => "Data not found."]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "Failed to delete data: " . $stmt->errorInfo()[2]]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Invalid ID."]);
        }
        break;

    default:
        echo json_encode(["success" => false, "message" => "Method not allowed."]);
        break;
}

// Close the database connection
$conn = null;
