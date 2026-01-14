const ProductService = require('../service/ProductService');

class SellerProductController {

   
    async getProductsBySellerId(req, res) {
        try {
            const seller = req.seller;
            const products = await ProductService.getProductsBySellerId(seller._id);
            return res.status(200).json({ products });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    
    async createProduct(req, res) {
        try {
            const seller = req.seller;
            const product = await ProductService.createProduct(req.body, seller);
            return res.status(201).json({
                message: "Product created successfully",
                product
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

   
    async deleteProduct(req, res) {
        try {
            const { productId } = req.params;
            const result = await ProductService.deleteProduct(productId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

   
    async updateProduct(req, res) {
        try {
            const { productId } = req.params;
            const updatedProduct = await ProductService.updateProduct(
                productId,
                req.body
            );
            return res.status(200).json({
                message: "Product updated successfully",
                updatedProduct
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

   
    async getProductById(req, res) {
        try {
            const { productId } = req.params;
            const product = await ProductService.getProductById(productId);
            return res.status(200).json({ product });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

 
    async searchProducts(req, res) {
        try {
            const { query } = req.query;
            const products = await ProductService.searchProducts(query);
            return res.status(200).json({ products });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getAllProducts(req, res) {
        try {
            const result = await ProductService.getAllProducts(req);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new SellerProductController();
