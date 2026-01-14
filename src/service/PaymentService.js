
const PaymentOrder = require('../modal/PaymentOrder');
 const razorpay = require('../config/RazorpayClient');
 const { PaymentOrderStatus } = require('../domain/PaymentStatus');
 const Order = require('../modal/Order');
const { OrderStatus } = require('../domain/OrderStatus');

class PaymentService{

    async createOrderPayment(user,orders){
        const amount = orders.reduce((total, order) => total + order.totalSellingPrice, 0);

        const paymentOrder = new PaymentOrder({
            amount,
            user: user._id,
            orders: orders.map(order => order._id),
        });

        return await paymentOrder.save();
    }

    async getPaymentOrderByOrderId(orderId){
        const paymentOrder = await PaymentOrder.findOne({orders:orderId});
        if(!paymentOrder){
            throw new Error('Payment order not found');
        }
        return paymentOrder;
    }
    async getPaymentOrdersByPaymentLinkId(paymentLinkId){
        const paymentOrder = await PaymentOrder.find({paymentLinkId:paymentLinkId});
        if(!paymentOrder){
            throw new Error('Payment order not found');
        }
        return paymentOrder;
    }
    async proceedPaymentOrder(paymentOrder,paymentId,paymentLinkId){
        if(paymentOrder.status === PaymentOrderStatus.PENDING){
            const payment = await razorpay.payments.fetch(paymentId);

            if(payment.status === 'captured'){
                
                await Promise.all(paymentOrder.orders.map(async(orderId) => {
                    const order = await Order.findById(orderId);
                    order.paymentStatus = PaymentOrderStatus.COMPLETED;
                    order.orderStatus = OrderStatus.PLACED;
                    await order.save();
                }));
                paymentOrder.status = PaymentOrderStatus.SUCCESS;
                await paymentOrder.save();
                return true;
            }else{
               paymentOrder.status = PaymentOrderStatus.FAILED;
               await paymentOrder.save();
               return false;

            }
        }
        return false;
    }
    async createRazorpayPaymentLink(user,amount,orderId){
         try{
            const paymentLinkRequest = {
                amount: amount * 100, // Amount in paise
                currency: 'INR',
                customer:{
                    name: user.fullName,
                    email: user.email,
                },
                notify:{
                    email:true,
                },
                callback_url: `https://localhost:3000/payment-success/${orderId}`,
                callback_method: 'get'
            
            }
           
            const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
            return paymentLink; 
         }catch(error){
            throw new Error('Error creating Razorpay payment link: ' + error.message);
         }
    }
}
module.exports = new PaymentService();