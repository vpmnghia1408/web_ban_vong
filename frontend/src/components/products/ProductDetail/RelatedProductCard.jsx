import { Link } from "react-router-dom";
import { formatPrice } from "./shopUtils";
export const RelatedProductCard = ({ product, isOffset }) => (
  <Link
    to={`/products/${product.id}`}
    className={`group cursor-pointer block ${isOffset ? "pt-12 md:pt-0" : ""}`}
  >
    <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-surface-container-high">
      {product.image_url ? (
        <img
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={product.image_url}
        />
      ) : (
        <div className="h-full w-full bg-surface-container-high" />
      )}
    </div>
    <div className="flex justify-between items-start gap-4 px-2">
      <div>
        <h3 className="font-headline font-bold text-on-background line-clamp-2">
          {product.name}
        </h3>
        <p className="text-on-surface-variant text-sm mt-1 line-clamp-1">
          {product.description || "Trầm hương tự nhiên"}
        </p>
      </div>
      <p className="font-bold text-primary whitespace-nowrap">
        {formatPrice(product.price)}
      </p>
    </div>
  </Link>
);
