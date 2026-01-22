
class HomeCategoryService {
    async createHomeCategories(req,res){
        try{
           const homeCategories = req.body;
           const newCategory = await HomeCategoryService.createCategories(homeCategories);
           return res.status(201).json(newCategory);
        }catch(error){
            return res.status(500).json({ error: error.message });
        }
    }

    async getHomeCategory(req,res){
        try{
              const categories = await HomeCategoryService.getAllHomeCategories();
              return res.status(200).json(categories);
        }catch(error){
            return res.status(500).json({ error: error.message });
        }
    }
    async updateHomeCategory(req,res){
        try{
            const {id} = req.params;
            const categoryData = req.body;
            const updatedCategory = await HomeCategoryService.updateHomeCategory(categoryData,id);
            return res.status(200).json(updatedCategory);
        }catch(error){
            return res.status(500).json({ error: error.message });
        }
    }
}
module.exports = new HomeCategoryService();