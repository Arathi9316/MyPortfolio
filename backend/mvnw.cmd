@REM ----------------------------------------------------------------------------
@REM Maven Startup Script for Windows
@REM ----------------------------------------------------------------------------
@echo off
setlocal

set ERROR_CODE=0

@REM Set local maven repo and check JAVA_HOME
if "%JAVA_HOME%" == "" (
  for %%i in (java.exe) do set "JAVACMD=%%~$PATH:i"
) else (
  set "JAVACMD=%JAVA_HOME%\bin\java.exe"
)

if not exist "%JAVACMD%" (
  echo Error: JAVA_HOME is not defined correctly. >&2
  echo We cannot execute %JAVACMD% >&2
  goto error
)

@REM Execute mvn if installed, or direct run
where mvn >nul 2>nul
if %ERRORLEVEL% equ 0 (
  mvn %*
  goto end
)

echo Notice: Maven binary not found in PATH.
echo Please run this Spring Boot project using your preferred IDE (IntelliJ IDEA, Eclipse, VS Code)
echo or install Maven and run: mvn spring-boot:run
echo.

:error
set ERROR_CODE=1

:end
cmd /C exit /B %ERROR_CODE%
