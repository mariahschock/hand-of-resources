const express = require('express');
const path = require('path');
const app = express();

// Built in middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// App routes
app.use('/instruments', require('./controllers/instruments'));
app.use('/animals', require('./controllers/animals'));
app.use('/movies', require('./controllers/movies'));
app.use('/fruits', require('./controllers/fruits'));
app.use('/superheros', require('./controllers/superheros'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
