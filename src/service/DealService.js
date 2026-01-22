const Deal = require("../modal/Deal");
const HomeCategory = require("../modal/HomeCategory");

class DealService {

    async getDeals(){
        return await Deal.find().populate('category');
    }
    async createDeals(dealData){
        try{
          const categroy = await HomeCategory.findById(dealData.category._id);
          const newDeal = new Deal({
            ...dealData,
            category: categroy
          });
          const savedDeal = await newDeal.save();
          return await Deal.findById(savedDeal._id).populate('category');
        }catch(err){
            throw new Error('Error creating deal: ' + err.message);
        }
    }
    async updateDeal(deal,id){
        const existingDeal = await Deal.findById(id).populate('category');
        if(!existingDeal){
            throw new Error('Deal not found');
        }
        return await Deal.findByIdAndUpdate(
            existingDeal._id,
            {discount: deal.discount},
            {new: true}
        )
    }

    async deleteDeal(id){
        const deal = await Deal.findById(id);
        if(!deal){
            throw new Error('Deal not found');
        }
        await Deal.deleteOne({_id: id});
    }
}

module.exports = new DealService();