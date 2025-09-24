const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected to ${process.env.MONGO_URI}`);
  } catch (error) {
    console.error("❌ DB connection error:", error);
    process.exit(1); // Exit the app if DB connection fails
  }
};

module.exports = connectDB;
