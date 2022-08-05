const { Router } = require('express');
const Fruit = require('../models/Fruit');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const fruits = await Fruit.getAllFruits();
      res.json(fruits);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const fruit = await Fruit.getFruitById(req.params.id);
      if (!fruit) {
        next();
      }
      res.json(fruit);
    } catch (e) {
      next(e);
    }
  });

