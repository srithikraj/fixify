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
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

test("Test Admin Login", async () => {
    const response = await request(app)
        .post("/users/login")
        .send({ username: "admin", password: "admin" });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Login Successful!");
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(response.body.user.username).toBe("admin");
    expect(response.body.user.role).toBe("admin");
});