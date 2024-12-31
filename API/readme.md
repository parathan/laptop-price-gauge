## API  
# Run API  
enter `dotnet run` in terminal to run the api.  


# Run through Docker  
Build Image: docker build -t lpg_api .  
Build and Run Container: docker run -d -p 5269:5269 --env-file .env --name lpg_container lpg_api  
