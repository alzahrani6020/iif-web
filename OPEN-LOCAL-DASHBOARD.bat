@echo off
chcp 65001 >nul
REM يفتح صفحة دخول اللوحة فقط (شريط علوي + iframe) — ليس الصفحة الرئيسية كاملة في نفس النافذة.
set "ROOT=%~dp0"
cd /d "%ROOT%"

where node >nul 2>nul
if errorlevel 1 (
  echo يحتاج Node.js: https://nodejs.org
  pause
  exit /b 1
)

powershell -NoProfile -Command "$p = Get-NetTCPConnection -LocalPort 3333 -ErrorAction SilentlyContinue | Where-Object { $_.State -eq 'Listen' }; if (-not $p) { Start-Process -FilePath node -ArgumentList 'scripts/dev-server.js' -WorkingDirectory '%ROOT%' -WindowStyle Minimized; Start-Sleep -Seconds 2 }"
start "" "http://127.0.0.1:3333/dashboard-entry"
echo.
echo الرابط: http://127.0.0.1:3333/dashboard-entry
echo.
pause
