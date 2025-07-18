const mongoose = require("mongoose");

const CategorySchema=new mongoose.Schema({
    categoryName:{type:String,},
    image:{type:String},
    Slug:{type:String},
    headline:{type:String},
    detail:{type:String},
    subcategoryFAQ:{type:String},
    metaTitle:{type:String},
    metaDiscription:{type:String},
    metaKeywords:{type:String},
})

module.exports=mongoose.model("Category",CategorySchema)