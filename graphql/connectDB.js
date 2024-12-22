import mongoose from "mongoose";

let connection = {};

export async function connectDB(MONGO_URL) {
    if (connection.isConnected) {
      console.log('DB is already connected');
      return;
    }
  
    if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;
      if (connection.isConnected === 1) {
        console.log('Use previous connection');
        return;
      }
      await mongoose.disconnect();
    }
  
    const db = await mongoose.connect(MONGO_URL);
    console.log('🚀 MongoDB Database Connected Successfully');
    connection.isConnected = db.connections[0].readyState;
  }
  
export async function disconnectDB() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not discounted');
    }
  }
}