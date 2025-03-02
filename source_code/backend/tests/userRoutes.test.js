const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { app } = require("../server");
const loadUsers = require("../assets/loadUsers");

let mongoServer;

beforeAll(async () => {
    // Override the JWT_SECRET environment variable for testing (to avoid using the actual secret)
    process.env.JWT_SECRET = "4yJv9kL8s5d9f8s7d9f8s7d9f8s7d9f8s7d9f8s7d9f8s7d9f8s7d9f8s7d9f8s7";

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
