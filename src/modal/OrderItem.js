const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    mrpPrice:{
        type:Number,
        required:true
    },
    sellingPrice:{
        type:Number,
        required:true
    }
});
module.exports = mongoose.model("OrderItem",orderItemSchema);
