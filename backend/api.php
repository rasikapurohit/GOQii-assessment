<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Replace with your React app's URL
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Credentials: true");

// Include database connection
require 'conn.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // echo $_GET['id'];
            $stmt = $pdo->prepare("SELECT name, email, dob FROM users WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
        } else {
            $stmt = $pdo->query("SELECT * FROM users");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
        break;

    case 'POST':
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password, dob) VALUES (?, ?, ?, ?)");
        $hashedPassword = password_hash($input['password'], PASSWORD_BCRYPT);
        $stmt->execute([$input['name'], $input['email'], $hashedPassword, $input['dob']]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;

    case 'PUT':
        $stmt = $pdo->prepare("UPDATE users SET name = ?, email = ?, dob = ? WHERE id = ?");
        $stmt->execute([$input['name'], $input['email'], $input['dob'], $input['id']]);
        echo json_encode(['message' => 'User updated']);
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            echo json_encode(['message' => 'User deleted']);
        }
        break;
}
?>
