@echo off
chcp 65001 >nul
REM لوحة التحكم — دخول محلي مباشر (لا يعمل على الإنترنت). يشغّل npm start إن لم يكن الخادم يعمل.
set "ROOT=%~dp0"
cd /d "%ROOT%"

where node >nul 2>nul
if errorlevel 1 (
  echo يحتاج Node.js: https://nodejs.org
  pause
  exit /b 1
)

powershell -NoProfile -Command "$p = Get-NetTCPConnection -LocalPort 3333 -ErrorAction SilentlyContinue | Where-Object { $_.State -eq 'Listen' }; if (-not $p) { Start-Process -FilePath node -ArgumentList 'scripts/dev-server.js' -WorkingDirectory '%ROOT%' -WindowStyle Minimized; Start-Sleep -Seconds 2 }"
start "" "http://127.0.0.1:3333/?local_dashboard=1"
echo.
echo إن لم تُفتح اللوحة: انتظر ثانيتين ثم انسخ في المتصفح:
echo   http://127.0.0.1:3333/?local_dashboard=1
echo.
pause
