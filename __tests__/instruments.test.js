const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET - /instruments should return a list of instruments', async () => {
    const res = await request(app).get('/instruments');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([{
      id: expect.any(String),
      instrument_name: expect.any(String),
      category: expect.any(String),
      difficulty: expect.any(String)
    }]));
  });

  it('GET - /instruments/:id should return a single instrument', async () => {
    const res = await request(app).get('/instruments/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      instrument_name: 'Trumpet',
      category: 'Brass', 
      difficulty: 'Medium',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
