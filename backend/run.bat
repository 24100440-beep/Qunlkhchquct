@echo off
echo ============================================
echo Immigration Management System - Backend
echo ============================================
echo.
echo Starting Spring Boot application...
echo.

cd %~dp0
mvnw.cmd spring-boot:run

pause
