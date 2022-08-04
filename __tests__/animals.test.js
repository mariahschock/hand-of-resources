const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET -/animal should return a list of animals', async () => {
    const res = await request(app).get('/animals');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([{
      id: expect.any(String),
      type: expect.any(String),
      name: expect.any(String),
      age: expect.any(Number)
    }]));
  });

  afterAll(() => {
    pool.end();
  });
});
