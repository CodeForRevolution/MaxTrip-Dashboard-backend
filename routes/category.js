const express=require("express")
const { createCategory, getCategory, delteCategory ,updateCategroy} = require("../controllers/Category")
const router=express.Router()

router.post("/create-category",createCategory)
router.get("/get-category",getCategory)
router.put("/update-category/:id",updateCategroy)
router.delete("/delete-category/:id",delteCategory)


module.exports=router