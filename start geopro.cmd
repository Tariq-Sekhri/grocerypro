@echo off
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0start geopro.ps1" %*
if errorlevel 1 if not defined GROCERYPRO_NO_PAUSE pause
