# Use .NET SDK for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy solution and project files separately to optimize caching
COPY ../*.sln .  
COPY *.csproj ./

# Restore dependencies (leverage Docker cache), with PublishReadyToRun enabled
RUN dotnet restore -p:PublishReadyToRun=true

# Copy everything else and build the app
COPY . . 
RUN dotnet publish -c Release -o /app --no-restore \
    --self-contained false \
    -p:PublishTrimmed=true \
    -r linux-x64  # Add the runtime identifier explicitly

# Use lightweight ASP.NET runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy built application from build stage
COPY --from=build /app ./

# Expose necessary port
EXPOSE 5269

# Set entrypoint
ENTRYPOINT ["dotnet", "API.dll"]
