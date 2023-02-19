const InstaCloneModel = require("../models/InstaCloneModel");

exports.getPosts = async () => {
  return await InstaCloneModel.find();
};

exports.createPost = async (post) => {
  console.log("post11",post);
  return await InstaCloneModel.create(post.file);
};