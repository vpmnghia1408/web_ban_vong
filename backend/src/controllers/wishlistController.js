import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

// Lấy danh sách sản phẩm yêu thích của người dùng
export const getWishlist = async (req, res) => {
  const userId = req.userId;
  try {
    const items = await Wishlist.getByUserId(userId);
    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Thêm sản phẩm vào danh sách yêu thích
export const addToWishlist = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "Product ID is required",
    });
  }

  try {
    // Kiểm tra sản phẩm có tồn tại không
    const product = await Product.getById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Wishlist.add(userId, productId);
    res.json({
      success: true,
      message: "Product added to wishlist successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Xóa sản phẩm khỏi danh sách yêu thích
export const removeFromWishlist = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.params;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "Product ID is required",
    });
  }

  try {
    await Wishlist.remove(userId, productId);
    res.json({
      success: true,
      message: "Product removed from wishlist successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
