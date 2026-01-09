# Starting the HomelyHub Backend Server

## Prerequisites

### Option 1: MongoDB Local Installation
1. **Install MongoDB** (if not already installed):
   - Download from: https://www.mongodb.com/try/download/community
   - Or use Chocolatey: `choco install mongodb`

2. **Start MongoDB Service** (Windows):
   ```powershell
   # Check if MongoDB service exists
   Get-Service MongoDB
   
   # If service exists, start it
   Start-Service MongoDB
   
   # If service doesn't exist, start MongoDB manually
   mongod --dbpath "C:\data\db"
   ```

### Option 2: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get your connection string
4. Update `.env` file:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/homelyhub
   ```

## Starting the Server

1. **Navigate to backend directory**:
   ```powershell
   cd backend
   ```

2. **Check .env file exists**:
   ```powershell
   Test-Path .env
   ```
   
   If not, create it with:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/homelyhub
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_123456789
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   ORIGIN_ACCESS_URL=http://localhost:5173
   ```

3. **Install dependencies** (if not done):
   ```powershell
   npm install
   ```

4. **Start the server**:
   ```powershell
   npm start
   ```

   Or for development with auto-reload:
   ```powershell
   npm run dev
   ```

## Troubleshooting

### MongoDB Connection Failed
**Error**: `ECONNREFUSED` or `connect ECONNREFUSED`

**Solutions**:
1. **Check if MongoDB is running**:
   ```powershell
   Get-Service MongoDB
   ```

2. **Start MongoDB service**:
   ```powershell
   Start-Service MongoDB
   ```

3. **If service doesn't exist, start MongoDB manually**:
   - Create data directory: `mkdir C:\data\db`
   - Run: `mongod --dbpath "C:\data\db"`

4. **Or use MongoDB Atlas** (cloud):
   - Update MONGO_URI in `.env` to your Atlas connection string

### Port Already in Use
If port 5000 is already in use:
1. Change PORT in `.env` file
2. Or kill the process using port 5000:
   ```powershell
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

## Success Indicators

When server starts successfully, you should see:
```
✅ MongoDB connected successfully!
Database: homelyhub
App running on port: 5000
```

## Testing the Server

Once running, test with:
```powershell
curl http://localhost:5000/api/v1/rent/listing
```

Or visit in browser: `http://localhost:5000`

