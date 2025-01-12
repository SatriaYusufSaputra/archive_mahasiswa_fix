<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$host = 'localhost'; // Ganti dengan host database Anda
$db = 'app_students'; // Ganti dengan nama database Anda
$user = 'root'; // Ganti dengan username database Anda
$pass = ''; // Ganti dengan password database Anda

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

// Mengambil data logbook berdasarkan userId
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = isset($_GET['userId']) ? intval($_GET['userId']) : 0;
    $sql = "SELECT * FROM logbook WHERE user_id = ? ORDER BY tanggal DESC";  // Mengurutkan berdasarkan tanggal terbaru

    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        die(json_encode(['success' => false, 'message' => 'SQL prepare error: ' . $conn->error]));
    }

    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $logbookEntries = [];
    while ($row = $result->fetch_assoc()) {
        $logbookEntries[] = $row;
    }

    echo json_encode($logbookEntries);
}

// Menambahkan entri logbook baru
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['userId'], $data['tanggal'], $data['uraian_projek'], $data['status'])) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
        exit;
    }

    $userId = intval($data['userId']);
    $tanggal = $data['tanggal'];
    $uraian_projek = $data['uraian_projek'];
    $status = $data['status'];

    $sql = "INSERT INTO logbook (user_id, tanggal, uraian_projek, status) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        die(json_encode(['success' => false, 'message' => 'SQL prepare error: ' . $conn->error]));
    }

    $stmt->bind_param("isss", $userId, $tanggal, $uraian_projek, $status);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Logbook entry added successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add logbook entry.']);
    }
}

// Menghapus entri logbook
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($id === 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid ID']);
        exit;
    }

    $sql = "DELETE FROM logbook WHERE id = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        die(json_encode(['success' => false, 'message' => 'SQL prepare error: ' . $conn->error]));
    }

    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Logbook entry deleted successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete logbook entry.']);
    }
}

$conn->close();
?>
