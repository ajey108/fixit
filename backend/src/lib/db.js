import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URI =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_CLOUD
        : process.env.MONGO_URI_LOCAL;
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("Using Mongo URI:", MONGO_URI);

    const conn = await mongoose.connect(MONGO_URI, {});

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
