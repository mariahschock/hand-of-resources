const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET - /fruits should return a list of fruits', async () => {
    const res = await request(app).get('/fruits');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([{
      id: expect.any(String),
      name: expect.any(String),
      color: expect.any(String),
      goes_on_pizza: expect.any(Boolean)
    }]));
  });

  afterAll(() => {
    pool.end();
  });
});
