const Order = require("../modal/Order");

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
            
     }
}