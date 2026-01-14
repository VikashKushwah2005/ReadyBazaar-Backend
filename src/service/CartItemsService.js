const CartItems = require('../modal/CartItems');

class CartItemsService {

    async removeCartItem(userId, cartItemId) {

        const cartItem = await this.findCartItemById(cartItemId);

        if (!cartItem) {
            throw new Error("Cart item not found");
        }

        if (cartItem.userId.toString() !== userId.toString()) {
            throw new Error("Unauthorized action");
        }

        await CartItems.deleteOne({ _id: cartItemId });

        return { message: "Cart item removed successfully" };
    }

    async findCartItemById(cartItemId) {
        return await CartItems.findById(cartItemId)
            .populate('product');
    }

    async updateCartItem(userId, cartItemId, cartItemData) {

        const cartItem = await CartItems.findById(cartItemId)
            .populate('product');

        if (!cartItem) {
            throw new Error("Cart item not found");
        }

        if (cartItem.userId.toString() !== userId.toString()) {
            throw new Error("Unauthorized action");
        }

        if (cartItemData.quantity <= 0) {
            throw new Error("Quantity must be greater than zero");
        }

        const updated = {
            quantity: cartItemData.quantity,
            mrpPrice: cartItem.product.mrpPrice * cartItemData.quantity,
            sellingPrice: cartItem.product.sellingPrice * cartItemData.quantity
        };

        return await CartItems.findByIdAndUpdate(
            cartItemId,
            updated,
            { new: true }
        ).populate('product');
    }
}

module.exports = new CartItemsService();
