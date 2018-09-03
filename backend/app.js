/*
 * Express app configuration
 */

const express = require('express');

// create the express app
const app = express();

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
