const express = require('express');
const router = express.Router();

const PostController = require('../controllers/posts');

router.post('', PostController.createPost);
router.put("/:id", PostController.updatePost);
router.get("/:id", PostController.fetchPost);
router.get('', PostController.fetchPosts);
router.delete('/:id', PostController.deletePost);

module.exports = router;
