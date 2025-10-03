const Comment = require("../models/Comment");
const BlogPost = require("../models/BlogPost");


exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentComment } = req.body;

    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      post: postId,
      author: req.user._id,  
      content,
      parentComment: parentComment || null,
    });

    await comment.populate("author", "name profileImageUrl");

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("author", "name profileImageUrl")
      .populate("post", "title coverImageUrl")
      .sort({ createdAt: 1 });

    const commentMap = {};
    comments.forEach((c) => {
      const comment = c.toObject();
      comment.replies = [];
      commentMap[comment._id] = comment;
    });

    const nestedComments = [];
    comments.forEach((c) => {
      if (c.parentComment) {
        const parent = commentMap[c.parentComment];
        if (parent) {
          parent.replies.push(commentMap[c._id]);
        }
      } else {
        nestedComments.push(commentMap[c._id]);
      }
    });

    res.json(nestedComments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await Comment.deleteOne({id:commentId});
    await Comment.deleteMany({ parentComment: commentId });

    res.json({ message: "Comment and replies deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("author", "name profileImageUrl")
      .populate("post", "title coverImageUrl")
      .sort({ createdAt: 1 });

    const commentMap = {};
    comments.forEach((c) => {
      const comment = c.toObject();
      comment.replies = [];
      commentMap[comment._id] = comment;
    });

    const nestedComments = [];
    comments.forEach((c) => {
      if (c.parentComment) {
        const parent = commentMap[c.parentComment];
        if (parent) {
          parent.replies.push(commentMap[c._id]);
        }
      } else {
        nestedComments.push(commentMap[c._id]);
      }
    });

    res.json(nestedComments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
