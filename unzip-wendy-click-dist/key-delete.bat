REM key-delete.bat
@echo off
REM Elevate to run with Admin rights (PowerShell)
NET FILE 1>NUL 2>NUL
if '%errorlevel%' NEQ '0' (
    powershell -Command "Start-Process cmd.exe -ArgumentList '/c %~dpnx0' -Verb RunAs"
    exit /B
)

REM Remove registry key
echo Removing "Extract Book" registry key...
REG DELETE "HKEY_CLASSES_ROOT\SystemFileAssociations\.zip\shell\Extract_Book" /f

REM Log success/error messages
if %ERRORLEVEL% EQU 0 (
  echo Registry key successfully removed.
) else (
  echo Failed to remove registry key. Error code: %ERRORLEVEL%
  echo Make sure you're running this script as Administrator.
)
pause
