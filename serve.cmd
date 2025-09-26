@echo off@echo off@echo off

REM Serve the static site from the repository root on port 5500

set PORT=5500REM Serve the static site from the repository root on port 5500setlocal ENABLEEXTENSIONS

python -m http.server %PORT%

set PORT=5500cd /d "%~dp0"

python -m http.server %PORT%

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
echo Starting Python HTTP server on http://localhost:5500 ...
python -m http.server 5500
goto end

:use_npx
echo Python not found. Using npx http-server on http://localhost:5500 ...
npx --yes http-server -p 5500 -c-1 .

:end
