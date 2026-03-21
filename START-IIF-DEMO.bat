@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo يحتاج المشروع إلى Node.js مثبت: https://nodejs.org
  pause
  exit /b 1
)
echo تشغيل الخادم في نافذة منفصلة، ثم فتح المتصفح...
where pnpm >nul 2>nul
if %errorlevel%==0 (
  start "IIF dev server" cmd /k "pnpm start"
) else (
  start "IIF dev server" cmd /k "npm start"
)
timeout /t 3 /nobreak >nul
start "" "http://localhost:3333/"
