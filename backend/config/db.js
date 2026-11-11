const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentxchange');
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.log('MongoDB connection failed:', error);
  }
};

module.exports = connectDB;
