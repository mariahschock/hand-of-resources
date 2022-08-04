const { Router } = require('express');
const Instrument = require('../models/Instrument');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const instruments = await Instrument.getAllInstruments();
      res.json(instruments);
    } catch (e) {
      next(e);
    }    
  })

  .get('/:id', async (req, res, next) => {
    try {
      const instrument = await Instrument.getInstrumentById(req.params.id);
      if (!instrument) {
        next();
      }
      res.json(instrument);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const instrument = await Instrument.insert(req.body);
      res.json(instrument);
    } catch (e) {
      next(e);
    }
  });

