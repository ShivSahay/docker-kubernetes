const mongoose = require("mongoose");

const connectDb = async ()=>{
    try {
        const res = await mongoose.connect(process.env.MONGODBURL);
        if(res){
            console.log("Database connected Successfully");
        }else{
            console.log("Failed to connect Database");
        }
    } catch (error) {
        console.log("Hii error"+error);
    }
}
module.exports = connectDb;