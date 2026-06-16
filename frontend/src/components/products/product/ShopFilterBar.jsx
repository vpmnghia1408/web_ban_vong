import { useState, useEffect } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import {
  LOAI_TRAM,
  PRICE_RANGES,
  SORT_OPTIONS,
  ARROW_SVG,
  SELECT_CLS,
} from "./shopConstants";

/** Thanh lọc: danh mục, loại trầm, giá, tìm kiếm, sắp xếp */
export const ShopFilterBar = ({
  productCount,
  totalCount,
  searchQuery,
  onSearchSubmit,
  categories,
  category,
  onCategoryChange,
  loaiTram,
  onLoaiTramChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  hasActiveFilter,
  onResetFilters,
}) => {
  const [localVal, setLocalVal] = useState(searchQuery || "");

  useEffect(() => {
    setLocalVal(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(localVal);
  };

  const handleClear = () => {
    setLocalVal("");
    onSearchSubmit("");
  };

  return (
    <section className="sticky top-[72px] z-40 bg-surface/90 backdrop-blur-md mb-12">
      <div className="max-w-7xl mx-auto px-8 py-3 flex flex-row items-center justify-between gap-5 border-y border-outline-variant/15">
        <div className="flex items-center space-x-8 overflow-x-visible pb-0 flex-1">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-semibold">
              Danh mục
            </span>
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className={SELECT_CLS}
              style={{ backgroundImage: ARROW_SVG }}
            >
              {categories.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-semibold">
              Loại trầm hương
            </span>
            <select
              value={loaiTram}
              onChange={(e) => onLoaiTramChange(e.target.value)}
              className={SELECT_CLS}
              style={{ backgroundImage: ARROW_SVG }}
            >
              {LOAI_TRAM.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-semibold">
              Khoảng giá
            </span>
            <select
              value={priceRange}
              onChange={(e) => onPriceChange(e.target.value)}
              className={SELECT_CLS}
              style={{ backgroundImage: ARROW_SVG }}
            >
              {PRICE_RANGES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-1 w-60 border-l border-outline-variant/30 pl-6"
          >
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-semibold">
              Tìm kiếm
            </span>
            <div className="flex items-center gap-2 border-b border-transparent focus-within:border-[#6e5b4d] transition-all">
              <input
                type="text"
                placeholder="Nhập từ khóa & Enter..."
                value={localVal}
                onChange={(e) => setLocalVal(e.target.value)}
                className="bg-transparent border-none p-0 text-sm font-medium focus:ring-0 outline-none w-full placeholder:text-stone-400 placeholder:font-light"
              />
              {localVal && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-stone-400 hover:text-stone-700 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>

          {hasActiveFilter && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/70 transition-colors border-l border-outline-variant/30 pl-6 whitespace-nowrap"
            >
              <SlidersHorizontal size={14} />
              Bỏ lọc
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-on-surface-variant">
            {hasActiveFilter ? (
              <>
                <span className="text-primary font-bold">{productCount}</span>
                <span className="text-on-surface-variant/60">
                  {" "}
                  / {totalCount}
                </span>
                {" sản phẩm"}
              </>
            ) : (
              `Đang hiển thị ${productCount} sản phẩm`
            )}
          </span>
          <div className="h-4 w-px bg-outline-variant/30" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className={`${SELECT_CLS} font-semibold`}
            style={{ backgroundImage: ARROW_SVG }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};
