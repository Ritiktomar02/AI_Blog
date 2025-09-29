const express=require("express");
const router=express.Router();
const protect=require("../middleware/authMiddleware")

const {getDashboardSummary}=require("../controllers/dashboardController.js")

const adminOnly=(req,res,next)=>{
    if(req.user && req.user.role=='admin'){
        next();
    }else{
        res.status(403).json({message:"Admin access only"});
    }
}


router.get("/",protect,adminOnly,getDashboardSummary)
module.exports=router