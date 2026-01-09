import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      console.error('\n❌ ERROR: MONGO_URI is not defined in environment variables!\n');
      console.error('Please create a .env file in the backend directory with:');
      console.error('MONGO_URI=mongodb://localhost:27017/homelyhub');
      console.error('(Or use your MongoDB Atlas connection string)\n');
      process.exit(1);
    }
    
    console.log('Attempting to connect to MongoDB...');
    console.log(`Connection string: ${mongoURI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`); // Hide credentials in logs
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    console.log('✅ MongoDB connected successfully!');
    console.log(`Database: ${mongoose.connection.db.databaseName}`);
  } catch (error) {
    console.error('\n❌ MongoDB connection failed!');
    console.error(`Error: ${error.message}\n`);
    
    if (error.message.includes('ECONNREFUSED') || error.message.includes('connect')) {
      console.error('💡 Possible solutions:');
      console.error('1. Make sure MongoDB is running locally:');
      console.error('   - Windows: Check if MongoDB service is running');
      console.error('   - Or start MongoDB: mongod');
      console.error('2. If using MongoDB Atlas, check your connection string');
      console.error('3. Verify your MONGO_URI in .env file is correct\n');
    } else if (error.message.includes('authentication')) {
      console.error('💡 Authentication failed. Check your MongoDB credentials.\n');
    }
    
    process.exit(1);
  }
};

export default connectDB;
