@echo off
echo ========================================
echo    Iniciando StyleGen Application
echo ========================================
echo.
echo [1/2] Iniciando Backend API (puerto 8888)...
start "StyleGen API" cmd /k "npm run server"
timeout /t 3 /nobreak > nul
echo.
echo [2/2] Iniciando Frontend (puerto 5173)...
start "StyleGen Frontend" cmd /k "npm run dev"
echo.
echo ========================================
echo   Aplicacion iniciada correctamente!
echo ========================================
echo.
echo Backend API: http://localhost:8888
echo Frontend:    http://localhost:5173
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul
