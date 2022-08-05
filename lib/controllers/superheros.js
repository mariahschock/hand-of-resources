const { Router } = require('express');
const Superhero = require('../models/Superhero');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const superheros = await Superhero.getAllSuperheros();
      res.json(superheros);
    } catch (e) {
      next(e);
    }
  });
