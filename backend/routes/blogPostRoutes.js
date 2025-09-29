const express=require("express");
const router=express.Router();
const protect=require("../middleware/authMiddleware")

const {createPost,updatePost,deletePost,getAllPost,getPostbySlug,getPostbyTag,searchPosts,incrementView,likePost,getTopPost}=require("../controllers/blogPostController.js")

const adminOnly=(req,res,next)=>{
    if(req.user && req.user.role=='admin'){
        next();
    }else{
        res.status(403).json({message:"Admin access only"});
    }
}

router.post("/",protect,adminOnly,createPost)
router.get("/",getAllPost)
router.get("/slug/:slug",getPostbySlug)
router.put("/:id",protect,adminOnly,updatePost)
router.delete("/:id",protect,adminOnly,deletePost)
router.get("/tag/:tag",getPostbyTag)
router.get("/search",searchPosts)
router.post("/:id/view",incrementView)
router.post("/:id/like",protect,likePost)
router.get("/trending",getTopPost)

module.exports=router