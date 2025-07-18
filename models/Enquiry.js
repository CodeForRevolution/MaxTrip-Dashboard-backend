const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
    fullName: {
        type: String,
       
    },
    email: {
        type: String,
       
    },
    mobile: {
        type: String,
       
    },
    distination:{
        type: String,
       
    },
    members: {
        type: String,
       
    },
    packageName: {
        type: String,
      
    },
    date: {
        type: String,
       
    }
  
});
module.exports = mongoose.model("Enquiry", EnquirySchema);