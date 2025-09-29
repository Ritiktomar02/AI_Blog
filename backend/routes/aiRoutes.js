const express=require("express");
const router=express.Router();

const protect = require("../middleware/authMiddleware.js");

const {generateBlogPost,generateBlogPostIdeas,generateCommentReply,generatePostSummary}=require("../controllers/aiController.js")

router.post("/generate",protect,generateBlogPost)
router.post("/generate-ideas",protect,generateBlogPostIdeas)
router.post("/generate-reply",protect,generateCommentReply)
router.post("/generate-summary",generatePostSummary)

module.exports=router