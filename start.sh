#!/bin/bash

# AetherCloud Startup Script
# This script starts both the backend and frontend servers

echo "======================================"
echo "🚀 AetherCloud Startup"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "📦 Installing dependencies..."
echo ""

# Install root dependencies
if ! npm list concurrently > /dev/null 2>&1; then
    echo "Installing concurrently..."
    npm install > /dev/null 2>&1
fi

# Install backend dependencies
if [ ! -d "Backend/.venv" ] && [ ! -d "Backend/venv" ]; then
    echo "Setting up Python environment..."
    cd Backend
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt > /dev/null 2>&1
    cd ..
fi

# Install frontend dependencies
if [ ! -d "Frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd Frontend
    npm install > /dev/null 2>&1
    cd ..
fi

echo ""
echo "✓ Dependencies ready!"
echo ""
echo "======================================"
echo "🚀 Starting AetherCloud..."
echo "======================================"
echo ""
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:3001"
echo ""
echo "Test Account:"
echo "  Username: testuser"
echo "  Password: testpass123"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "======================================"
echo ""

# Start both servers
npm run dev
