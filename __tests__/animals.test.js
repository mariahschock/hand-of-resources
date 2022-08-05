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

  it('GET - /animals/:id should return a single animal', async () => {
    const res = await request(app).get('/animals/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      type: 'cat',
      name: 'Leo',
      age: 5,
    });
  });

  it('POST - /animals should create a new animal', async () => {
    const newAnimal = {
      type: 'dog',
      name: 'Copper',
      age: 3,
    };
    const res = await request(app).post('/animals').send(newAnimal);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newAnimal,
    });
  });

  it('PUT - /animals/:id should update an existing animal', async () => {
    const res = await request(app).put('/animals/2').send({
      name: 'Thicc Kitty',
    });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Thicc Kitty');
  });

  it('DELETE - /animals/:id should delete an animal', async () => {
    const res = await request(app).delete('/animals/4');
    expect(res.status).toBe(200);

    const animalRes = await request(app).get('/animals/4');
    expect(animalRes.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
