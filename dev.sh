#!/bin/bash

# Kill any existing Vite dev server on port 4200
lsof -ti:4200 | xargs kill -9 2>/dev/null || true

# Wait a moment for processes to terminate
sleep 1

# Start the development server on port 4200
npm run dev -- --port 4200
