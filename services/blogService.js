const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

exports.getAllBlogs = async () => {
  const db = await getDB();
  return db.collection("blogs").find().toArray();
};

exports.getBlogById = async (blogId) => {
  const db = await getDB();
  return db.collection("blogs").findOne({ _id: new ObjectId(blogId) });
};

exports.createBlog = async (blogData) => {
  const db = await getDB();
  return db.collection("blogs").insertOne(blogData);
};

exports.updateBlog = async (blogId, updateData) => {
  const db = await getDB();
  return db
    .collection("blogs")
    .updateOne({ _id: new ObjectId(blogId) }, { $set: updateData });
};

exports.deleteBlog = async (blogId) => {
  const db = await getDB();
  return db.collection("blogs").deleteOne({ _id: new ObjectId(blogId) });
};
