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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const superhero = await Superhero.getSuperheroById(req.params.id);
      if (!superhero) {
        next();
      } 
      res.json(superhero);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const superhero = await Superhero.insert(req.body);
      res.json(superhero);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const superhero = await Superhero.updateById(req.params.id, req.body);
      res.json(superhero);
    } catch (e) {
      next(e);
    }
  });
