#!/bin/bash

# Q~Minor Deployment Script

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running linting..."
npm run lint

# Build the project
echo "🏗️ Building for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are in the 'dist' directory"
    echo "🌐 You can now deploy the contents of 'dist' to your web server"
    echo ""
    echo "To preview locally, run: npm run preview"
else
    echo "❌ Build failed!"
    exit 1
fi 