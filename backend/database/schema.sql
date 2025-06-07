
-- Portfolio Dashboard Database Schema

-- Users table for authentication
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role ENUM('admin', 'manager', 'analyst') DEFAULT 'analyst',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Clients table
CREATE TABLE clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    industry VARCHAR(100),
    aum DECIMAL(15,2) DEFAULT 0,
    status ENUM('Active', 'Inactive', 'Review', 'Prospect') DEFAULT 'Active',
    risk_tolerance ENUM('Conservative', 'Moderate', 'Aggressive') DEFAULT 'Moderate',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Projects table
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    client_id INT NOT NULL,
    status ENUM('Planning', 'In Progress', 'Review', 'Completed', 'On Hold') DEFAULT 'Planning',
    priority ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Medium',
    progress INT DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    budget DECIMAL(12,2),
    start_date DATE,
    due_date DATE,
    completed_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    assigned_to INT,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Project team members (many-to-many relationship)
CREATE TABLE project_team_members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    role VARCHAR(100),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_project_user (project_id, user_id)
);

-- Tasks table
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('Todo', 'In Progress', 'Review', 'Completed') DEFAULT 'Todo',
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    assigned_to INT,
    due_date DATE,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Portfolio holdings table
CREATE TABLE portfolio_holdings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    asset_name VARCHAR(255),
    asset_type ENUM('Stock', 'Bond', 'ETF', 'Mutual Fund', 'Cash', 'Real Estate', 'Commodity') DEFAULT 'Stock',
    shares DECIMAL(15,4) DEFAULT 0,
    average_cost DECIMAL(10,4) DEFAULT 0,
    current_price DECIMAL(10,4) DEFAULT 0,
    market_value DECIMAL(15,2) GENERATED ALWAYS AS (shares * current_price) STORED,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    UNIQUE KEY unique_client_symbol (client_id, symbol)
);

-- Transactions table
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    transaction_type ENUM('BUY', 'SELL', 'DIVIDEND', 'INTEREST', 'FEE') NOT NULL,
    shares DECIMAL(15,4),
    price DECIMAL(10,4),
    amount DECIMAL(15,2) NOT NULL,
    fees DECIMAL(10,2) DEFAULT 0,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    created_by INT,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Portfolio performance snapshots
CREATE TABLE portfolio_snapshots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    snapshot_date DATE NOT NULL,
    total_value DECIMAL(15,2) NOT NULL,
    cash_value DECIMAL(15,2) DEFAULT 0,
    equity_value DECIMAL(15,2) DEFAULT 0,
    bond_value DECIMAL(15,2) DEFAULT 0,
    other_value DECIMAL(15,2) DEFAULT 0,
    daily_return DECIMAL(8,4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    UNIQUE KEY unique_client_date (client_id, snapshot_date)
);

-- Goals and targets
CREATE TABLE financial_goals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    goal_name VARCHAR(255) NOT NULL,
    goal_type ENUM('Retirement', 'Education', 'House', 'Emergency Fund', 'Investment', 'Other') DEFAULT 'Investment',
    target_amount DECIMAL(15,2) NOT NULL,
    current_amount DECIMAL(15,2) DEFAULT 0,
    target_date DATE,
    monthly_contribution DECIMAL(10,2),
    status ENUM('Active', 'Achieved', 'Paused', 'Cancelled') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- Reports table
CREATE TABLE reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    report_name VARCHAR(255) NOT NULL,
    report_type ENUM('Portfolio Performance', 'Project Status', 'Client Summary', 'Risk Analysis', 'Custom') DEFAULT 'Custom',
    client_id INT,
    project_id INT,
    generated_by INT NOT NULL,
    report_data JSON,
    file_path VARCHAR(500),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
    FOREIGN KEY (generated_by) REFERENCES users(id)
);

-- System settings and configurations
CREATE TABLE system_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Audit log for tracking changes
CREATE TABLE audit_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    table_name VARCHAR(100) NOT NULL,
    record_id INT NOT NULL,
    action ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    old_values JSON,
    new_values JSON,
    changed_by INT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (changed_by) REFERENCES users(id)
);

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('app_name', 'Portfolio Pro', 'Application name'),
('default_currency', 'USD', 'Default currency for calculations'),
('risk_free_rate', '4.5', 'Risk-free rate for calculations (%)'),
('market_hours_start', '09:30', 'Market opening time'),
('market_hours_end', '16:00', 'Market closing time'),
('backup_frequency', 'daily', 'Automatic backup frequency'),
('session_timeout', '3600', 'Session timeout in seconds');

-- Create indexes for better performance
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to);
CREATE INDEX idx_holdings_client ON portfolio_holdings(client_id);
CREATE INDEX idx_transactions_client ON transactions(client_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_snapshots_client_date ON portfolio_snapshots(client_id, snapshot_date);
CREATE INDEX idx_goals_client ON financial_goals(client_id);
CREATE INDEX idx_reports_client ON reports(client_id);
CREATE INDEX idx_audit_table_record ON audit_log(table_name, record_id);
