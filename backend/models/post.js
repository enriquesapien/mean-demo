// import mongoose package
const mongoose = require('mongoose');

// define the schemas (model blueprints)
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

// define and export the models
module.exports = mongoose.model('Post', postSchema);
