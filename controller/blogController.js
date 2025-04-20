const { ObjectId } = require("mongodb");
const blogService = require("../services/blogService");
const { ERROR } = require("../constant");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.status(200).json({ result: blogs });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getBlogById = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await blogService.getBlogById(blogId);
    return res.status(200).json({ result: blog });
  } catch (error) {
    res.status(500).json({ error: ERROR.GET_BLOG_FAILED });
  }
};

const postBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const result = await blogService.postBlog({ title, content, author });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: ERROR.POST_BLOG_FAILED });
  }
};

const updateBlog = async (req, res) => {
  const { blogId } = req.params;
  const { title, content, author } = req.body;

  try {
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (author) updateData.author = author;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: ERROR.NO_DATA_PROVIDED });
    }

    const result = await blogService.updateBlog(blogId, updateData);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: ERROR.NOT_FOUND_BLOG });
    }

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: ERROR.UPDATE_BLOG_FAILED });
  }
};

const deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  if (!blogId || typeof blogId !== "string" || !ObjectId.isValid(blogId)) {
    return res.status(400).json({ error: ERROR.INVALID_ID });
  }

  try {
    const result = await blogService.deleteBlog(blogId);
    return res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: ERROR.DELETE_BLOG_FAILED });
  }
};

const getAllComments = async (req, res) => {
  const { blogId } = await req.params;
  try {
    const result = await blogService.getAllComments(blogId);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: ERROR.INTERNAL_SERVER_ERROR });
  }
};

const postComment = async (req, res, next) => {
  const { blogId } = await req.params;
  const { comment } = req.body;
  try {
    await blogService.postComment(blogId, comment);
    res.status(200).json({
      success: true,
      message: "Comment added successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: ERROR.INTERNAL_SERVER_ERROR,
    });
  }
};

const deleteComment = async (req, res, next) => {
  const { blogId, commentId } = req.params;

  try {
    await blogService.deleteComment(blogId, commentId);
    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  postBlog,
  updateBlog,
  deleteBlog,
  postComment,
  deleteComment,
  getAllComments,
};
