const mongoose = require("mongoose");

const mongoDB = process.env.MONGO_DB_URI;

async function connectDb() {
  try {
    await mongoose.connect(mongoDB, { useNewUrlParser: true });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
  }
}
function close() {
  return mongoose.disconnect();
}
exports.connectDb = connectDb;
exports.close = close;
