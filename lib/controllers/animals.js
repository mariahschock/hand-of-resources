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
  });
