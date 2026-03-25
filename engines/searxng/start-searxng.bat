@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo تشغيل Tor + SearXNG (Docker)...
docker compose up -d
if errorlevel 1 (
  echo فشل التشغيل. تأكد أن Docker Desktop يعمل.
  pause
  exit /b 1
)
echo.
echo الواجهة: http://127.0.0.1:18080
echo مع المنصة: من جذر المشروع npm start ثم افتح المنصة على 127.0.0.1:3333
start "" "http://127.0.0.1:18080/"
pause
