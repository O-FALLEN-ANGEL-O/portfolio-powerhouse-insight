
<?php
// Client Management API

$clients_data = [
    [
        'id' => 1,
        'name' => 'TechStart Inc.',
        'contact_person' => 'John Smith',
        'email' => 'john@techstart.com',
        'phone' => '+1 (555) 123-4567',
        'industry' => 'Technology',
        'aum' => 2500000,
        'projects_count' => 2,
        'status' => 'Active',
        'created_at' => '2024-01-15',
        'last_contact' => '2024-06-01'
    ],
    [
        'id' => 2,
        'name' => 'RetailCorp',
        'contact_person' => 'Sarah Johnson',
        'email' => 'sarah@retailcorp.com',
        'phone' => '+1 (555) 987-6543',
        'industry' => 'Retail',
        'aum' => 5800000,
        'projects_count' => 1,
        'status' => 'Active',
        'created_at' => '2024-02-10',
        'last_contact' => '2024-05-28'
    ],
    [
        'id' => 3,
        'name' => 'GreenEnergy Solutions',
        'contact_person' => 'Mike Davis',
        'email' => 'mike@greenenergy.com',
        'phone' => '+1 (555) 456-7890',
        'industry' => 'Energy',
        'aum' => 3200000,
        'projects_count' => 1,
        'status' => 'Review',
        'created_at' => '2024-03-05',
        'last_contact' => '2024-06-03'
    ]
];

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            $client_id = intval($_GET['id']);
            $client = array_filter($clients_data, function($c) use ($client_id) {
                return $c['id'] === $client_id;
            });
            if (!empty($client)) {
                echo json_encode(array_values($client)[0]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Client not found']);
            }
        } else {
            echo json_encode([
                'data' => $clients_data,
                'total' => count($clients_data),
                'total_aum' => array_sum(array_column($clients_data, 'aum'))
            ]);
        }
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        $required_fields = ['name', 'contact_person', 'email', 'industry'];
        foreach ($required_fields as $field) {
            if (!isset($input[$field]) || empty($input[$field])) {
                http_response_code(400);
                echo json_encode(['error' => "Missing required field: $field"]);
                exit;
            }
        }
        
        $new_client = [
            'id' => count($clients_data) + 1,
            'name' => $input['name'],
            'contact_person' => $input['contact_person'],
            'email' => $input['email'],
            'phone' => $input['phone'] ?? '',
            'industry' => $input['industry'],
            'aum' => floatval($input['aum'] ?? 0),
            'projects_count' => 0,
            'status' => 'Active',
            'created_at' => date('Y-m-d'),
            'last_contact' => date('Y-m-d')
        ];
        
        echo json_encode(['message' => 'Client created successfully', 'data' => $new_client]);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>
