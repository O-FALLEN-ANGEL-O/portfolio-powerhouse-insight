
<?php
// Portfolio Analytics API

$portfolio_data = [
    'summary' => [
        'total_value' => 1247350,
        'ytd_return' => 18.7,
        'monthly_change' => -0.8,
        'monthly_gain_loss' => 24780,
        'last_updated' => date('c')
    ],
    'performance' => [
        ['date' => '2024-01-01', 'value' => 950000],
        ['date' => '2024-02-01', 'value' => 1020000],
        ['date' => '2024-03-01', 'value' => 1100000],
        ['date' => '2024-04-01', 'value' => 1080000],
        ['date' => '2024-05-01', 'value' => 1180000],
        ['date' => '2024-06-01', 'value' => 1247350]
    ],
    'asset_allocation' => [
        ['category' => 'Stocks', 'value' => 748410, 'percentage' => 60],
        ['category' => 'Bonds', 'value' => 311838, 'percentage' => 25],
        ['category' => 'Real Estate', 'value' => 124735, 'percentage' => 10],
        ['category' => 'Cash', 'value' => 62368, 'percentage' => 5]
    ],
    'holdings' => [
        ['symbol' => 'AAPL', 'name' => 'Apple Inc.', 'shares' => 500, 'price' => 195.89, 'value' => 97945, 'change' => 2.3],
        ['symbol' => 'NVDA', 'name' => 'NVIDIA Corporation', 'shares' => 100, 'price' => 895.32, 'value' => 89532, 'change' => 5.7],
        ['symbol' => 'MSFT', 'name' => 'Microsoft Corporation', 'shares' => 200, 'price' => 425.12, 'value' => 85024, 'change' => 1.8],
        ['symbol' => 'GOOGL', 'name' => 'Alphabet Inc.', 'shares' => 150, 'price' => 178.33, 'value' => 26750, 'change' => -0.5],
        ['symbol' => 'TSLA', 'name' => 'Tesla Inc.', 'shares' => 75, 'price' => 248.55, 'value' => 18641, 'change' => -3.2]
    ],
    'recent_transactions' => [
        [
            'id' => 1,
            'type' => 'BUY',
            'symbol' => 'NVDA',
            'shares' => 50,
            'price' => 895.32,
            'value' => 44766,
            'date' => '2024-06-05T14:30:00Z',
            'status' => 'Completed'
        ],
        [
            'id' => 2,
            'type' => 'SELL',
            'symbol' => 'TSLA',
            'shares' => 25,
            'price' => 248.55,
            'value' => 6214,
            'date' => '2024-06-04T10:15:00Z',
            'status' => 'Completed'
        ],
        [
            'id' => 3,
            'type' => 'DIVIDEND',
            'symbol' => 'AAPL',
            'shares' => 500,
            'price' => 2.50,
            'value' => 1250,
            'date' => '2024-06-03T09:00:00Z',
            'status' => 'Completed'
        ]
    ]
];

$path_parts = explode('/', trim($_GET['path'] ?? '', '/'));
$endpoint = $path_parts[1] ?? '';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        switch ($endpoint) {
            case 'summary':
                echo json_encode($portfolio_data['summary']);
                break;
            case 'performance':
                $period = $_GET['period'] ?? '6m';
                // For now, return all data regardless of period
                echo json_encode($portfolio_data['performance']);
                break;
            case 'allocation':
                echo json_encode($portfolio_data['asset_allocation']);
                break;
            case 'holdings':
                $sort_by = $_GET['sort'] ?? 'value';
                $holdings = $portfolio_data['holdings'];
                
                // Sort holdings
                usort($holdings, function($a, $b) use ($sort_by) {
                    return $b[$sort_by] <=> $a[$sort_by];
                });
                
                echo json_encode($holdings);
                break;
            case 'transactions':
                $limit = intval($_GET['limit'] ?? 10);
                $transactions = array_slice($portfolio_data['recent_transactions'], 0, $limit);
                echo json_encode($transactions);
                break;
            case 'analytics':
                // Calculate portfolio analytics
                $total_value = $portfolio_data['summary']['total_value'];
                $performance = $portfolio_data['performance'];
                
                $analytics = [
                    'volatility' => 12.5, // Simulated volatility
                    'sharpe_ratio' => 1.45,
                    'max_drawdown' => -8.2,
                    'beta' => 1.05,
                    'alpha' => 3.2,
                    'diversification_score' => 85,
                    'risk_level' => 'Moderate',
                    'performance_vs_benchmark' => [
                        'portfolio_return' => 18.7,
                        'sp500_return' => 15.2,
                        'outperformance' => 3.5
                    ]
                ];
                
                echo json_encode($analytics);
                break;
            default:
                // Return full portfolio data
                echo json_encode($portfolio_data);
                break;
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>
