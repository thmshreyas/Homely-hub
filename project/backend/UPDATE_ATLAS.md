# Update MongoDB Atlas Connection String

## Current Issue
Your `.env` file has:
```
MONGO_URI=mongodb://localhost:27017/homelyhub
```

This is for **local MongoDB**, but you're using **MongoDB Atlas** (cloud).

## Fix Steps

### 1. Get Your Atlas Connection String

1. Go to https://cloud.mongodb.com
2. Log in to your account
3. Click on your cluster
4. Click "Connect"
5. Choose "Connect your application"
6. Copy the connection string (it looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 2. Update Your .env File

Replace the `MONGO_URI` line in `backend/.env` with your Atlas connection string:

**Example:**
```env
MONGO_URI=mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/homelyhub?retryWrites=true&w=majority
```

**Important:**
- Replace `<username>` and `<password>` with your actual database user credentials
- Add `/homelyhub` before the `?` to specify the database name
- Keep `?retryWrites=true&w=majority` at the end

### 3. Restart Your Server

After updating `.env`, restart the server:
```powershell
npm start
```

You should see:
```
✅ MongoDB connected successfully!
Database: homelyhub
App running on port: 5000
```

## Security Note
Never commit your `.env` file to Git! It contains sensitive credentials.

