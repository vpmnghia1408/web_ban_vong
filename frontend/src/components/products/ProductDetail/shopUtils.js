// Định dạng giá thành theo chuẩn Việt Nam
export const formatPrice = (price) => {
  const numberPrice = Number(price);

  if (Number.isNaN(numberPrice)) {
    return price;
  }

  return `${numberPrice.toLocaleString("vi-VN")} VND`;
};
