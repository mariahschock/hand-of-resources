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
  });

