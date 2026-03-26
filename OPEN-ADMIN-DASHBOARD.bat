@echo off
setlocal

REM افتح لوحة التحكم الإدارية محلياً (ويندوز)
REM - يوقف أي عملية تستمع على المنفذ 3333 (إن وُجدت)
REM - يشغّل خادم التطوير
REM - يفتح رابط لوحة الإدارة في المتصفح

cd /d "%~dp0"

set "PORT=3333"
set "ADMIN_URL=http://127.0.0.1:%PORT%/financial-consulting/iif-fund-demo/index.html?iif_admin_portal=1&open_dashboard=1"

echo.
echo [IIF] Restart dev server on port %PORT% ...

REM حاول إيقاف العملية التي تستمع على PORT (قد تفشل إن لم توجد)
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$p = (Get-NetTCPConnection -LocalPort %PORT% -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty OwningProcess); if ($p) { Stop-Process -Id $p -Force -ErrorAction SilentlyContinue }" ^
  >nul 2>nul

REM شغّل الخادم في نافذة منفصلة
start "IIF Dev Server" cmd /k "set PORT=%PORT%&& npm start"

REM انتظر قليلاً ثم افتح اللوحة
timeout /t 2 >nul
start "" "%ADMIN_URL%"

echo.
echo [IIF] Opened: %ADMIN_URL%
echo.
endlocal
