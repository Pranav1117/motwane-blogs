const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");
const { ERROR } = require("../constant");

const getAllBlogs = async () => {
  const db = await getDB();
  return await db.collection("blogs").find().toArray();
};

const getBlogById = async (blogId) => {
  if (!blogId || typeof blogId !== "string" || !ObjectId.isValid(blogId)) {
    throw new Error(ERROR.INVALID_ID);
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
    throw new Error(ERROR.INVALID_ID);
  }
  const db = await getDB();
  return await db
    .collection("blogs")
    .updateOne({ _id: new ObjectId(blogId) }, { $set: data });
};

const deleteBlog = async (blogId) => {
  if (!blogId || typeof blogId !== "string" || !ObjectId.isValid(blogId)) {
    throw new Error(ERROR.INVALID_ID);
  }
  const db = await getDB();
  return await db.collection("blogs").deleteOne({ _id: new ObjectId(blogId) });
};

const addComment = async (blogId, comment) => {
  const db = await getDB();
  if (typeof blogId !== "string") return;

  return await db.collection("blogs").updateOne(
    { _id: new ObjectId(blogId) },
    {
      $push: {
        comments: {
          _id: new ObjectId(),
          text: comment,
          createdAt: new Date(),
        },
      },
    }
  );
};

const deleteComment = async (blogId, commentId) => {
  const db = await getDB();

  return await db.collection("blogs").updateOne(
    { _id: new ObjectId(blogId) },
    {
      $pull: {
        comments: { _id: new ObjectId(commentId) },
      },
    }
  );
};

module.exports = {
  getAllBlogs,
  getBlogById,
  postBlog,
  updateBlog,
  deleteBlog,
  addComment,
  deleteComment,
};
