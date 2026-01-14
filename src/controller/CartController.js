const ProductService = require('../service/ProductService.js');
const CartItemsService = require('../service/CartItemsService.js');
const CartService = require('../service/CartService.js');
class CartController {


    async findUserCartHandler(req, res){
        try{
            const user = req.user;
            const cart = await CartService.findUserCart(user);
            return res.status(200).json(cart);
        }catch(error){
            return res.status(508).json({message:error.message});
        }
    }
    
    async addItemsToCartHandler(req, res){
        try{
            const user =  req.user;
            const product = await ProductService.getProductById(req.body.productId);
            const cartItem = await CartService.addCartItems(
                user, 
                product,
                req.body.quantity, 
                req.body.size
            );
            return res.status(200).json(cartItem);
        }catch(error){
            return res.status(500).json({message:error.message});
        }
    }

    async deleteCartItemHandler(req, res){
        try{
            const user =  req.user; 
            await CartItemsService.removeCartItem(
                user._id,
                req.params.cartItemId
            );
            return res.status(200).json({message:"Item removed from cart successfully"});   

        }catch(error){
            return res.status(500).json({message:error.message});
        }   
    }

    async updateCartItemHandler(req, res){
        try{
          const cartItemId = req.params.cartItemId;
          const { quantity} = req.body;
          let updatedCartItem;
          if(quantity > 0){
             updatedCartItem = await CartItemsService.updateCartItem(
                req.user._id,
                cartItemId,
                {quantity}
             );
             return  res.status(200).json(updatedCartItem);     
          }
        }catch(error){
            return res.status(500).json({message:error.message});
        }   
    }
}

module.exports = new CartController();