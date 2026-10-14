@echo off
title Petszoo Mobile Web Preview (Port 3000)
cd /d "%~dp0frontend"
echo ========================================================
echo   🛒 Starting Petszoo Flipkart Mobile Web Preview...
echo   Open in browser: http://localhost:3000
echo ========================================================
npm run dev
pause
