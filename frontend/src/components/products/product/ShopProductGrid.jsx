import { Link } from "react-router-dom";
import { Heart, SlidersHorizontal } from "lucide-react";
import { formatPrice } from "./shopUtils";

const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-[3/4] bg-surface-container-low mb-6" />
    <div className="h-3 w-20 rounded bg-surface-container-low mb-3" />
    <div className="h-5 w-3/4 rounded bg-surface-container-low mb-2" />
    <div className="h-4 w-24 rounded bg-surface-container-low" />
  </div>
);

/** Lưới sản phẩm — chỉ hiển thị, không lọc (đã lọc ở ShopPage) */
export const ShopProductGrid = ({
  products,
  loading,
  error,
  favoritedIds = new Set(),
  onToggleWishlist,
}) => {
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-8 mb-20">
        <div className="grid grid-cols-4 gap-x-6 gap-y-10">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <ProductSkeleton key={item} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-8 mb-20">
        <div className="rounded-lg bg-surface-container-low p-10 text-center text-on-surface-variant">
          {error}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-8 mb-20">
        <div className="rounded-lg bg-surface-container-low p-12 text-center">
          <SlidersHorizontal
            size={40}
            className="mx-auto mb-4 text-on-surface-variant/40"
          />
          <p className="text-on-surface-variant font-medium">
            Không tìm thấy sản phẩm phù hợp.
          </p>
          <p className="text-on-surface-variant/60 text-sm mt-1">
            Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-8 mb-20">
      <div className="grid grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product, index) => (
          <Link
            to={`/products/${product.id}`}
            className="group relative"
            key={product.id}
          >
            <div className={`${index % 4 === 1 ? "mt-5" : ""}`}>
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low mb-3">
                {product.image_url ? (
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={product.name}
                    src={product.image_url}
                  />
                ) : (
                  <div className="h-full w-full bg-surface-container-high" />
                )}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-stone-900 text-white hover:bg-stone-800 py-2.5 px-6 text-[11px] font-bold tracking-widest uppercase shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap">
                  Xem nhanh
                </button>
                <button
                  onClick={(e) =>
                    onToggleWishlist && onToggleWishlist(product.id, e)
                  }
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur shadow-sm flex items-center justify-center transition-all duration-300 ${
                    favoritedIds.has(product.id)
                      ? "opacity-100 scale-105"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <Heart
                    className={`text-primary transition-colors ${
                      favoritedIds.has(product.id)
                        ? "fill-red-500 text-red-500"
                        : "hover:fill-primary"
                    }`}
                    size={18}
                  />
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] tracking-[0.2em] font-medium text-primary mb-2 block">
                    {product.loai_tram || "Trầm hương tự nhiên"}
                  </span>
                  <h3 className="text-sm font-headline font-bold tracking-tight text-on-background">
                    {product.name}
                  </h3>
                </div>
                <span className="text-xs font-medium text-on-surface whitespace-nowrap">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
