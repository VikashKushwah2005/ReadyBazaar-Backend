const CartService = require("../service/CartService");
const OrderService = require("../service/OrderService");

class OrderController {

    async createOrder(req,res){
        const {shippingAddress} = req.body;
        const {paymentMethod} = req.query;
        try{
            const user = req.user;
            const cart = await CartService.findUserCart(user);
            const orders = await OrderService.createOrder(user,shippingAddress,cart);
            res.status(201).json({orders});
        }catch(error){
            res.status(500).json({error:error.message});
        }
    }
    async getOrderById(req,res){
        try{
            const {orderId} = req.params;
            const order = await OrderService.findOrderById(orderId);
            res.status(200).json(order);
        }catch(error){
            res.status(500).json({error:error.message});
        }
    }
    async getOrderItemById(req,res){
        try{
            const {orderItemId} = req.params;
            const orderItem = await OrderService.findOrderItemById(orderItemId);
            res.status(200).json(orderItem);
        }catch(error){
            res.status(500).json({error:error.message});
        }
    }
    async getUserOrderHistory(req,res){
        try{
            const user = req.user;
            const userOrdersHistory = await OrderService.userOrdersHistory(user._id);
            res.status(200).json(userOrdersHistory);
        }catch(error){
            res.status(500).json({error:error.message});
        }   
    }
    async getSellerOrderHistory(req,res){
        try{
            const seller = req.seller;
            const sellerOrdersHistory = await OrderService.sellerOrdersHistory(seller._id);
            res.status(200).json(sellerOrdersHistory);
        }catch(error){
            res.status(500).json({error:error.message});
        }   
    }
    async updateOrderStatus(req,res){
        try{
            const {orderId,status} = req.params;
           
            const updatedOrder = await OrderService.updateOrderStatus(orderId,status);
            res.status(200).json(updatedOrder);
        }catch(error){
            res.status(500).json({error:error.message});
        }
    }
    async cancelOrder(req,res){
        try{
            const {orderId} = req.params;
            const user = req.user;
            const cancelledOrder = await OrderService.cancelOrder(orderId,user);
            res.status(200).json(cancelledOrder);
        }catch(error){
            res.status(500).json({error:error.message});
        }
    }
}
    

module.exports = new OrderController();