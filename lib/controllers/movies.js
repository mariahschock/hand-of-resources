const { Router } = require('express');
const Movie = require('../models/Movie');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const movies = await Movie.getAllMovies();
      res.json(movies);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const movie = await Movie.getMovieById(req.params.id);
      if (!movie) {
        next();
      }
      res.json(movie);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const movie = await Movie.insert(req.body);
      res.json(movie);
    } catch (e) {
      next(e);
    }
  });

