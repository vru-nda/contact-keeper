const mongoose = require('mongoose');

const db = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(db);
    console.log('Connected!');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
