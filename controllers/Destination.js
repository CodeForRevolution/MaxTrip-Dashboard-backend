const Destination = require("../models/Destination");

const createDestination = async (req,res) => {
  const { title, image, description, date, shotDescription,slug,status,metaTitle,metaKeyword,metaDescription}=req.body

try {
      const data = new Destination({title, image, description, date, shotDescription,slug,status,metaTitle,metaKeyword,metaDescription});
  await data.save();
  res.status(200).json({
    success: true,
    message: "Destination created successfully",
    data,
  });
} catch (error) {
    res.status(400).json({
    success: false,
    message: "Destination not created",
    error,
  });
}
};

const updateDestination=async(req,res)=>{
    const {id}=req.params
    const {title, image, description, date, shotDescription,slug,status,metaTitle,metaKeyword,metaDescription}=req.body
    try {
        const data=await Destination.findByIdAndUpdate(id,{title, image, description, date, shotDescription,slug,status,metaTitle,metaKeyword,metaDescription},{new:true})
        res.status(200).json({
            success:true,
            message:"Destination updated successfully",
            data
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Destination not updated",
            error
        })
    }
}
const getDestination=async(req,res)=>{
    try {
        const data=await Destination.find()
        res.status(200).json({
            success:true,
            message:"Destination fetched successfully",
            data
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Destination not fetched",
            error
        })
    }
}
const deleteDestination=async(req,res)=>{
    const {id}=req.params
    try {
        const data=await Destination.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:"Destination deleted successfully",
            data
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Destination not deleted",
            error
        })
    }
}
module.exports={createDestination,getDestination,deleteDestination,updateDestination}