@echo off
setlocal ENABLEEXTENSIONS

REM Serve the static site from the repository root on port 5500
set PORT=5500
cd /d "%~dp0"

rem Prefer Python HTTP server if available; otherwise fall back to npx http-server
where python >NUL 2>&1
if %ERRORLEVEL%==0 goto use_python

where npx >NUL 2>&1
if %ERRORLEVEL%==0 goto use_npx

echo Neither Python nor npx were found on PATH.
echo Options:
echo   - Install Python and re-run this script, OR
echo   - Install Node.js ^(with npx^) from https://nodejs.org and re-run this script, OR
echo   - Open index.html directly in your browser.
pause
goto end

:use_python
echo Starting Python HTTP server on http://localhost:%PORT% ...
python -m http.server %PORT%
goto end

:use_npx
echo Python not found. Using npx http-server on http://localhost:%PORT% ...
npx --yes http-server -p %PORT% -c-1 .

:end
