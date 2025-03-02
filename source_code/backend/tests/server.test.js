const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");
const connect = require("../connect");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Override the actual MongoDB URI with the in-memory server URI
  process.env.ATLAS_URI = mongoUri;
});

afterAll(async () => {
  await mongoServer.stop();
});


test("Test connection to mock database", async () => {
  expect(mongoose.connection.readyState).toBe(0);
  
  await connect.connectToServer();

  expect(mongoose.connection.readyState).toBe(1);

  await connect.closeConnection();

  expect(mongoose.connection.readyState).toBe(0);
});
