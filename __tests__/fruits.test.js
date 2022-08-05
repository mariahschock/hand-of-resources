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

  it('GET - /fruits/:id should return a single fruit', async () => {
    const res = await request(app).get('/fruits/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      name: 'Orange',
      color: 'orange',
      goes_on_pizza: false,
    });
  });

  it('POST - /fruits should create a new fruit', async () => {
    const newFruit = {
      name: 'Plum',
      color: 'purple',
      goes_on_pizza: false,
    };
    const res = await request(app).post('/fruits').send(newFruit);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newFruit,
    });
  });

  it('PUT - /fruits/:id should update an existing fruit', async () => {
    const res = await request(app).put('/fruits/4').send({
      goes_on_pizza: false,
    });
    expect(res.status).toBe(200);
    expect(res.body.goes_on_pizza).toBe(false);
  });

  it('DELETE - /fruits/:id should delete fruit', async () => {
    const res = await request(app).delete('/fruits/1');
    expect(res.status).toBe(200);

    const fruitRes = await request(app).get('/fruits/1');
    expect(fruitRes.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
