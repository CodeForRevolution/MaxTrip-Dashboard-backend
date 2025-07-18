const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const connectDB=async()=>{
    try {
      await  mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected');
    } catch (error) {
        console.log(error);
        
    }
}
module.exports=connectDB