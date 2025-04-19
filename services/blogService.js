const { ObjectId } = require("mongodb");
const { ERROR } = require("../constant");
const blogModel = require("../models/blogModel");

const getAllBlogs = async () => {
  return await blogModel.getAllBlogs();
};

const getBlogById = async (blogId) => {
  return await blogModel.getBlogById(blogId);
};

const postBlog = async (data) => {
  if (!data || !data.title || !data.content) {
    throw new Error(ERROR.NO_DATA_PROVIDED);
  }
  return await blogModel.postBlog({ ...data, createdAt: new Date() });
};

const updateBlog = async (blogId, data) => {
  if (!data || Object.keys(data).length === 0) {
    throw new Error(ERROR.NO_DATA_PROVIDED);
  }
  return await blogModel.updateBlog(blogId, data);
};

const deleteBlog = async (blogId) => {
  return await blogModel.deleteBlog(blogId);
};

const postComment = async (blogId, comment) => {
  if (!blogId || !ObjectId.isValid(blogId)) {
    throw new Error("Invalid blog ID");
  }

  if (!comment) {
    throw new Error("NO comment provided");
  }

  return await blogModel.addComment(blogId, comment);
};

const deleteComment = async (blogId, commentId) => {
  if (!blogId || !ObjectId.isValid(blogId)) {
    throw new Error("Invalid blog ID");
  }

  if (!commentId || !ObjectId.isValid(commentId)) {
    throw new Error("Invalid comment ID");
  }

  const result = await blogModel.deleteComment(blogId, commentId);

  if (result.modifiedCount === 0) {
    throw new Error("Comment not found or already deleted");
  }

  return result;
};
module.exports = {
  getAllBlogs,
  getBlogById,
  postBlog,
  deleteBlog,
  updateBlog,
  postComment,
  deleteComment,
};
