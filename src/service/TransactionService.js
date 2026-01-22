const Order = require("../modal/Order");
const Seller = require("../modal/Seller");
const Transaction = require("../modal/Transaction");
class TransactionService{

     async createTransaction(orderId){
        
         const order = await Order.findById(orderId).populate('seller');
            if(!order){
                throw new Error("Order not found");
            }
            const seller = await Seller.findById(order.seller._id);
            if(!seller){
                throw new Error("Seller not found");
            }
            const transaction = new Transaction({
                seller: seller._id,
                customer: order.user,
                order: order._id,
              
            });
           return await transaction.save();
     }

     async getTransactionsBySellerId(sellerId){
        return await Transaction.find({seller:sellerId}).populate('order');
     }
     async getAllTrabsactions(){
        return await Transaction.find().populate('order').populate('seller').populate('customer');
     }
}

module.exports = new TransactionService();