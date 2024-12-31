# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy solution file and csproj files
COPY ../*.sln .  
COPY *.csproj ./

# Restore dependencies
RUN dotnet restore

# Copy everything else and build the app
COPY . .
RUN dotnet publish -c release -o /app --no-restore

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 5269
WORKDIR /app
COPY --from=build /app ./
COPY .env .env
ENTRYPOINT ["dotnet", "API.dll"]
