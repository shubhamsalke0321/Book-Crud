const mongoose = require("mongoose");

const mongooseConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/book");
    console.log("Database Connection Successfully");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
};

module.exports = mongooseConnection;
