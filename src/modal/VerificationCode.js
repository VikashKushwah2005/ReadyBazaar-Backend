const mongoose = require("mongoose");

const verificationCodeSchema = new mongoose.Schema({
     otp:{
        type:String,
     },
     email:{
        type:String,   
        required:true
     },
    
});
module.exports = mongoose.model("VerificationCode",verificationCodeSchema);
