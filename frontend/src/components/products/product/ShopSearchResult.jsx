import { Search, X } from "lucide-react";

/** Badge hiển thị từ khóa đang tìm kiếm */
export const ShopSearchResult = ({ searchQuery, onClearSearch }) => {
  if (!searchQuery) return null;

  return (
    <div className="max-w-7xl mx-auto px-8 mb-8">
      <div className="inline-flex items-center gap-3 bg-stone-100 dark:bg-stone-900 text-[#6e5b4d] dark:text-[#cfa47e] px-4 py-2.5 rounded border border-stone-200 dark:border-stone-800">
        <Search className="w-4 h-4" />
        <span className="text-sm font-medium">
          Kết quả tìm kiếm cho: <strong>"{searchQuery}"</strong>
        </span>
        <button
          onClick={onClearSearch}
          className="text-[#6e5b4d] dark:text-[#cfa47e] hover:text-red-500 font-bold ml-2 p-0.5 transition-colors"
          title="Xóa tìm kiếm"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
