const TransactionService = require("../service/TransactionService");
class TransactionController {

    async getTransactionByseller(req,res){
        try{
            const seller = await req.user;
            const transactions = await TransactionService.getTransactionsBySellerId(seller._id);
            return res.status(200).json({transactions});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }
}

module.exports = new TransactionController();