
<?php
// Database configuration
class Database {
    private $host = 'localhost';
    private $db_name = 'portfolio_dashboard';
    private $username = 'root';
    private $password = '';
    private $charset = 'utf8mb4';
    public $pdo;

    public function getConnection() {
        $this->pdo = null;
        
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=" . $this->charset;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            
            $this->pdo = new PDO($dsn, $this->username, $this->password, $options);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        
        return $this->pdo;
    }
    
    public function closeConnection() {
        $this->pdo = null;
    }
}

// Database utility functions
class DatabaseHelper {
    public static function sanitizeInput($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    
    public static function validateEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }
    
    public static function hashPassword($password) {
        return password_hash($password, PASSWORD_DEFAULT);
    }
    
    public static function verifyPassword($password, $hash) {
        return password_verify($password, $hash);
    }
    
    public static function generateToken($length = 32) {
        return bin2hex(random_bytes($length));
    }
}

// Environment configuration
class Config {
    public static function get($key, $default = null) {
        $config = [
            'app_name' => 'Portfolio Dashboard',
            'app_version' => '1.0.0',
            'timezone' => 'UTC',
            'debug' => true,
            'max_upload_size' => '10MB',
            'allowed_file_types' => ['pdf', 'xlsx', 'csv', 'jpg', 'png'],
            'jwt_secret' => 'your-secret-key-here',
            'jwt_expiry' => 3600, // 1 hour
            'pagination_limit' => 20,
            'cache_enabled' => false,
            'cache_duration' => 300, // 5 minutes
        ];
        
        return isset($config[$key]) ? $config[$key] : $default;
    }
}

// Response helper
class Response {
    public static function json($data, $status_code = 200) {
        http_response_code($status_code);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
    
    public static function success($data = [], $message = 'Success') {
        self::json([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'timestamp' => date('c')
        ]);
    }
    
    public static function error($message = 'Error', $status_code = 400, $errors = []) {
        self::json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
            'timestamp' => date('c')
        ], $status_code);
    }
    
    public static function notFound($message = 'Resource not found') {
        self::error($message, 404);
    }
    
    public static function unauthorized($message = 'Unauthorized') {
        self::error($message, 401);
    }
    
    public static function forbidden($message = 'Forbidden') {
        self::error($message, 403);
    }
    
    public static function methodNotAllowed($message = 'Method not allowed') {
        self::error($message, 405);
    }
}
?>
