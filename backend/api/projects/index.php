
<?php
// Project Management API

$projects_data = [
    [
        'id' => 1,
        'name' => 'TechStart Ventures Series A',
        'client_id' => 1,
        'client_name' => 'TechStart Inc.',
        'description' => 'Series A funding round advisory services',
        'status' => 'In Progress',
        'progress' => 75,
        'start_date' => '2024-03-01',
        'due_date' => '2024-07-15',
        'budget' => 150000,
        'team_members' => ['Alice Johnson', 'Bob Smith', 'Charlie Brown'],
        'tasks_total' => 12,
        'tasks_completed' => 9,
        'priority' => 'High',
        'created_at' => '2024-03-01'
    ],
    [
        'id' => 2,
        'name' => 'RetailCorp IPO Preparation',
        'client_id' => 2,
        'client_name' => 'RetailCorp',
        'description' => 'Initial Public Offering preparation and advisory',
        'status' => 'Planning',
        'progress' => 25,
        'start_date' => '2024-05-01',
        'due_date' => '2024-08-30',
        'budget' => 500000,
        'team_members' => ['David Wilson', 'Eva Martinez'],
        'tasks_total' => 8,
        'tasks_completed' => 2,
        'priority' => 'High',
        'created_at' => '2024-05-01'
    ],
    [
        'id' => 3,
        'name' => 'GreenEnergy M&A Advisory',
        'client_id' => 3,
        'client_name' => 'GreenEnergy Solutions',
        'description' => 'Merger and acquisition advisory services',
        'status' => 'Review',
        'progress' => 90,
        'start_date' => '2024-02-15',
        'due_date' => '2024-06-20',
        'budget' => 250000,
        'team_members' => ['Frank Davis', 'Grace Lee', 'Henry Kim'],
        'tasks_total' => 15,
        'tasks_completed' => 14,
        'priority' => 'Medium',
        'created_at' => '2024-02-15'
    ]
];

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            $project_id = intval($_GET['id']);
            $project = array_filter($projects_data, function($p) use ($project_id) {
                return $p['id'] === $project_id;
            });
            if (!empty($project)) {
                echo json_encode(array_values($project)[0]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Project not found']);
            }
        } else {
            // Filter by status if provided
            $status_filter = $_GET['status'] ?? null;
            $filtered_projects = $projects_data;
            
            if ($status_filter) {
                $filtered_projects = array_filter($projects_data, function($p) use ($status_filter) {
                    return strtolower($p['status']) === strtolower($status_filter);
                });
            }
            
            echo json_encode([
                'data' => array_values($filtered_projects),
                'total' => count($filtered_projects),
                'summary' => [
                    'total_budget' => array_sum(array_column($filtered_projects, 'budget')),
                    'avg_progress' => round(array_sum(array_column($filtered_projects, 'progress')) / count($filtered_projects), 1),
                    'by_status' => [
                        'planning' => count(array_filter($projects_data, fn($p) => $p['status'] === 'Planning')),
                        'in_progress' => count(array_filter($projects_data, fn($p) => $p['status'] === 'In Progress')),
                        'review' => count(array_filter($projects_data, fn($p) => $p['status'] === 'Review')),
                        'completed' => count(array_filter($projects_data, fn($p) => $p['status'] === 'Completed'))
                    ]
                ]
            ]);
        }
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        $required_fields = ['name', 'client_id', 'description', 'due_date'];
        foreach ($required_fields as $field) {
            if (!isset($input[$field]) || empty($input[$field])) {
                http_response_code(400);
                echo json_encode(['error' => "Missing required field: $field"]);
                exit;
            }
        }
        
        $new_project = [
            'id' => count($projects_data) + 1,
            'name' => $input['name'],
            'client_id' => intval($input['client_id']),
            'client_name' => $input['client_name'] ?? 'Unknown Client',
            'description' => $input['description'],
            'status' => 'Planning',
            'progress' => 0,
            'start_date' => date('Y-m-d'),
            'due_date' => $input['due_date'],
            'budget' => floatval($input['budget'] ?? 0),
            'team_members' => $input['team_members'] ?? [],
            'tasks_total' => 0,
            'tasks_completed' => 0,
            'priority' => $input['priority'] ?? 'Medium',
            'created_at' => date('Y-m-d')
        ];
        
        echo json_encode(['message' => 'Project created successfully', 'data' => $new_project]);
        break;
        
    case 'PUT':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Project ID required']);
            exit;
        }
        
        $project_id = intval($_GET['id']);
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Find project to update
        $project_index = array_search($project_id, array_column($projects_data, 'id'));
        if ($project_index === false) {
            http_response_code(404);
            echo json_encode(['error' => 'Project not found']);
            exit;
        }
        
        // Update project fields
        $updatable_fields = ['name', 'description', 'status', 'progress', 'due_date', 'budget', 'team_members', 'priority'];
        foreach ($updatable_fields as $field) {
            if (isset($input[$field])) {
                $projects_data[$project_index][$field] = $input[$field];
            }
        }
        
        echo json_encode(['message' => 'Project updated successfully', 'data' => $projects_data[$project_index]]);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>
