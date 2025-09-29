const express=require("express");
const router=express.Router();

const{addComment,getCommentsByPost,deleteComment,getAllComments}=require("../controllers/commentController.js")
const protect=require("../middleware/authMiddleware")

router.post("/:postId",protect,addComment)
router.get("/:postId",protect,getCommentsByPost)
router.get("/",protect,getAllComments)
router.delete("/:commentId",protect,deleteComment)


module.exports=router