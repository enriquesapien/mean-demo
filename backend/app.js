/*
 * Express app configuration
 */

const express = require('express');

// create the express app
const app = express();

// CORS management middleware
app.use((req, res, next) => {
  // allow clients from any other domain
  // e.g. localhost:4200 (Angular) -> localhost:3000 (Node/Express)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS');
  next();
})

// first argument(s) (like the path) are filters
// last argument is default
app.use('/api/posts', (req, res, next) => {

  const posts = [
    {
      id: 'sdfw53453',
      title: 'First server-side post',
      content: 'This is coming from the server'
    },
    {
      id: 'qwer57858',
      title: 'Second server-side post',
      content: 'This is coming from the server, too'
    }
  ];

  res.status(200).json({
    message: 'Posts fetched successufully!',
    posts: posts
  });
});

// export the entire express app
module.exports = app;
