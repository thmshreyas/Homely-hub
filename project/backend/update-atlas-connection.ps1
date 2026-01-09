# Script to update MongoDB Atlas connection string in .env file

Write-Host "========================================"
Write-Host "Update MongoDB Atlas Connection String"
Write-Host "========================================"
Write-Host ""
Write-Host "Your current MONGO_URI:" 
$current = Get-Content .env | Select-String "MONGO_URI"
Write-Host $current -ForegroundColor Yellow
Write-Host ""
Write-Host "For MongoDB Atlas, the connection string should look like:"
Write-Host "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/homelyhub?retryWrites=true&w=majority" -ForegroundColor Green
Write-Host ""
Write-Host "Steps to get your Atlas connection string:"
Write-Host "1. Go to https://cloud.mongodb.com"
Write-Host "2. Click your cluster -> Connect -> Connect your application"
Write-Host "3. Copy the connection string"
Write-Host ""
Write-Host "Enter your MongoDB Atlas connection string below:"
Write-Host "(Make sure it includes the database name: /homelyhub)"
$newConnectionString = Read-Host "Atlas Connection String"

if ($newConnectionString -match "mongodb\+srv://") {
    # Update the .env file
    $envContent = Get-Content .env
    $updatedContent = $envContent | ForEach-Object {
        if ($_ -match "^MONGO_URI=") {
            "MONGO_URI=$newConnectionString"
        } else {
            $_
        }
    }
    $updatedContent | Set-Content .env -Encoding UTF8
    
    Write-Host ""
    Write-Host "✅ .env file updated successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "New MONGO_URI:"
    Get-Content .env | Select-String "MONGO_URI"
    Write-Host ""
    Write-Host "Now restart your server with: npm start"
} else {
    Write-Host ""
    Write-Host "❌ Invalid connection string format!" -ForegroundColor Red
    Write-Host "Atlas connection strings should start with: mongodb+srv://"
    Write-Host ""
}

