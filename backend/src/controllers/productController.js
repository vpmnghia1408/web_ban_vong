import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.getById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image_url, image_url_2, image_url_3, loai_tram, category_id, quantity } =
      req.body;

    if (
      !name ||
      !price ||
      !description ||
      !image_url ||
      !category_id ||
      !quantity
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await Product.create({
      name,
      price,
      description,
      image_url,
      image_url_2,
      image_url_3,
      loai_tram,
      category_id,
      quantity,
    });
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, image_url, image_url_2, image_url_3, loai_tram, category_id, quantity } =
      req.body;

    const existingProduct = await Product.getById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.update(id, {
      name,
      price,
      description,
      image_url,
      image_url_2,
      image_url_3,
      loai_tram,
      category_id,
      quantity,
    });
    res.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await Product.getById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.delete(id);
    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.query;
    console.log("=== BACKEND SEARCH REQUEST ===");
    console.log("Received keyword:", keyword);
    
    // Normalize Unicode keyword to NFC (precomposed) to match database collation (NFC)
    const normalizedKeyword = (keyword || "").normalize("NFC");
    console.log("Normalized keyword to NFC:", normalizedKeyword);

    const products = await Product.searchbyName(normalizedKeyword);
    console.log("Products found:", products.length);
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
