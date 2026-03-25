@echo off
chcp 65001 >nul
set "ROOT=%~dp0"
cd /d "%ROOT%"

where node >nul 2>nul
if errorlevel 1 (
  echo يحتاج المشروع إلى Node.js: https://nodejs.org
  pause
  exit /b 1
)

echo [1/3] محرك SearXNG + Tor ^(Docker^)...
if exist "%ROOT%engines\searxng\docker-compose.yml" (
  pushd "%ROOT%engines\searxng"
  docker compose up -d
  if errorlevel 1 (
    echo.
    echo تنبيه: فشل docker compose — شغّل Docker Desktop ثم من engines\searxng نفّذ: docker compose up -d
    echo.
  )
  popd
) else (
  echo لم يُعثر على engines\searxng\docker-compose.yml
)

echo [2/3] خادم التطوير على المنفذ 3333...
where pnpm >nul 2>nul
if %errorlevel%==0 (
  start "IIF dev server" /D "%ROOT%" cmd /k pnpm start
) else (
  start "IIF dev server" /D "%ROOT%" cmd /k npm start
)

echo [3/3] انتظار قصير ثم فتح المنصة الحكومية...
timeout /t 4 /nobreak >nul
start "" "http://127.0.0.1:3333/financial-consulting/government-search/SIMPLE-GOVERNMENT-PLATFORM.html"

echo.
echo جاهز:
echo   المنصة الحكومية — أعلاه في المتصفح
echo   الصندوق / الرئيسية — http://127.0.0.1:3333/
echo   SearXNG — http://127.0.0.1:18080/
echo   تحقق من المحرك — من هذا المجلد: npm run verify:searx
echo.
pause
