const express = require("express");
const cors = require("cors");
const connect = require("./connect");
const users = require("./routes/userRoutes");
const services = require("./routes/serviceRoutes");
const serviceProviders = require("./routes/serviceProviderRoutes");
const reviews = require("./routes/reviewRoutes");
const logger = require("./logger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(users);
app.use(services);
app.use(serviceProviders);
app.use(reviews);

let server;

const startServer = async () => {
  try {
    await connect.connectToServer();
    logger.log("Successfully connected to DB!");

    server = app.listen(PORT, () => {
      logger.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to connect to DB!", error);
    process.exit(1);
  }
};

// Graceful shutdown server
const shutdownServer = async () => {
  logger.log("Shutting down server...");
  await connect.closeConnection();
  if (server) {
    server.close(() => {
      logger.log("Server closed.");
      process.exit(0);
    });
  }
};

process.on("SIGINT", shutdownServer);
process.on("SIGTERM", shutdownServer);

startServer();