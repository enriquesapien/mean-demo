const express = require('express');
const router = express.Router();

// import required models
const Post = require('../models/post');

// CREATE NEW POST
// Middleware to manage POST requests for creating a new post
router.post('', (req, res, next) => {

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

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });

  Post.updateOne({ _id: req.params.id }, post)
  .then(result => {
    res.status(200).json({ message: 'Update successful!' });
  })

});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found!' });
    }
  })
});

// FETCH POSTS
// Middleware to manage GET requests for fetching existing posts
router.get('', (req, res, next) => {

  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched successufully!',
      posts: documents
    });
  });

});

// DELETE POST
// Middleware to manage DELETE requests to delete a Post record
router.delete('/:id', (req, res, next) => {

  Post.deleteOne({ _id: req.params.id })
  .then(createdPost => {
    console.log(createdPost);
    res.status(200).json({
      message: 'Post deleted!'
    });
  });
});

module.exports = router;
