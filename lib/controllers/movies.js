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
  });
  
