# Installation Guide

## Prerequisites

- **Python 3.11+** (for backend)
- **Node.js 18+** (for frontend)
- **npm** (comes with Node.js)

## Quick Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/animeowner484/AetherCloud.git
cd AetherCloud
```

### Step 2: Start Both Services

From the project root, run:

```bash
npm run dev
```

This will:
- Install dependencies (if needed)
- Start the backend server on port 8000
- Start the frontend dev server on port 3001

**That's it!** Both services are now running.

---

## Alternative Installation Methods

### Method 1: Using Startup Script

**Linux/Mac:**
```bash
bash start.sh
```

**Windows:**
```bash
start.bat
```

### Method 2: Manual Setup

**Step 1: Backend Setup**
```bash
cd Backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate      # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Step 2: Frontend Setup (in a new terminal)**
```bash
cd Frontend

# Install dependencies
npm install

# Run frontend dev server
npm run dev
```

### Method 3: Docker Compose

```bash
docker-compose up --build
```

---

## Accessing the Application

Once both services are running:

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:8000

### Test Account

Login with these credentials:
```
Username: testuser
Password: testpass123
```

---

## Available Commands

From the project root:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both backend and frontend |
| `npm run dev:backend` | Start only backend |
| `npm run dev:frontend` | Start only frontend |
| `npm run build` | Build frontend for production |
| `npm run install:all` | Install all dependencies |
| `npm run docker:up` | Start with Docker Compose |
| `npm run docker:down` | Stop Docker Compose |

---

## Troubleshooting

### Backend won't start

**Error:** `Address already in use`
- Another process is using port 8000
- Kill the process: `pkill -f uvicorn`

**Error:** `ModuleNotFoundError: No module named 'fastapi'`
- Ensure Python dependencies are installed
- Run: `cd Backend && pip install -r requirements.txt`

### Frontend won't start

**Error:** `npm: command not found`
- Install Node.js from https://nodejs.org/

**Error:** `Port 3001 is already in use`
- The dev server will automatically try the next available port
- Or kill the process: `lsof -ti:3001 | xargs kill -9`

### Database issues

**Error:** `sqlite3.OperationalError: database is locked`
- Stop all running instances
- Delete `Backend/aethercloud.db`
- Restart the backend

### API connection errors

If the frontend can't connect to the backend:
- Ensure both services are running
- Check that backend is on `http://localhost:8000`
- Clear browser cache (Ctrl+Shift+Delete)

---

## Production Deployment

### Using Docker Compose

```bash
docker-compose up --build -d
```

### Environment Variables

Create a `.env` file in the Backend directory:

```
SECRET_KEY=your-production-secret-key
DATABASE_URL=postgresql://user:password@db:5432/aethercloud
```

### Recommended Security Settings

1. Change the `SECRET_KEY` in `Backend/auth.py`
2. Use a production-grade database (PostgreSQL instead of SQLite)
3. Enable HTTPS
4. Restrict CORS origins in `Backend/main.py`

---

## Support

For issues or questions:
1. Check [FEATURES.md](FEATURES.md) for feature documentation
2. See [TEST_ACCOUNT.md](TEST_ACCOUNT.md) for test account info
3. Review [QUICKSTART.md](QUICKSTART.md) for quick reference
