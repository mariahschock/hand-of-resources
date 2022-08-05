const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET - /movies should return a list of movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([{
      id: expect.any(String),
      title: expect.any(String),
      director: expect.any(String),
      year: expect.any(Number)
    }]));
  });

  it('GET - /movies/:id should return a single movie', async () => {
    const res = await request(app).get('/movies/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      title: 'Freaky Friday',
      director: 'Mark Waters',
      year: 2003,
    });
  });

  it('POST - /movies should create a new movie', async () => {
    const newMovie = {
      title: 'Eurovision',
      director: 'David Dobkin',
      year: 2020,
    };
    const res = await request(app).post('/movies').send(newMovie);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newMovie,
    });
  });

  it('PUT - /movies/:id should update movie', async () => {
    const res = await request(app).put('/movies/4').send({
      title: 'School of Rock 🤟',
    });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('School of Rock 🤟');
  });

  it('DELETE - /movies/:id should delete movie', async () => {
    const res = await request(app).delete('/movies/3');
    expect (res.status).toBe(200);

    const movieRes = await request(app).get('/movies/3');
    expect(movieRes.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
