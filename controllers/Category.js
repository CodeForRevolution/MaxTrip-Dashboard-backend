const Category = require("../models/Category");

const createCategory = async (req, res) => {
    const { categoryName,image,headline,metaKeywords,Slug,detail,subcategoryFAQ,metaDiscription,metaTitle,} = req.body;
    try {
        const data = new Category({categoryName,image ,headline ,metaKeywords,Slug,detail,subcategoryFAQ,metaDiscription,metaTitle});
        res.status(200).json({
            success: true,
            message: "Category created successfully",
            data,
        });
        await data.save();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Category not created",
            error,
        });
    }
};
const updateCategroy=async(req,res)=>{
    const {id}=req.params
    const {categoryName,image ,headline ,metaKeywords,Slug,detail,subcategoryFAQ,metaDiscription,metaTitle}=req.body
    try {
        const data=await Category.findByIdAndUpdate(id,{categoryName,image ,headline ,metaKeywords,Slug,detail,subcategoryFAQ,metaDiscription,metaTitle},{new:true})
        res.status(200).json({
            success:true,
            message:"Category updated successfully",
            data
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Category not updated",
            error
        })
    }
}
const delteCategory=async(req,res)=>{
    const {id}=req.params
    try {
        const data=await Category.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:"Category deleted successfully",
            data
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Category not deleted",
            error
        })
    }
}

const getCategory=async(req,res)=>{
    try {
        const data=await Category.find()
        res.status(200).json({
            success:true,
            message:"Category fetched successfully",
            data
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Category not fetched",
            error
        })
    }
}

module.exports=({createCategory,updateCategroy,delteCategory,getCategory})
