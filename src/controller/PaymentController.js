const OrderService = require('../service/OrderService');
const SellerService = require('../service/SellerService');
const TransactionService = require('../service/TransactionService');    
const paymentService = require('../service/PaymentService');
const SellerReportService = require('../service/SellerReportService');


const paymentSuccessHandler = async (req, res) => {
    const {paymentId} = req.params;
    const {paymentLinkId} = req.query;
    try {
        const user = req.user;
        const paymentOrder = await paymentService.getPaymentOrdersByPaymentLinkId(
            paymentLinkId
        );
        const paymentSuccess = await paymentService.proceedPaymentOrder(
            paymentOrder,
            paymentId,
            paymentLinkId
        );
        if(paymentSuccess){
            for(let orderId of paymentOrder.orders){
                const order = await OrderService.findOrderById(orderId);

                await TransactionService.createTransaction(order);

                const seller = await SellerService.getSellerById(order.seller);
                const sellerReport = await SellerReportService.getSellerReport(seller);

                sellerReport.totalOrders+=1;
                sellerReport.totalEarnings+=order.totalSellingPrice;
                sellerReport.totalSales+=order.orderItems.length;
                await SellerReportService.updateSellerReport(sellerReport);
            }
           
            return res.status(200).json({message: 'Payment Successful'});

        } else {
            return res.status(400).json({message: 'Payment Failed'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});

    }
}
module.exports = {
    paymentSuccessHandler
}