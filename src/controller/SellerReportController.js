const SellerReportService = require("../service/SellerReportService");

class SellerReportController {

    async getSellerReports(req, res) {
        try{
            const seller = req.user;
            const sellerReport = await SellerReportService.getSellerReport(seller._id);
            return res.status(200).json({sellerReport});
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }
}

module.exports = new SellerReportController();