@echo off

:: Replace these paths with the full paths to your projects
set ASPNET_API_PATH="C:\Users\Parathan\Downloads\laptop-price-gauge\API"
set NEXTJS_CLIENT_PATH="C:\Users\Parathan\Downloads\laptop-price-gauge\lpg-webapp"

:: Open a new command window for the ASP.NET API
start cmd /k "cd /d %ASPNET_API_PATH% && dotnet run"

:: Open a new command window for the Next.js Client
start cmd /k "cd /d %NEXTJS_CLIENT_PATH% && npm run dev"

pause