export const formatPrice = (price) => {
  const numberPrice = Number(price);
  if (Number.isNaN(numberPrice)) return price;
  return `${numberPrice.toLocaleString("vi-VN")} VND`;
};

/** Lọc + sắp xếp sản phẩm trên client (search đã xử lý ở ProductsPage qua API) */
export function applyFiltersAndSort(
  products,
  { category, loaiTram, priceRange, sortBy },
) {
  let result = [...products];

  if (category) {
    result = result.filter((p) => String(p.category_id) === category);
  }

  if (loaiTram) {
    result = result.filter((p) => p.loai_tram === loaiTram);
  }

  if (priceRange === "under1m") {
    result = result.filter((p) => Number(p.price) < 1_000_000);
  } else if (priceRange === "1m-5m") {
    result = result.filter(
      (p) => Number(p.price) >= 1_000_000 && Number(p.price) <= 5_000_000,
    );
  } else if (priceRange === "over5m") {
    result = result.filter((p) => Number(p.price) > 5_000_000);
  }

  if (sortBy === "price_asc") {
    result.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortBy === "price_desc") {
    result.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sortBy === "newest") {
    result.sort((a, b) => Number(b.id) - Number(a.id));
  }

  return result;
}
