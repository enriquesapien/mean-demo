/*
 * Express app configuration
 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import required models
const Post = require('./models/post');

// create the express app
const app = express();

// configure connection to MongoDB
mongoose.connect('mongodb+srv://mdb_user_rw:IJZntwHzfjbKtfgB@cluster0-hecja.mongodb.net/node-angular?retryWrites=true')
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
    'GET, POST, PATCH, DELETE, OPTIONS');
  next();
})

// Middleware to manage POST requests for creating a new post
app.post('/api/posts/', (req, res, next) => {

  // create Post entity based on model
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  // save to DB
  post.save();

  // const post = req.body;
  console.log(post);

  res.status(201).json({
    message: 'Post added successfully'
  });

});

// Middleware to manage GET requests for fetching existing posts
app.get('/api/posts', (req, res, next) => {

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
