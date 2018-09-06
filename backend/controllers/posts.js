// import required models
const Post = require('../models/post');

exports.createPost = (req, res, next) => {

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
}

exports.updatePost = (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });

  Post.updateOne({ _id: req.params.id }, post)
  .then(result => {
    res.status(200).json({ message: 'Update successful!' });
  })

}

exports.fetchPost = (req, res, next) => {
  Post.findById(req.params.id)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found!' });
    }
  })
}

exports.fetchPosts = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;

  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  postQuery.then(documents => {
    fetchedPosts = documents;
    return Post.count();
  }).then(count => {
    res.status(200).json({
      message: 'Posts fetched successufully!',
      posts: fetchedPosts,
      maxPosts: count
    });
  });
}

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
  .then(createdPost => {
    console.log(createdPost);
    res.status(200).json({
      message: 'Post deleted!'
    });
  });
}
