import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI ?? '');
    if (connection.readyState === 1) {
      console.log(`MongoDB connected: ${connection.host}`);
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongo;
