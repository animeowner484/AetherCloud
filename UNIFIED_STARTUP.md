# 🔗 Unified Backend & Frontend Startup

## What's New

The AetherCloud project now has **integrated startup** - you can start both the backend and frontend with a **single command**!

---

## How to Use

### Option 1: NPM Command (Recommended)

From the project root:

```bash
npm run dev
```

This runs both services concurrently:
- **Backend:** http://localhost:8000
- **Frontend:** http://localhost:3001

### Option 2: Startup Scripts

**Linux/Mac:**
```bash
bash start.sh
```

**Windows:**
```bash
start.bat
```

---

## What's Included

### Root `package.json`
Added npm scripts for convenient startup:

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start **both** backend & frontend |
| `npm run dev:backend` | Start only backend |
| `npm run dev:frontend` | Start only frontend |
| `npm run build` | Build frontend for production |
| `npm run install:all` | Install all dependencies |
| `npm run docker:up` | Start with Docker Compose |
| `npm run docker:down` | Stop Docker Compose |

### Startup Scripts
- `start.sh` - For Linux/Mac users
- `start.bat` - For Windows users

These scripts:
- Check if dependencies are installed
- Auto-install missing dependencies
- Set up Python virtual environment
- Display connection info and test credentials
- Start both services

### Documentation
- `INSTALLATION.md` - Complete installation guide
- `QUICKSTART.md` - Quick reference guide
- Updated `README.md` - New startup instructions

---

## Technology Used

- **[Concurrently](https://www.npmjs.com/package/concurrently)** - Runs multiple npm scripts concurrently
- Shell scripts for cross-platform startup

---

## Project Structure

```
AetherCloud/
├── Backend/
│   ├── main.py
│   ├── auth.py
│   ├── models.py
│   ├── database.py
│   └── requirements.txt
├── Frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── package.json              ← Root npm scripts
├── start.sh                  ← Linux/Mac startup
├── start.bat                 ← Windows startup
├── docker-compose.yml
└── README.md
```

---

## Test It

1. **From project root, run:**
   ```bash
   npm run dev
   ```

2. **Open browser and visit:**
   - Frontend: http://localhost:3001
   - Backend: http://localhost:8000

3. **Login with test account:**
   ```
   Username: testuser
   Password: testpass123
   ```

---

## Stopping Services

Press `Ctrl+C` in the terminal to stop both services.

---

## Individual Service Access

If you need to run services separately:

```bash
# Terminal 1
npm run dev:backend

# Terminal 2
npm run dev:frontend
```

---

## Benefits

✅ **Single command** to start everything  
✅ **No manual setup** required  
✅ **Cross-platform** (Windows, Mac, Linux)  
✅ **Automatic dependency** installation  
✅ **Concurrent execution** - both services run together  
✅ **Easy to understand** - simple npm commands  

---

## Troubleshooting

### "command not found: npm"
Install Node.js from https://nodejs.org/

### "Address already in use"
```bash
# Kill existing processes
pkill -f "uvicorn\|node"

# Try again
npm run dev
```

### Port errors
Frontend will auto-detect and use the next available port (3001, 3002, 3003...)

### "No module named uvicorn"
```bash
npm run install:all
```

---

## Next Steps

1. Run `npm run dev` to start both services
2. Visit http://localhost:3001
3. Login with test account (testuser/testpass123)
4. Start uploading files!

For more details, see [QUICKSTART.md](QUICKSTART.md), [INSTALLATION.md](INSTALLATION.md), or [README.md](README.md)
