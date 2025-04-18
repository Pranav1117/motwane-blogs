const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const getAllBlogs = async (req, res) => {
  try {
    const db = await getDB();
    const blogs = await db.collection("blogs").find().toArray();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

const getBlogById = async (req, res) => {
  const { blogId } = req.params;

  try {
    const db = await getDB();
    const a = await db
      .collection("blogs")
      .findOne({ _id: new ObjectId(blogId) });
    return res.send(a);
  } catch (error) {
    console.log(error);
  }
};

const postBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const db = await getDB();
    const newBlog = {
      title,
      content,
      author,
    };

    const r = await db.collection("blogs").insertOne(newBlog);
    res.send(r);
  } catch (error) {
    console.log("first");
  }
};

const updateBlog = async (req, res) => {
  const { blogId } = req.params;

  const { title, content, author } = req.body;

  if (!blogId || typeof blogId !== "string" || !ObjectId.isValid(blogId)) {
    return res.status(400).json({ error: "Invalid blog ID" });
  }

  try {
    const db = await getDB();

    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (author) updateData.author = author;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No update data provided" });
    }

    const result = await db
      .collection("blogs")
      .updateOne({ _id: new ObjectId(blogId) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", result });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Failed to update blog" });
  }
};

const deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  if (!blogId || typeof blogId !== "string" || !ObjectId.isValid(blogId)) {
    return res.status(400).json({ error: "Invalid blog ID" });
  }

  try {
    const db = await getDB();
    const a = await db
      .collection("blogs")
      .deleteOne({ _id: new ObjectId(blogId) });
    console.log(a);
    return res.send(a);
  } catch (error) {
    console.log("first");
  }
};

module.exports = { getAllBlogs, getBlogById, postBlog, updateBlog, deleteBlog };
