const express=require("express")
const router=express.Router()
const {createDestination,getDestination,deleteDestination,updateDestination}=require("../controllers/Destination")
router.post("/create-destination",createDestination)
router.get("/get-destination",getDestination)
router.put("/update-destination/:id",updateDestination)
router.delete("/delete-destination/:id",deleteDestination)
module.exports=router