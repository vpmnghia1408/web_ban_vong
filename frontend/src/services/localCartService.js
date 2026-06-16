const GUEST_CART_KEY = "guest_cart_items";

const readItems = () => {
  try {
    return JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");
  } catch {
    return [];
  }
};

const writeItems = (items) => {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
};

const toCartItem = (product, quantity) => ({
  id: `guest-${product.id}`,
  product_id: product.id,
  name: product.name,
  image_url: product.image_url,
  price: product.price,
  quantity,
});

export const localCartService = {
  getCart: () => readItems(),

  getCount: () =>
    readItems().reduce((sum, item) => sum + Number(item.quantity || 0), 0),

  addToCart: (product, quantity = 1) => {
    const items = readItems();
    const productId = product.id;
    const existingIndex = items.findIndex(
      (item) => Number(item.product_id) === Number(productId),
    );

    if (existingIndex >= 0) {
      items[existingIndex] = {
        ...items[existingIndex],
        quantity: Number(items[existingIndex].quantity) + Number(quantity),
      };
    } else {
      items.push(toCartItem(product, Number(quantity)));
    }

    writeItems(items);
    return items;
  },

  updateQuantity: (productId, quantity) => {
    const items = readItems().map((item) =>
      Number(item.product_id) === Number(productId)
        ? { ...item, quantity: Number(quantity) }
        : item,
    );
    writeItems(items);
    return items;
  },

  removeFromCart: (productId) => {
    const items = readItems().filter(
      (item) => Number(item.product_id) !== Number(productId),
    );
    writeItems(items);
    return items;
  },

  clearCart: () => {
    localStorage.removeItem(GUEST_CART_KEY);
    window.dispatchEvent(new Event("cart-updated"));
  },
};
