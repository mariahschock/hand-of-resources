const { Router } = require('express');
const Animal = require('../models/Animal');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const animals = await Animal.getAllAnimals();
      res.json(animals);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const animal = await Animal.getAnimalById(req.params.id);
      if (!animal) {
        next();
      }
      res.json(animal);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const animal = await Animal.insert(req.body);
      res.json(animal);
    } catch (e) {
      next(e);
    }
  });
