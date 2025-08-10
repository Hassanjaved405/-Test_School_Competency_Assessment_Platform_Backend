import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

const connectDatabase = async (): Promise<void> => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test_school_assessment';
    
    if (!mongoUri || mongoUri.includes('<db_password>')) {
      throw new Error('Invalid MongoDB URI. Please set MONGODB_URI environment variable with actual password.');
    }
    
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    
    isConnected = true;
    console.log(`MongoDB connected successfully`);
    
    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
      isConnected = false;
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      isConnected = false;
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    // Don't exit in serverless environment
    if (process.env.VERCEL !== '1') {
      process.exit(1);
    }
    throw error;
  }
};

export default connectDatabase;