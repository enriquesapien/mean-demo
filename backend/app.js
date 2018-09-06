/*
 * Express app configuration
 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");

// create the express app
const app = express();

// configure connection to MongoDB
mongoose.connect(
  'mongodb+srv://mdb_user_rw:' +
  process.env.MONGO_ATLAS_PW +
  '@cluster0-hecja.mongodb.net/node-angular?retryWrites=true')
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to manage CORS configuration
app.use((req, res, next) => {
  // allow clients from any other domain
  // e.g. localhost:4200 (Angular) -> localhost:3000 (Node/Express)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/posts/', postsRoutes);

// export the entire express app
module.exports = app;
