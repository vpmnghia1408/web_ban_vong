import { Link } from "react-router-dom";
export const ProductCard = ({
  name,
  description,
  price,
  originalPrice,
  discount,
  image,
}) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[2/3] mb-3 overflow-hidden bg-surface-variant rounded-lg">
        {image ? (
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt={name}
            src={image}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="h-full w-full bg-surface-container-high" />
        )}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-primary text-on-primary px-2 py-0.5 text-[9px] font-bold tracking-tighter uppercase rounded-sm">
            Tiết kiệm {discount}%
          </div>
        )}
      </div>
      <div className="flex justify-between items-start gap-1">
        <div>
          <h3 className="text-sm font-semibold mb-0.5 line-clamp-2">{name}</h3>
          <p className="text-on-surface-variant text-[11px] line-clamp-1">
            {description}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="block font-bold text-sm text-primary">
            {Number(price).toLocaleString("vi-VN")} VND
          </span>
          {originalPrice && (
            <span className="block text-[10px] text-outline-variant line-through">
              {Number(originalPrice).toLocaleString("vi-VN")} VND
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const LimitedRelease = ({ products = [], isLoading, error }) => {
  const featuredProducts = products.slice(0, 3).map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    originalPrice: null,
    discount: 0,
    image: product.image_url,
  }));

  return (
    <section className="bg-surface-container-low py-16">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Vòng tay bán chạy
            </h2>
            <p className="text-on-surface-variant max-w-sm text-sm">
              Những mẫu vòng tay trầm hương phong thủy được khách hàng chọn nhiều
              và yêu thích nhất trong tuần này.
            </p>
          </div>

          {/* Countdown */}
          <div className="flex gap-4">
            {[
              { value: "100%", label: "Tự nhiên" },
              { value: "04", label: "Danh mục" },
              { value: "Vĩnh viễn", label: "Bảo hành mùi" },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center p-3 bg-background rounded-lg min-w-[70px] shadow-sm"
              >
                <span className="block text-2xl font-bold text-primary">
                  {item.value}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-on-surface-variant">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {isLoading &&
            [1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="aspect-[2/3] mb-3 rounded-lg bg-surface-container-high" />
                <div className="h-4 w-2/3 rounded bg-surface-container-high mb-2" />
                <div className="h-3 w-1/2 rounded bg-surface-container-high" />
              </div>
            ))}

          {!isLoading && error && (
            <div className="col-span-full rounded-lg bg-background p-8 text-center text-sm text-on-surface-variant">
              {error}
            </div>
          )}

          {!isLoading && !error && featuredProducts.length === 0 && (
            <div className="col-span-full rounded-lg bg-background p-8 text-center text-sm text-on-surface-variant">
              Chưa có sản phẩm nào để hiển thị.
            </div>
          )}

          {!isLoading &&
            !error &&
            featuredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <ProductCard {...product} />
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};
