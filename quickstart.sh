#!/bin/bash
# Quick Start Script for Shreeji Construction Website

echo "🏗️ Shreeji Construction Website Setup"
echo "===================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node -v)"

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start development:"
echo "  1. Backend: cd backend && npm start  (runs on http://localhost:3001)"
echo "  2. Frontend: cd frontend && npm start  (runs on http://localhost:3000)"
echo ""
echo "To deploy:"
echo "  1. Push to GitHub"
echo "  2. Connect to Render.com (free)"
echo "  3. See DEPLOYMENT_GUIDE.md for full instructions"
