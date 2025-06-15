const request = require('supertest');
const { app } = require('../app');

describe('User API', () => {
  it('GET /api/users debe devolver 200 y un array de usuarios', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.users)).toBe(true);
  });

  // Puedes agregar más pruebas para POST, PUT, DELETE, etc.
});
