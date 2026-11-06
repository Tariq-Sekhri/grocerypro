@echo off
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0stop geo pro.ps1" %*
if errorlevel 1 pause
