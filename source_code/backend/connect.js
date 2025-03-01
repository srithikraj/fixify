require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
const logger = require("./logger");

let isConnected = false;

const connectToServer = async () => {
  if (isConnected) {
    logger.log("DB CONNECTION: Already connected, reusing existing connection.");
    return mongoose.connection.db;
  }

  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    });

    isConnected = true;
    logger.log("DB CONNECTION: Successfully connected to MongoDB.");
  } catch (error) {
    logger.error("DB CONNECTION: Failed to connect to MongoDB", error);
    throw error;
  }
};

const getDb = () => {
  if (!isConnected) {
    throw new Error("DB CONNECTION: Not connected to MongoDB!");
  }
  return mongoose.connection.db;
};

const closeConnection = async () => {
  if (isConnected) {
    await mongoose.connection.close();
    isConnected = false;
    logger.log("DB CONNECTION: Closed MongoDB connection.");
  }
};

module.exports = { connectToServer, getDb, closeConnection };
