# AetherCloud - Cloud File Management System

A modern, secure file management system with user authentication, file organization, and customizable settings built with FastAPI (Backend) and React (Frontend).

## 🚀 Quick Start

### Test Account (Pre-built)

**A test account is automatically created on first startup:**

```
Username: testuser
Password: testpass123
```

Simply use these credentials to login and start exploring!

## 🎯 Fastest Way to Start

### Option 1: Unified Startup (Recommended)

From the project root, run:

```bash
npm run dev
```

This starts **both** the backend and frontend automatically!

- Backend: http://localhost:8000
- Frontend: http://localhost:3001

### Option 2: Using Startup Script

**On Linux/Mac:**
```bash
bash start.sh
```

**On Windows:**
```bash
start.bat
```

### Option 3: Run Servers Separately

**Terminal 1 - Backend:**
```bash
cd Backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm install
npm run dev
```

## 🐳 Docker Setup

```bash
docker-compose up --build
```

Access at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## Features

- ✅ **User Authentication** - Secure JWT-based authentication
- ✅ **File Management** - Upload, download, delete, and organize files
- ✅ **File Browser** - Browse all your files with size information
- ✅ **Settings** - Customize theme, notifications, and auto-delete preferences
- ✅ **Security** - Password hashing with bcrypt, token-based authorization
- ✅ **Docker Support** - Easy deployment with Docker Compose
- ✅ **User Isolation** - Files are isolated per user account

## Technology Stack

- **Backend**: FastAPI, SQLAlchemy, SQLite, JWT, bcrypt
- **Frontend**: React 18, TypeScript, React Router, Vite
- **Deployment**: Docker, Docker Compose

## API Endpoints

- `POST /register` - Register new account
- `POST /login` - Login
- `POST /upload` - Upload file (auth required)
- `GET /files` - List files (auth required)
- `GET /download/{filename}` - Download file (auth required)
- `DELETE /files/{filename}` - Delete file (auth required)
- `GET /settings` - Get settings (auth required)
- `PUT /settings` - Update settings (auth required)

## Available npm Scripts

From the project root:

```bash
npm run dev              # Start both backend and frontend
npm run dev:backend      # Start only backend
npm run dev:frontend     # Start only frontend
npm run build            # Build frontend for production
npm run install:all      # Install all dependencies
npm run docker:up        # Start with Docker Compose
npm run docker:down      # Stop Docker Compose
```

## Documentation

- See [FEATURES.md](FEATURES.md) for detailed feature documentation
- See [TEST_ACCOUNT.md](TEST_ACCOUNT.md) for test account information
- See [QUICKSTART.md](QUICKSTART.md) for quick reference

## Project Structure

```
AetherCloud/
├── Backend/              # FastAPI backend
│   ├── main.py
│   ├── auth.py
│   ├── models.py
│   ├── database.py
│   └── requirements.txt
├── Frontend/             # React frontend
│   ├── src/components/
│   ├── src/styles/
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
├── start.sh              # Startup script (Linux/Mac)
├── start.bat             # Startup script (Windows)
└── package.json          # Root npm scripts
```

## License

See LICENSE file for details.
