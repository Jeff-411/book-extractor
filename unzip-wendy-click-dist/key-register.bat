:: key-register.bat (v2 - production)
@echo off
:: SECURITY: Requires Administrator privileges to modify HKCR
NET FILE 1>NUL 2>NUL
if '%errorlevel%' NEQ '0' (
    powershell -Command "Start-Process cmd.exe -ArgumentList '/c %~dpnx0' -Verb RunAs"
    exit /B
)

:: Project directory of this script
SET ScriptDir=%~dp0
:: Remove trailing backslash if present
IF %ScriptDir:~-1%==\ SET ScriptDir=%ScriptDir:~0,-1%

echo.
echo Registering "EXTRACT BOOK" context menu handler...

:: CRITICAL: Node path must exist on the target machine
REG ADD "HKEY_CLASSES_ROOT\SystemFileAssociations\.zip\shell\Extract_Book" /ve /d "EXTRACT BOOK" /f
REG ADD "HKEY_CLASSES_ROOT\SystemFileAssociations\.zip\shell\Extract_Book" /v "Icon" /t REG_SZ /d "C:\Program Files\nodejs\node.exe,0" /f
REG ADD "HKEY_CLASSES_ROOT\SystemFileAssociations\.zip\shell\Extract_Book\command" /ve /t REG_SZ /d "\"C:\Program Files\nodejs\node.exe\" \"%ScriptDir%\unzip-wendy-bundle.mjs\" \"%%1\"" /f

IF %ERRORLEVEL% EQU 0 (
  echo Registration complete.
) ELSE (
  echo Registration failed. Error code: %ERRORLEVEL%
)
