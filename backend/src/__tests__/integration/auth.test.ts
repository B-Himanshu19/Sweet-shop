import request from 'supertest';
import app from '../../server';
import { database } from '../../database/database';

describe('Auth API Integration Tests', () => {
  beforeAll(async () => {
    await database.run('DELETE FROM users');
  });

  afterAll(async () => {
    await database.run('DELETE FROM users');
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.username).toBe('newuser');
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('should return 400 for invalid data', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'ab',
          email: 'invalid-email',
          password: '123',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'newuser',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'newuser',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
    });
  });
});

