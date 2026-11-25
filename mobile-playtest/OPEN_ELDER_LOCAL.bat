@echo off
cd /d "%~dp0"
python experience/tools/serve-local.py
if errorlevel 1 pause
