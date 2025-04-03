const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { app } = require("../server");
const loadUsers = require("../assets/loadUsers");
const nodemailer = require("nodemailer");

// Mock Nodemailer
jest.mock("nodemailer");

let mongoServer;

beforeAll(async () => {
    // Override the JWT_SECRET environment variable for testing
    process.env.JWT_SECRET = "4yJv9kL8s5d9f8s7d9f8s7d9f8s7d9f8s7d9f8s7d9f8s7d9f8s7d9f8s7d9f8s7";

    // Mock Nodemailer's createTransport and sendMail
    nodemailer.createTransport.mockReturnValue({
        sendMail: jest.fn().mockResolvedValue({ messageId: "mocked-message-id" }),
    });

    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // Load admin user into db
    await loadUsers.insertAdminUser();

    // Load verified service provider user into db
    await loadUsers.insertServiceProviderUser();

    // Load unverified service provider user into db
    await loadUsers.insertUnverifiedServiceProviderUser();
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe("Service Provider Routes", () => {
  let token;

  beforeEach(async () => {
    // Log in as admin to get a token
    const loginResponse = await request(app)
      .post("/users/login")
      .send({ username: "admin", password: "admin" });
    token = loginResponse.body.token;
  });

  test("GET /verified/serviceProviders - should return all verified service providers", async () => {
    // Get all verified service providers
    const response = await request(app)
      .get("/verified/serviceProviders")
      .set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1); // Only one verified service provider

    const verifiedProvider = response.body.data[0];
    expect(verifiedProvider.userDetails.first_name).toBe("John");
    expect(verifiedProvider.userDetails.last_name).toBe("Doe");
    expect(verifiedProvider.status).toBe("verified");
  });

  test("GET /serviceProviders - should return all service providers", async () => {
    // Get all service providers
    const response = await request(app)
      .get("/serviceProviders")
      .set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(2); // Two service providers in total

    const firstProvider = response.body.data.find(
      (provider) => provider.userDetails.first_name === "John"
    );
    const secondProvider = response.body.data.find(
      (provider) => provider.userDetails.first_name === "Jake"
    );

    // Check first provider details
    expect(firstProvider.userDetails.first_name).toBe("John");
    expect(firstProvider.userDetails.last_name).toBe("Doe");
    expect(firstProvider.status).toBe("verified");

    // Check second provider details
    expect(secondProvider.userDetails.first_name).toBe("Jake");
    expect(secondProvider.userDetails.last_name).toBe("Smith");
    expect(secondProvider.status).toBe("pending");
  });
});