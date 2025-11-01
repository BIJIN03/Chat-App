import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const {MONGODB_URI} = process.env
    if (!MONGODB_URI) throw new Error("MONGODB_URI not found!")
    const conn = mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB.");
  } catch (error) {
    console.error("Connection failed.");
    process.exit(1)
  }
};
