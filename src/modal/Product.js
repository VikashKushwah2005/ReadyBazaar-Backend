
const mongoose = require('mongoose');

const productSchema  = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{   
        type:String,
        required:true,
    },
    mrpPrice:{
        type:Number,
        required:true,      
    },
    sellingPrice:{
        type:Number,
        required:true,  
    },
    discountPercentage:{
        type:Number,
        required:true,              
    },
    quantity:{
        type:Number,
        required:true,  
    },
    color:{
        type:String,
        required:true,  
    },
    images:{
        type:[String], 
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },  
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seller",
        required:true
    },
    size:{
        type:String,
        required:true,
    }

})

const Product = mongoose.model("Product",productSchema);

module.exports = Product;