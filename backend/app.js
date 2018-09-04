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
    'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
})

// CREATE NEW POST
// Middleware to manage POST requests for creating a new post
app.post('/api/posts/', (req, res, next) => {

  // create Post entity based on model
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  // save to DB
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });

  Post.updateOne({ _id: req.params.id }, post)
  .then(result => {
    console.log(result);
    res.status(200).json({ message: 'Update successful!' });
  })

});

// FETCH POSTS
// Middleware to manage GET requests for fetching existing posts
app.get('/api/posts', (req, res, next) => {

  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched successufully!',
      posts: documents
    });
  });

});

// DELETE POST
// Middleware to manage DELETE requests to delete a Post record
app.delete('/api/posts/:id', (req, res, next) => {

  Post.deleteOne({ _id: req.params.id })
  .then(createdPost => {
    console.log(createdPost);
    res.status(200).json({
      message: 'Post deleted!'
    });
  });


});

// export the entire express app
module.exports = app;
