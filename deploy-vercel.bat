@echo off
title VITALORA - Deploy to Vercel
echo ========================================================
echo   VITALORA Deployment to Vercel
echo ========================================================
echo.
echo Checking for Vercel CLI...
where vercel >nul 2>&1
if %errorlevel% equ 0 (
    echo Vercel CLI detected. Starting deployment...
    cd /d "%~dp0"
    vercel --prod
) else (
    where npx >nul 2>&1
    if %errorlevel% equ 0 (
        echo Running via npx vercel...
        cd /d "%~dp0"
        npx vercel --prod
    ) else (
        echo [INFO] Vercel CLI or Node.js is not yet installed in PATH.
        echo.
        echo You can deploy in 1 minute using either:
        echo 1. GITHUB INTEGRATION:
        echo    - Push this folder to your GitHub repo.
        echo    - Go to https://vercel.com/new and click "Import".
        echo    - Click "Deploy".
        echo.
        echo 2. VERCEL CLI:
        echo    - Install Node.js from https://nodejs.org
        echo    - Run: npm install -g vercel
        echo    - Run: vercel --prod in this directory.
        echo.
    )
)
pause
