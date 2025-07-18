const express=require("express")
const router=express.Router()
const {createPackeges,getPackeges, deletePackeges, updatePackeges}=require("../controllers/HolidayPackeges")
router.post("/create-packeges",createPackeges)
router.get("/get-packeges",getPackeges)
router.put("/update-packeges/:id",updatePackeges)
router.delete("/delete-packeges/:id",deletePackeges)
module.exports=router