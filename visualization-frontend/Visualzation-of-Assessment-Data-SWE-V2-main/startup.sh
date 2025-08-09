#!/bin/bash
# Unix/Linux/macOS startup script
# Note: For Windows, use start-services.bat or start-services.ps1 in the root directory

echo "Starting Backend API..."
cd ../../visualization-practice-api/visualization-practice-api-2c1d5a6c2c96d69c6b73051a447313cb1fe748b4
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &

echo "Starting Frontend..."
cd ../../visualization-frontend/Visualzation-of-Assessment-Data-SWE-V2-main
npm run dev