# 🚀 AetherCloud - Quick Start Guide

## Fastest Way to Start (Recommended)

From the project root, simply run:

```bash
npm run dev
```

This automatically starts **both** the backend and frontend!

---

## Access Points

- **Frontend:** https://miniature-dollop-wvv756v6vjg4355wj-3001.app.github.dev
- **Backend API:** http://localhost:8000

---

## Login with Test Account

**Credentials:**
```
Username: testuser
Password: testpass123
```

---

## What You Can Do

✅ Upload files  
✅ Download files  
✅ Delete files  
✅ Browse all files with sizes  
✅ Customize settings  
✅ Change theme  
✅ Toggle notifications  

---

## Alternative Startup Methods

### Using Startup Script

**Linux/Mac:**
```bash
bash start.sh
```

**Windows:**
```bash
start.bat
```

### Run Services Separately

**Backend only:**
```bash
npm run dev:backend
```

**Frontend only:**
```bash
npm run dev:frontend
```

### Using Docker

```bash
docker-compose up --build
```

---

## Useful Commands

```bash
# See all available commands
npm run

# Install all dependencies
npm run install:all

# Build frontend for production
npm run build

# Stop Docker services
npm run docker:down
```

---

## Create Your Own Test Account

Visit: http://localhost:3001/register

Register with any credentials you prefer.

---

## API Examples

### Login
```bash
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

### List Files (requires token)
```bash
curl -X GET http://localhost:8000/files \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Troubleshooting

**Backend won't start?**
```bash
pkill -f uvicorn
npm run dev
```

**Port already in use?**
```bash
# Kill process using port 8000
lsof -ti:8000 | xargs kill -9

# Frontend will auto-try next port
```

**Database locked?**
```bash
rm Backend/aethercloud.db
npm run dev
```

---

## Next Steps

- Read [FEATURES.md](FEATURES.md) for detailed features
- See [INSTALLATION.md](INSTALLATION.md) for detailed setup
- Check [TEST_ACCOUNT.md](TEST_ACCOUNT.md) for account info
