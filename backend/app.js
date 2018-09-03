/*
 * Express app configuration
 */

const express = require('express');

// create the express app
const app = express();

// create and register new middlewares
app.use((req, res, next) => {
  console.log('First middleware');
  next(); // continue to next middleware
});

app.use((req, res, next) => {
  res.send('Hello from express!');
});

// export the entire express app
module.exports = app;
