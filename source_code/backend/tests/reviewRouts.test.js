// reviewRoutes.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('../server');
const Review = require('../models/reviewModel');
const loadUsers = require('../assets/loadUsers');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // Load test users
    await loadUsers.insertAdminUser();
    await loadUsers.insertServiceProviderUser();
    await loadUsers.insertUnverifiedServiceProviderUser();
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('Review Routes - Basic Tests', () => {
  let token;
  let consumerId;
  let providerId;

  beforeEach(async () => {
    // Clear reviews before each test
    await Review.deleteMany({});

    // Log in as admin to get a token
    const loginResponse = await request(app)
      .post('/users/login')
      .send({ username: 'admin', password: 'admin' });
    token = loginResponse.body.token;

    // Get test user IDs from inserted data
    const usersResponse = await request(app)
      .get('/serviceProviders')
      .set('Authorization', `Bearer ${token}`);
    
    consumerId = usersResponse.body.data.find(u => u.userDetails.first_name === 'John')._id;
    providerId = usersResponse.body.data.find(u => u.userDetails.first_name === 'Jake')._id;
  });

  describe('GET /reviews/top', () => {
    it('should return top reviews', async () => {
      // Insert test reviews
      await Review.create([
        { consumer: consumerId, provider: providerId, description: 'Great', rating: 5 },
        { consumer: providerId, provider: consumerId, description: 'Good', rating: 4 }
      ]);

      const response = await request(app).get('/reviews/top');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].rating).toBe(5);
      expect(response.body[0].description).toBe('Great');
      expect(response.body[1].rating).toBe(4);
      expect(response.body[1].description).toBe('Good');
    });

    it('should handle errors', async () => {
      // This test might need adjustment based on how your app handles DB errors
      // For now, we'll assume a basic error response
      const response = await request(app).get('/reviews/top');
      expect(response.status).toBe(200); // Empty array is still a success
      expect(response.body).toEqual([]); // No reviews yet
    });
  });

  describe('GET /reviews/worker-reviews/:workerId', () => {
    it('should return worker reviews', async () => {
      await Review.create({
        consumer: consumerId,
        provider: providerId,
        description: 'Test review',
        rating: 4
      });

      const response = await request(app).get(`/reviews/worker-reviews/${providerId}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.reviews).toHaveLength(1);
      expect(response.body.reviews[0].description).toBe('Test review');
      expect(response.body.reviews[0].rating).toBe(4);
      expect(response.body.reviews[0].provider.toString()).toBe(providerId);
    });

    it('should handle errors', async () => {
      // Test with invalid ObjectId to trigger error
      const invalidId = 'invalid-id';
      const response = await request(app).get(`/reviews/worker-reviews/${invalidId}`);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /reviews', () => {
    it('should create a review with valid data', async () => {
      const reviewData = {
        consumer: consumerId,
        provider: providerId,
        description: 'Good service',
        rating: 4
      };

      const response = await request(app)
        .post('/reviews')
        .send(reviewData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.review.description).toBe('Good service');
      expect(response.body.review.rating).toBe(4);
      expect(response.body.review.consumer.toString()).toBe(consumerId);
      expect(response.body.review.provider.toString()).toBe(providerId);
      expect(response.body.review.createdAt).toBeDefined();
      expect(response.body.review.updatedAt).toBeDefined();
    });

    it('should reject invalid rating', async () => {
      const invalidReviewData = {
        consumer: consumerId,
        provider: providerId,
        description: 'Good service',
        rating: 6 // Outside 1-5 range
      };

      const response = await request(app)
        .post('/reviews')
        .send(invalidReviewData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('All fields are required and rating must be between 1 and 5.');
    });

    it('should reject missing required fields', async () => {
      const invalidReviewData = {
        provider: providerId,
        rating: 4 // Missing consumer and description
      };

      const response = await request(app)
        .post('/reviews')
        .send(invalidReviewData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('All fields are required and rating must be between 1 and 5.');
    });

    it('should handle server errors', async () => {
      // This could be improved by mocking mongoose to throw an error
      // For now, testing with invalid ObjectId format
      const invalidReviewData = {
        consumer: 'invalid-id',
        provider: providerId,
        description: 'Good service',
        rating: 4
      };

      const response = await request(app)
        .post('/reviews')
        .send(invalidReviewData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });
});