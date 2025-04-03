// tests/utils.test.js
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const {verifyToken} = require('../routes/utils'); // Adjust the path as necessary
const app = express();
app.use(express.json());

// Test route that uses verifyToken middleware
app.get('/test-protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Protected route accessed', userData: req.userData });
});

describe('Utils - verifyToken Middleware', () => {
  let validToken;

  beforeAll(() => {
    // Set JWT_SECRET for testing
    process.env.JWT_SECRET = '4yJv9kL8s5d9f8s7d9f8s7d9f8s7d9f8s7d9f8s7d9f8s7d9f8s7d9f8s7d9f8s7';

    // Create a valid token for testing
    const payload = { userId: 'testUser123' };
    validToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  });


  it('should reject request with invalid token', async () => {
    const invalidToken = 'invalid.token.here';
    const response = await request(app)
      .get('/test-protected')
      .set('Authorization', `Bearer ${invalidToken}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication Failed!');
  });

  it('should reject request with no token', async () => {
    const response = await request(app)
      .get('/test-protected');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication Failed!');
  });

  it('should reject request with malformed authorization header', async () => {
    const response = await request(app)
      .get('/test-protected')
      .set('Authorization', 'InvalidHeader');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication Failed!');
  });

  it('should reject expired token', async () => {
    const expiredPayload = { userId: 'testUser123' };
    const expiredToken = jwt.sign(expiredPayload, process.env.JWT_SECRET, { expiresIn: '1s' });

    // Wait for token to expire
    await new Promise(resolve => setTimeout(resolve, 1500));

    const response = await request(app)
      .get('/test-protected')
      .set('Authorization', `Bearer ${expiredToken}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication Failed!');
  });
});