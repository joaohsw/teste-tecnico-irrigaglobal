const express = require('express');
const app = express();

app.use(express.json());

const pivotRoutes = require('./pivot');
const irrigationRoutes = require('./irrigations');

app.use('/pivots', pivotRoutes);
app.use('/irrigations', irrigationRoutes);

module.exports = app;