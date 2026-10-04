@echo off
title VITALORA - Push to GitHub
echo ========================================================
echo   Pushing VITALORA to GitHub
echo   Repository: https://github.com/muhammedshafi-web/vitalora.git
echo ========================================================
echo.
set PATH=C:\Users\thund\.gemini\antigravity\scratch\mingit\cmd;%PATH%
cd /d "%~dp0"

git remote remove origin >nul 2>&1
git remote add origin https://github.com/muhammedshafi-web/vitalora.git
git branch -M main

echo Executing: git push -u origin main...
echo.
echo [NOTE] If GitHub asks for a password, enter your Personal Access Token (PAT).
echo If you don't have one, generate one at: https://github.com/settings/tokens (select 'repo' scope).
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   SUCCESS! Pushed to https://github.com/muhammedshafi-web/vitalora
    echo ========================================================
) else (
    echo.
    echo [TIP] To push with a token in one click, run:
    echo git push https://YOUR_TOKEN@github.com/muhammedshafi-web/vitalora.git main
)

pause
