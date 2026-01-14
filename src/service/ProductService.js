const Category = require('../modal/Category');
const Product = require('../modal/Product');
const { calculateDiscountPercentage } = require('../util/Discount');


class ProductService {

   
    async createProduct(productData, seller) {

        const discountPercentage = calculateDiscountPercentage(
            productData.mrpPrice,
            productData.sellingPrice
        );

        const category1 = await this.createOrGetCategory(
            productData.category1,
            1
        );

        const category2 = await this.createOrGetCategory(
            productData.category2,
            2,
            category1._id
        );

        const category3 = await this.createOrGetCategory(
            productData.category3,
            3,
            category2._id
        );

        const product = new Product({
            title: productData.title,
            description: productData.description,
            images: productData.images,
            mrpPrice: productData.mrpPrice,
            sellingPrice: productData.sellingPrice,
            discountPercentage,
            quantity: productData.quantity, 
            seller: seller._id,
            category: category3._id,
            color: productData.color,
            size: productData.size
        });

        return await product.save();
    }

    async createOrGetCategory(categoryId, level, parentCategoryId = null) {
        let category = await Category.findOne({ categoryId:categoryId });

        if (!category) {
            category = new Category({
                categoryId,
                level,
                parentCategoryId
            });
            await category.save();
        }

        return category;
    }

 
    async deleteProduct(productId) {
        await Product.findByIdAndDelete(productId);
        return { message: "Product deleted successfully" };
    }

   
    async updateProduct(productId, updateData) {
        return await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true }
        );
    }

    async getProductById(productId) {
        const product = await Product.findById(productId);
        if (!product) throw new Error("Product not found");
        return product;
    }

   
    async searchProducts(query) {
        return await Product.find({
            title: new RegExp(query, 'i')
        });
    }

    
    async getProductsBySellerId(sellerId) {
        return await Product.find({ seller: sellerId });
    }

    
    async getAllProducts(req) {
        const filterQuery = {};

        if (req.query.category) {
            const category = await Category.findOne({ categoryId: req.query.category });
            if (!category) {
                return { content: [], totalPages: 0, totalElements: 0 };
            }
            filterQuery.category = category._id;
        }

        if (req.query.color) {
            filterQuery.color = req.query.color;
        }

        if (req.query.minPrice && req.query.maxPrice) {
            filterQuery.sellingPrice = {
                $gte: Number(req.query.minPrice),
                $lte: Number(req.query.maxPrice)
            };
        }

        if (req.query.minDiscount) {
            filterQuery.discountPercentage = {
                $gte: Number(req.query.minDiscount)
            };
        }

        if (req.query.size) {
            filterQuery.size = req.query.size;
        }

        let sortQuery = {};
        if (req.query.sort === "price_low") sortQuery.sellingPrice = 1;
        if (req.query.sort === "price_high") sortQuery.sellingPrice = -1;

        const pageNumber = Number(req.query.pageNumber) || 0;
        const pageSize = Number(req.query.pageSize) || 10;

        const products = await Product.find(filterQuery)
            .sort(sortQuery)
            .skip(pageNumber * pageSize)
            .limit(pageSize);

        const totalElements = await Product.countDocuments(filterQuery);

        return {
            content: products,
            totalPages: Math.ceil(totalElements / pageSize),
            totalElements
        };
    }
}

module.exports = new ProductService();
