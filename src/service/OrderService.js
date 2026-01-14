const User = require("../modal/User");
const Address = require("../modal/Address");
const Order = require("../modal/Order");
const OrderItem = require("../modal/OrderItem");
const { default: mongoose } = require("mongoose");
const {OrderStatus} = require("../domain/OrderStatus");

class OrderService {

    async createOrder(user,shippingAddress,cart) {
          if(shippingAddress._id&&
            !user.address.includes(shippingAddress._id)){
             user.address.push(shippingAddress._id);
             await User.findByIdAndUpdate(user._id,user);
          }

          if(!shippingAddress._id){
              shippingAddress = await Address.create(shippingAddress);
              user.address.push(shippingAddress._id);
              await User.findByIdAndUpdate(user._id,user);
          }
          const itemsBySeller = cart.cartItems.reduce((acc,item)=>{
              const sellerId = item.product.seller.toString();  
              acc[sellerId] = acc[sellerId] || [];
              acc[sellerId].push(item);
              return acc;
          },{})

          const orders = new Set();
          for(const [sellerId,cartItems] of Object.entries(itemsBySeller)){
              const totalOrderPrice  = cartItems.reduce((sum,item)=>
                   sum+item.sellingPrice,0)
              const totalItem = cartItems.length;
          
          const newOrder = new Order({
                user:user._id,
                seller:sellerId,
                shippingAddress:shippingAddress._id,
                orderItems:[],
                totalMrpPrice:totalOrderPrice,
                totalSellingPrice:totalOrderPrice,
                totalItems:totalItem,
          })

          const orderItems = await Promise.all(cartItems.map(async(cartItem)=>{
              const orderItem = new OrderItem({
                  product:cartItem.product._id,
                  quantity:cartItem.quantity,
                  size:cartItem.size,
                  mrpPrice:cartItem.mrpPrice,
                  sellingPrice:cartItem.sellingPrice,
                  userId: cartItem.userId
              });
              await orderItem.save();
              newOrder.orderItems.push(orderItem._id);
    
          }));
    
          await newOrder.save();
          orders.add(newOrder);
           
        }
        return Array.from(orders);
    }

    async findOrderById(orderId){
         
        if(!mongoose.Types.ObjectId.isValid(orderId)){
            throw new Error('Invalid order ID');
        }
        const order = await Order.findById(orderId).populate([
            {path:"seller"},
            {path:"orderItems",populate:{path:"product"}},
            {path:"shippingAddress"}
        ])
        if(!order){
            throw new Error('Order not found');
        }
        return order;
    }
    
    async userOrdersHistory(userId){
          if(!mongoose.Types.ObjectId.isValid(userId)){
            throw new Error('Invalid user ID');
        }
         return await Order.find({user:userId}
         ).populate([
            {path:"seller"},
            {path:"orderItems",populate:{path:"product"}},
            {path:"shippingAddress"}
        ]);

    }

    async sellerOrdersHistory(sellerId){
         return await Order.find({seller:sellerId}
         ).sort({orderDate:-1}).populate([
            {path:"seller"},
            {path:"orderItems",populate:{path:"product"}},
            {path:"shippingAddress"}
        ]);
    }
       
    
    async updateOrderStatus(orderId,status){
       
        const order = await this.findOrderById(orderId);
        order.status = status;
        return await Order.findByIdAndUpdate(orderId,
            order,
            {new:true}
        ).populate([
            {path:"seller"},
            {path:"orderItems",populate:{path:"product"}},
            {path:"shippingAddress"}
        ]);
    }
    
    
    async cancelOrder(orderId,user){
        const order = await this.findOrderById(orderId);

        if(user._id.toString()!==order.user.toString()){
            throw new Error('Unauthorized to cancel this order');
        }
        order.status = OrderStatus.CANCELLED;
        return await Order.findByIdAndUpdate(orderId,
            order,
            {new:true}
        ).populate([
            {path:"seller"},
            {path:"orderItems",populate:{path:"product"}},
            {path:"shippingAddress"}
        ]);
    }

    async findOrderItemById(orderItemId){
        if(!mongoose.Types.ObjectId.isValid(orderItemId)){
            throw new Error('Invalid order item ID');
        }
        const orderItem = await OrderItem.findById(orderItemId).populate("product");
        if(!orderItem){
            throw new Error('Order item not found');
        }
        return orderItem;
    }

}

module.exports = new OrderService();