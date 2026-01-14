const SellerReport = require('../modal/SellerReport');

class SellerReportService {
    
    async getSellerReport(seller){
        try{
            let sellerReport = await SellerReport.findOne({seller:seller._id});
            if(!sellerReport){
                sellerReport = new SellerReport({
                    seller:seller._id,
                    totalOrders:0,
                    totalEarnings:0,
                    totalSales:0,
                });
               sellerReport = await sellerReport.save();
            }
            return sellerReport;
        }catch(error){
            throw new Error(`Error in fetching seller report: ${error.message}`);
        }
    }

    async updateSellerReport(sellerReport){
        try{
            return await SellerReport.findByIdAndUpdate(
                sellerReport._id, 
                sellerReport,
                 {new:true}
            );
        }catch(error){
            throw new Error(`Error in updating seller report: ${error.message}`);
        }
    }
}

module.exports = new SellerReportService();