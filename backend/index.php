
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple routing
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Remove /api prefix if present
$path = preg_replace('/^\/api/', '', $path);

switch ($path) {
    case '/':
        echo json_encode(['message' => 'Portfolio Dashboard API v1.0', 'status' => 'active']);
        break;
    case '/health':
        echo json_encode(['status' => 'healthy', 'timestamp' => date('c')]);
        break;
    default:
        // Route to specific API handlers
        if (strpos($path, '/clients') === 0) {
            include_once 'api/clients/index.php';
        } elseif (strpos($path, '/projects') === 0) {
            include_once 'api/projects/index.php';
        } elseif (strpos($path, '/portfolio') === 0) {
            include_once 'api/portfolio/index.php';
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
}
?>
