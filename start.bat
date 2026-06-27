@echo off
REM AetherCloud Startup Script for Windows
REM This script starts both the backend and frontend servers

echo.
echo ======================================
echo.
echo 🚀 AetherCloud Startup (Windows)
echo.
echo ======================================
echo.

REM Check if we're in the right directory
if not exist package.json (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
echo.

REM Install root dependencies
npm list concurrently >nul 2>&1
if errorlevel 1 (
    echo Installing concurrently...
    call npm install >nul 2>&1
)

REM Install backend dependencies
if not exist Backend\.venv (
    if not exist Backend\venv (
        echo Setting up Python environment...
        cd Backend
        python -m venv venv
        call venv\Scripts\activate.bat
        pip install -r requirements.txt >nul 2>&1
        cd ..
    )
)

REM Install frontend dependencies
if not exist Frontend\node_modules (
    echo Installing frontend dependencies...
    cd Frontend
    call npm install >nul 2>&1
    cd ..
)

echo.
echo ✓ Dependencies ready!
echo.
echo ======================================
echo.
echo 🚀 Starting AetherCloud...
echo.
echo ======================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3001
echo.
echo Test Account:
echo   Username: testuser
echo   Password: testpass123
echo.
echo Press Ctrl+C to stop both servers
echo ======================================
echo.

REM Start both servers
call npm run dev
pause
