@echo off
title VITALORA - Physical Health & Fitness Tracking Web App
echo ========================================================
echo   Launching VITALORA Web Application
echo ========================================================
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
if %errorlevel% neq 0 (
    echo Starting via default browser directly...
    start "" "%~dp0index.html"
)
pause
