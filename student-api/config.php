<?php
$host = 'localhost'; // Ganti jika menggunakan host lain
$dbname = 'student_records'; // Nama database
$username = 'root'; // Username database
$password = ''; // Password database

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
