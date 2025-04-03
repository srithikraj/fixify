const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { sendOTP, verifyOTP } = require("../controller/otpService");
const UserOTPVerification = require("../models/UserOTPVerification");

jest.mock("nodemailer");
jest.mock("bcrypt");
jest.mock("../models/UserOTPVerification");

describe("OTP Service", () => {
  let mockTransporter;

  beforeAll(() => {
    // Mock nodemailer transporter
    mockTransporter = {
      sendMail: jest.fn().mockResolvedValue(true),
      verify: jest.fn().mockResolvedValue(true),
    };
    nodemailer.createTransport.mockReturnValue(mockTransporter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("sendOTP", () => {

    it("should throw an error if email or userId is missing", async () => {
      await expect(sendOTP(null, "12345")).rejects.toThrow("Email and userId are required");
      await expect(sendOTP("test@example.com", null)).rejects.toThrow("Email and userId are required");
    });

    it("should throw an error if transporter is not initialized", async () => {
        jest.resetModules(); // Clear the module cache
        nodemailer.createTransport.mockReturnValueOnce(null);
        const { sendOTP } = require("../controller/otpService"); // Re-import the module
        
        await expect(sendOTP("test@example.com", "12345"))
          .rejects.toThrow("Email service not properly initialized");
      });
    });
  describe("verifyOTP", () => {



    it("should throw an error if userId or OTP is missing", async () => {
      await expect(verifyOTP(null, "12345")).rejects.toThrow("userId and OTP are required");
      await expect(verifyOTP("12345", null)).rejects.toThrow("userId and OTP are required");
    });
  });
});