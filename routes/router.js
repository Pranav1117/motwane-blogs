const router = require("express").Router();
const blogController = require("../controller/blogController");

router.get("/getallblogs", blogController.getAllBlogs);

router.get("/getbloginfo/:blogId", blogController.getBlogById);

router.post("/postblog", blogController.postBlog);

router.patch("/updateblog/:blogId", blogController.updateBlog);

router.delete("/deleteblog/:blogId", blogController.deleteBlog);

router.get("/allcomments/:blogId/", blogController.getAllComments);

router.patch("/:blogId/comment", blogController.postComment);

router.delete("/:blogId/comment/:commentId", blogController.deleteComment);

module.exports = router;
