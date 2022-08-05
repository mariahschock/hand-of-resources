const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET - /superheros should return a list of superheros', async () => {
    const res = await request(app).get('/superheros');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([{
      id: expect.any(String),
      name: expect.any(String),
      secret_identity: expect.any(String),
      universe: expect.any(String)
    }]));
  });

  it('GET - /superheros/:id should return single superhero', async () => {
    const res = await request(app).get('/superheros/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      name: 'Spider-Man',
      secret_identity: 'Peter Parker',
      universe: 'Marvel',
    });
  });

  it('POST - /superheros should create a new superhero', async () => {
    const newSuperhero = {
      name: 'Wonder Woman',
      secret_identity: 'Diana Prince',
      universe: 'DC',
    };
    const res = await request(app).post('/superheros').send(newSuperhero);
    expect (res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newSuperhero,
    });
  });

  it('PUT - /superheros/:id should update an existing superhero', async () => {
    const res = await request(app).put('/superheros/1').send({
      name: 'Spiderman',
    });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Spiderman');
  });

  afterAll(() => {
    pool.end();
  });
});
