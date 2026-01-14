 const mongoose = require('mongoose');
const SellerReportSchema = new mongoose.Schema({
    seller:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:'Seller',
        required:true,
        unique:true
    },
    totalEarnings:{
        type:Number,
        default:0
    },
    totalSales:{
        type:Number,
        default:0
    },
    totalRefunds:{
        type:Number,
        default:0   
    },
    totalTax:{
        type:Number,
        default:0
    },
    netEarinings:{
        type:Number,
        default:0   
    },
    totalOrders:{
        type:Number,
        default:0
    },
    cancelledOrders:{
        type:Number,
        default:0
    },
    totalTransactions:{
        type:Number,
        default:0
    }
},{timestamps:true});

const SellerReport = mongoose.model('SellerReport',SellerReportSchema);
module.exports = SellerReport;