@echo off
title VITALORA - Push to GitHub
echo ========================================================
echo   Push VITALORA to GitHub
echo ========================================================
echo.
set PATH=C:\Users\thund\.gemini\antigravity\scratch\mingit\cmd;%PATH%
cd /d "%~dp0"

echo Repository status:
git status
echo.
set /p REPO_URL="Enter your GitHub repository URL (e.g. https://github.com/username/vitalora.git): "

if "%REPO_URL%"=="" (
    echo [ERROR] No repository URL provided.
    pause
    exit /b 1
)

echo Adding remote origin...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git branch -M main

echo Pushing to GitHub (main branch)...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   Successfully pushed to GitHub!
    echo ========================================================
) else (
    echo.
    echo [NOTE] If prompted for credentials, GitHub requires a Personal Access Token (PAT)
    echo as your password. You can create one at: https://github.com/settings/tokens
)

pause
