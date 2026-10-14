@echo off
title Petszoo Backend Server (Port 5000)
cd /d "%~dp0backend"
echo ========================================================
echo   🐾 Starting Petszoo Backend REST API Server...
echo   URL: http://localhost:5000
echo ========================================================
node server.js
pause
