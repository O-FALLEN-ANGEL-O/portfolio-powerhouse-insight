
# Portfolio Dashboard Backend API

A comprehensive PHP backend API for the Portfolio Dashboard application, providing endpoints for portfolio management, client relationship management, and project tracking.

## Features

- **Portfolio Management**: Track investments, performance, and asset allocation
- **Client Management**: Maintain client profiles and relationships
- **Project Management**: Track projects, tasks, and team collaboration
- **Financial Analytics**: Portfolio performance metrics and reporting
- **User Authentication**: Secure access control and user management
- **RESTful API**: Clean, standardized API endpoints
- **Database Integration**: MySQL/MariaDB database support

## Project Structure

```
backend/
├── api/
│   ├── clients/         # Client management endpoints
│   ├── projects/        # Project management endpoints
│   └── portfolio/       # Portfolio analytics endpoints
├── config/
│   └── database.php     # Database configuration and utilities
├── database/
│   └── schema.sql       # Database schema and setup
├── index.php           # Main API router
└── README.md           # This file
```

## API Endpoints

### Portfolio Management
- `GET /api/portfolio` - Get complete portfolio data
- `GET /api/portfolio/summary` - Get portfolio summary
- `GET /api/portfolio/performance` - Get performance data
- `GET /api/portfolio/allocation` - Get asset allocation
- `GET /api/portfolio/holdings` - Get current holdings
- `GET /api/portfolio/transactions` - Get transaction history
- `GET /api/portfolio/analytics` - Get advanced analytics

### Client Management
- `GET /api/clients` - List all clients
- `GET /api/clients?id={id}` - Get specific client
- `POST /api/clients` - Create new client
- `PUT /api/clients?id={id}` - Update client

### Project Management
- `GET /api/projects` - List all projects
- `GET /api/projects?id={id}` - Get specific project
- `GET /api/projects?status={status}` - Filter by status
- `POST /api/projects` - Create new project
- `PUT /api/projects?id={id}` - Update project

## Installation

### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or MariaDB 10.3+
- Web server (Apache/Nginx)

### Setup Steps

1. **Clone or copy the backend files** to your web server directory

2. **Configure database connection** in `config/database.php`:
   ```php
   private $host = 'your-database-host';
   private $db_name = 'portfolio_dashboard';
   private $username = 'your-username';
   private $password = 'your-password';
   ```

3. **Create the database** and run the schema:
   ```sql
   CREATE DATABASE portfolio_dashboard;
   USE portfolio_dashboard;
   SOURCE database/schema.sql;
   ```

4. **Configure web server** to point to the backend directory

5. **Test the API** by visiting:
   ```
   http://your-domain/api/
   ```

## Deployment Options

### Option 1: Traditional Web Hosting
- Upload files to shared hosting with PHP/MySQL support
- Services like Bluehost, SiteGround, or HostGator
- Configure database credentials in `config/database.php`

### Option 2: VPS/Cloud Hosting
- **DigitalOcean Droplet** with LAMP stack
- **AWS EC2** with Apache/Nginx + PHP + MySQL
- **Google Cloud Platform** Compute Engine
- **Linode** or **Vultr** VPS

### Option 3: Platform-as-a-Service
- **Heroku** with ClearDB MySQL addon
- **Platform.sh** with MySQL service
- **Railway** with MySQL database

### Option 4: Serverless Functions
- **Vercel** with Serverless PHP (experimental)
- **Netlify Functions** (would require Node.js rewrite)

## Frontend Integration

The React frontend can connect to this API by:

1. **Setting the API base URL** in your environment:
   ```javascript
   const API_BASE_URL = 'https://your-domain.com/api';
   ```

2. **Making HTTP requests** to the endpoints:
   ```javascript
   // Example: Fetch portfolio data
   const response = await fetch(`${API_BASE_URL}/portfolio`);
   const data = await response.json();
   ```

3. **Handling CORS** (already configured in the API)

## Security Considerations

- **Input Validation**: All inputs are sanitized and validated
- **SQL Injection Protection**: Using PDO prepared statements
- **XSS Protection**: HTML special characters are escaped
- **CORS Configuration**: Proper headers for cross-origin requests
- **Authentication**: JWT token-based authentication (implement as needed)
- **HTTPS**: Always use HTTPS in production

## Database Schema

The database includes tables for:
- **users**: User authentication and profiles
- **clients**: Client information and AUM
- **projects**: Project management and tracking
- **tasks**: Task management within projects
- **portfolio_holdings**: Investment holdings
- **transactions**: Transaction history
- **portfolio_snapshots**: Performance tracking
- **financial_goals**: Goal setting and monitoring
- **reports**: Generated reports
- **audit_log**: Change tracking

## API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "message": "Success",
  "data": { ... },
  "timestamp": "2024-06-07T10:30:00+00:00"
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [],
  "timestamp": "2024-06-07T10:30:00+00:00"
}
```

## Development

To extend the API:

1. **Add new endpoints** in the appropriate API directory
2. **Update the router** in `index.php` if needed
3. **Add database tables** to `schema.sql`
4. **Use the Response class** for consistent output
5. **Follow RESTful conventions** for URL structure

## Production Deployment

For production deployment:

1. **Disable debug mode** in `config/database.php`
2. **Set up proper error logging**
3. **Configure database backups**
4. **Implement rate limiting**
5. **Set up monitoring**
6. **Use environment variables** for sensitive configuration

## Support

For issues or questions about the backend API, please check:
- Database connection settings
- File permissions
- PHP error logs
- API endpoint URLs
- CORS configuration

This backend provides a solid foundation for the Portfolio Dashboard and can be extended with additional features as needed.
```

