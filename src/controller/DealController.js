const DealService = require('../service/DealService');

class DealController {

    async getAllDeals(req, res) {
        try{
          
           const deals = await DealService.getDeals(deal);
           return res.status(200).json(deals);
        }catch(error){
            return res.status(500).json({ error: error.message });
        }
    }
    async createDeal(req, res) {
        try{
            const dealData = req.body;
            const newDeal = await DealService.createDeals(dealData);
            return res.status(201).json(newDeal);
        }catch(error){
            return res.status(500).json({ error: error.message });
        }
    }
    async updateDeal(req, res) {
        const {id} = req.params;
        const dealData = req.body;
        try{
            const updatedDeal = await DealService.updateDeal(dealData,id);
            return res.status(200).json(updatedDeal);
        }catch(error){
            return res.status(500).json({ error: error.message });
        }
    }
    async deleteDeal(req, res) {
        const {id} = req.params;
        try{
            await DealService.deleteDeal(id);
            return res.status(200).json({ message: 'Deal deleted successfully' });
        }catch(error){
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new DealController();