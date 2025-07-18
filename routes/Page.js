const express=require("express")
const router=express.Router()
const {createPage,getPage,deletePage,updatePage}=require("../controllers/Page")
router.post("/create-Page",createPage)
router.get("/get-Page",getPage)
router.put("/update-Page/:id",updatePage)
router.delete("/delete-Page/:id",deletePage)
module.exports=router