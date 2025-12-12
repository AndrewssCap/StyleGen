@echo off
echo ========================================
echo   Reiniciando StyleGen Application
echo ========================================
echo.
echo Cerrando procesos anteriores...

REM Cerrar procesos de Node.js que usen los puertos
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8888" ^| findstr "LISTENING"') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173" ^| findstr "LISTENING"') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5174" ^| findstr "LISTENING"') do taskkill /F /PID %%a 2>nul

timeout /t 2 /nobreak > nul

echo.
echo Iniciando servidores...
echo.

echo [1/2] Iniciando Backend API (puerto 8888)...
start "StyleGen API" cmd /k "npm run server"
timeout /t 3 /nobreak > nul

echo [2/2] Iniciando Frontend (puerto 5173)...
start "StyleGen Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   Aplicacion iniciada correctamente!
echo ========================================
echo.
echo Backend API: http://localhost:8888
echo Frontend:    Revisa la consola para ver el puerto
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul
