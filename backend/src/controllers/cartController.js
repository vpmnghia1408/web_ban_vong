import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getByUserId = async (req, res) => {
  const userId = req.userId;
  try {
    const cartItems = await Cart.getByUserId(userId);
    res.json({
      success: true,
      data: cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const usedId = req.userId;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }
    const product = await Product.getById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    if (quantity > product.quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.quantity} items available`,
      });
    }
    const cartItem = await Cart.getCartItem(usedId, productId);
    const currentQuantity = cartItem ? Number(cartItem.quantity) : 0;

    if (currentQuantity + Number(quantity) > product.quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.quantity} items available`,
      });
    }

    await Cart.addToCart(usedId, productId, quantity);
    res.json({
      success: true,
      message: "Product added to cart",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const userId = req.userId; // ← Từ authMiddleware
    const { productId } = req.params;
    const { quantity } = req.body;

    // Validation
    if (!quantity) {
      return res.status(400).json({
        success: false,
        message: "quantity is required",
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "quantity must be greater than 0",
      });
    }

    // ✅ Kiểm tra cart item tồn tại
    const cartItem = await Cart.getCartItem(userId, productId);
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    // ✅ Kiểm tra quantity có vượt quá stock không
    const product = await Product.getById(productId);
    if (quantity > product.quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.quantity} items available`,
      });
    }

    await Cart.updateQuantity(userId, productId, quantity);

    res.json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFromCart = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.params;
  try {
    const cartItem = await Cart.getCartItem(userId, productId);
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }
    await Cart.removeFromCart(userId, productId);
    res.json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const clearCart = async (req, res) => {
  const userId = req.userId;
  try {
    await Cart.clearCart(userId);
    res.json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCartTotal = async (req, res) => {
  const userId = req.userId;
  try {
    const cartTotal = await Cart.getCartTotal(userId);
    res.json({
      success: true,
      data: cartTotal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
