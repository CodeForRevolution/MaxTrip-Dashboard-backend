const express=require("express")
const router=express.Router()

const { getEnquiry, createEnquiry, deleteEnquiry } = require("../controllers/Enquiry")
router.post("/create-enquiry",createEnquiry)
router.get("/get-enquiry",getEnquiry)
router.delete("/delete-enquiry/:id",deleteEnquiry)
module.exports=router