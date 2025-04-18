const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");
const { ERROR } = require("../constant");

const getAllBlogs = async () => {
  const db = await getDB();
  return await db.collection("blogs").find().toArray();
};

const getBlogById = async (blogId) => {
  if (!blogId || typeof blogId !== "string" || !ObjectId.isValid(blogId)) {
    return res.status(400).json({ error: ERROR.INVALID_ID });
  }
  const db = await getDB();
  return await db.collection("blogs").findOne({ _id: new ObjectId(blogId) });
};

const postBlog = async (data) => {
  const db = await getDB();
  return await db.collection("blogs").insertOne(data);
};

const updateBlog = async (blogId, data) => {
  if (!blogId || typeof blogId !== "string" || !ObjectId.isValid(blogId)) {
    return res.status(400).json({ error: ERROR.INVALID_ID });
  }
  const db = await getDB();
  return await db
    .collection("blogs")
    .updateOne({ _id: new ObjectId(blogId) }, { $set: data });
};

const deleteBlog = async (blogId) => {
  if (!blogId || typeof blogId !== "string" || !ObjectId.isValid(blogId)) {
    return res.status(400).json({ error: ERROR.INVALID_ID });
  }
  const db = await getDB();
  return await db.collection("blogs").deleteOne({ _id: new ObjectId(blogId) });
};

module.exports = { getAllBlogs, getBlogById, postBlog, deleteBlog, updateBlog };
