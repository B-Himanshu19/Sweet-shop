import request from 'supertest';
import app from '../../server';
import { database } from '../../database/database';
import { authService } from '../../services/authService';

describe('Sweets API Integration Tests', () => {
  let userToken: string;
  let adminToken: string;
  let adminUser: any;

  beforeAll(async () => {
    await database.run('DELETE FROM sweets');
    await database.run('DELETE FROM users');

    // Create regular user
    const user = await authService.register({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });
    const loginResult = await authService.login('testuser', 'password123');
    userToken = loginResult.token;

    // Create admin user
    adminUser = await authService.register({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    });
    const adminLoginResult = await authService.login('admin', 'admin123');
    adminToken = adminLoginResult.token;
  });

  afterAll(async () => {
    await database.run('DELETE FROM sweets');
    await database.run('DELETE FROM users');
  });

  describe('POST /api/sweets', () => {
    it('should create sweet as admin', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test Chocolate',
          category: 'Chocolate',
          price: 5.99,
          quantity: 10,
        });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Test Chocolate');
    });

    it('should return 403 for non-admin user', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Unauthorized Sweet',
          category: 'Test',
          price: 1.99,
        });

      expect(response.status).toBe(403);
    });

    it('should return 401 without token', async () => {
      const response = await request(app)
        .post('/api/sweets')
        .send({
          name: 'No Auth Sweet',
          category: 'Test',
          price: 1.99,
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/sweets', () => {
    it('should get all sweets with authentication', async () => {
      const response = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/sweets/search', () => {
    beforeEach(async () => {
      await database.run('DELETE FROM sweets');
      await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Search Test', category: 'Test', price: 3.99, quantity: 5 });
    });

    it('should search sweets by name', async () => {
      const response = await request(app)
        .get('/api/sweets/search?name=Search')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    let sweetId: number;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Purchase Test', category: 'Test', price: 2.99, quantity: 10 });
      sweetId = response.body.id;
    });

    it('should purchase sweet successfully', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweetId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 2 });

      expect(response.status).toBe(200);
      expect(response.body.sweet.quantity).toBe(8);
    });
  });

  describe('DELETE /api/sweets/:id', () => {
    it('should delete sweet as admin', async () => {
      const createResponse = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Delete Test', category: 'Test', price: 1.99, quantity: 5 });

      const deleteResponse = await request(app)
        .delete(`/api/sweets/${createResponse.body.id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(deleteResponse.status).toBe(200);
    });

    it('should return 403 for non-admin', async () => {
      const createResponse = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Delete Test 2', category: 'Test', price: 1.99, quantity: 5 });

      const deleteResponse = await request(app)
        .delete(`/api/sweets/${createResponse.body.id}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(deleteResponse.status).toBe(403);
    });
  });
});

