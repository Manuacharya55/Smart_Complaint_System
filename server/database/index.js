import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URL);
    console.log("✅ Database Connected");
  } catch (error) {
    console.error("❌ Failed to connect to DB:", error);
    throw error;
  }
};