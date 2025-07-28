# IT Center Docker Setup Documentation

This document provides a comprehensive overview of the Docker configuration for the IT Center project, including backend Dockerfile setup and production deployment with Docker Compose.

## Backend Dockerfile Configuration

The backend service is containerized using a Node.js 20 base image with specific optimizations for a NestJS application.

### Dockerfile Overview

```dockerfile
# Base image
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Create uploads directory if it doesn't exist
RUN mkdir -p uploads/contents uploads/courses uploads/reservations uploads/users

# Ensure the uploads directory is writable
RUN chmod -R 777 uploads

# Additional directory creation for production stability
RUN mkdir -p /app/uploads/contents /app/uploads/courses /app/uploads/reservations /app/uploads/users
RUN chmod -R 777 /app/uploads

# Set environment variables
ENV NODE_ENV=production

EXPOSE 5100

CMD ["node", "dist/src/main"]
```

### Key Features of the Backend Dockerfile

1. **Base Image**: Uses Node.js 20 for optimal performance and LTS support
2. **Working Directory**: Set to `/app` for consistent file organization
3. **Dependency Installation**: Copies `package.json` and `package-lock.json` first for better Docker layer caching
4. **Build Process**: Runs `npm run build` which executes NestJS build command (`nest build`)
5. **File Upload Support**:
   - Creates dedicated upload directories for different content types
   - Sets proper permissions (777) for file upload functionality
   - Ensures directories exist both in `uploads/` and `/app/uploads/` for production stability
6. **Environment**: Sets `NODE_ENV=production` for optimized runtime
7. **Port Exposure**: Exposes port 5100 (configurable via environment variables)
8. **Startup Command**: Runs the compiled application from `dist/src/main`

### Upload Directory Structure

The Dockerfile creates the following upload directories:

- `uploads/contents/` - For content-related file uploads
- `uploads/courses/` - For course material uploads
- `uploads/reservations/` - For reservation-related documents
- `uploads/users/` - For user profile images and documents

## Production Docker Compose Setup

The production environment uses Docker Compose to orchestrate multiple services including frontend, backend, database, and administration tools.

### Docker Compose Configuration

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend # adjust path as needed
    ports:
      - '5000:5000' # Host port 5000 → container port 5000
    environment:
      - NODE_ENV=production
    restart: always

  backend:
    build:
      context: ./backend # adjust path as needed
    ports:
      - '5100:5100' # Host port 5100 → container port 5100
    env_file:
      - ./backend/.env
    depends_on:
      - db
    volumes:
      - ./backend/uploads:/app/uploads
    restart: always

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: [REDACTED]
      MYSQL_DATABASE: it_center_db
      MYSQL_USER: itcweb
      MYSQL_PASSWORD: [REDACTED]
    ports:
      - '3307:3306'
    volumes:
      - mysqldata:/var/lib/mysql
    restart: always

  adminer:
    image: adminer
    restart: always
    ports:
      - '8080:8080'

volumes:
  mysqldata:
```

### Service Breakdown

#### Frontend Service

- **Build Context**: `./frontend` directory
- **Port Mapping**: Host port 5000 → Container port 5000
- **Environment**: Production mode
- **Restart Policy**: Always restart on failure

#### Backend Service

- **Build Context**: `./backend` directory (where the Dockerfile is located)
- **Port Mapping**: Host port 5100 → Container port 5100
- **Environment**: Loads environment variables from `./backend/.env`
- **Dependencies**: Waits for database service to be ready
- **Volume Mounting**: Maps host `./backend/uploads` to container `/app/uploads` for persistent file storage
- **Restart Policy**: Always restart on failure

#### Database Service (MySQL 8)

- **Image**: Official MySQL 8 image
- **Database Configuration**:
  - Database name: `it_center_db`
  - User: `itcweb`
  - Passwords are configured via environment variables
- **Port Mapping**: Host port 3307 → Container port 3306 (avoids conflicts with local MySQL)
- **Volume**: Persistent data storage with named volume `mysqldata`
- **Restart Policy**: Always restart on failure

#### Adminer Service

- **Image**: Official Adminer image for database administration
- **Port Mapping**: Host port 8080 → Container port 8080
- **Purpose**: Web-based database management interface
- **Access**: Available at `http://localhost:8080`

### Volume Configuration

- **mysqldata**: Named volume for persistent MySQL data storage, ensuring data survives container restarts

## Key Integration Points for Frontend

### API Endpoint Configuration

- **Backend URL**: `http://localhost:5100` (development) or your production domain
- **API Base Path**: All API endpoints are served from the root path

### File Upload Handling

- **Upload Endpoint**: The backend handles file uploads through various endpoints
- **Static File Access**: Uploaded files are served at `/uploads/` path
- **File Categories**:
  - Content files: `/uploads/contents/`
  - Course materials: `/uploads/courses/`
  - Reservation documents: `/uploads/reservations/`
  - User files: `/uploads/users/`

### CORS Configuration

The backend is configured to accept requests from the frontend origin as specified in the `CORS_ORIGIN` environment variable.

## Deployment Instructions

### Prerequisites

- Docker and Docker Compose installed on the server
- Environment files configured (`.env` for backend)
- Frontend and backend code available in respective directories

### Deployment Steps

1. **Clone/Upload Code**:

   ```bash
   # Ensure your directory structure looks like:
   # project-root/
   # ├── frontend/
   # ├── backend/
   # └── docker-compose.yml
   ```

2. **Configure Environment**:

   - Set up `./backend/.env` with database credentials and other configurations
   - Ensure frontend build configuration points to correct backend URL

3. **Deploy Services**:

   ```bash
   docker-compose up -d
   ```

4. **Verify Deployment**:
   - Frontend: `http://localhost:5000`
   - Backend API: `http://localhost:5100`
   - Database Admin: `http://localhost:8080`

### Service URLs in Production

- **Frontend**: Port 5000
- **Backend API**: Port 5100
- **Database**: Port 3307 (MySQL)
- **Adminer**: Port 8080

## Troubleshooting

### Common Issues

1. **Upload Directory Permissions**: Ensure the uploads directory has proper write permissions
2. **Database Connection**: Verify database service is running and credentials are correct
3. **Port Conflicts**: Check if ports 5000, 5100, 3307, or 8080 are already in use
4. **Environment Variables**: Ensure all required environment variables are set in `.env` file

### Logs and Debugging

```bash
# View service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db

# Follow logs in real-time
docker-compose logs -f backend
```

This Docker setup provides a complete, production-ready environment for the IT Center application with proper service isolation, persistent data storage, and automated restart policies.
