import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      mongoose.set("strictQuery", false);
      const conn = await mongoose.connect(
        "mongodb://localhost:27017/airbnb-clone"
      );
      console.log(`MongoDB Connected with ${conn.connection.host}`);
    } else if (process.env.NODE_ENV === "production") {
      mongoose.set("strictQuery", false);
      const conn = await mongoose.connect(
        "mongodb+srv://vikram:vikram@testapi.yszcywk.mongodb.net/?retryWrites=true&w=majority"
      );
      console.log(`MongoDB Connected with ${conn.connection.host}`);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
