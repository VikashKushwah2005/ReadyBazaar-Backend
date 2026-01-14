const { errorMonitor } = require('nodemailer/lib/xoauth2/index.js');
const Cart = require('../modal/Cart.js');
const CartItems = require('../modal/CartItems.js');
const { calculateDiscountPercentage } = require('../util/Discount.js');

class CartService {


    async findUserCart(user){
        let cart = await Cart.findOne({user:user._id});
        if(!cart){
             throw new Error("Cart not found for the user");
        }
        let totalPrice = 0;
        let totalSellingPrice = 0;
        let totalItems = cart.cartItems.length;

        cart.cartItems.forEach(items => {
            totalPrice += items.mrpPrice ;;
            totalSellingPrice += items.sellingPrice  ;
        });

        cart.totalMrpPrice = totalPrice;
        cart.totalSellingPrice = totalSellingPrice;
        cart.totalItems = totalItems;
        cart.discount = calculateDiscountPercentage(
            totalPrice, 
            totalSellingPrice
        
        );

        let cartItems = await CartItems.find({cart:cart._id}).populate('product');
        cart.cartItems = cartItems;
        return cart;
    }
  
    async addCartItems(user, product, quantity, size){
        let cart = await this.findUserCart(user); 

        let isPresent = await CartItems.findOne({
            cart:cart._id,
            product:product._id,
            size:size
        }).populate('product');

        if(!isPresent){
            const cartItem = new CartItems({
               product,
               quantity,
               userId:user._id,
               sellingPrice:product.sellingPrice * quantity,
               mrpPrice:product.mrpPrice * quantity,
               size,
               cart:cart._id
            });
            return await cartItem.save();
            
        }
        return isPresent;
    }
}

module.exports = new CartService();