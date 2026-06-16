import { ChevronLeft, ChevronRight } from "lucide-react";

/** Phân trang — ẩn nếu chỉ có 1 trang */
export const ShopPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <section className="max-w-7xl mx-auto px-8 mb-20 flex flex-col items-center">
      <div className="w-full h-px bg-outline-variant/10 mb-8" />
      <nav
        aria-label="Phân trang sản phẩm"
        className="flex items-center justify-center space-x-2"
      >
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors duration-200 disabled:opacity-30 disabled:hover:text-on-surface-variant"
        >
          <ChevronLeft strokeWidth={1} size={24} />
        </button>
        <div className="flex items-center space-x-1">
          {Array.from({ length: totalPages }, (_, idx) => {
            const pageNum = idx + 1;
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-10 h-10 flex items-center justify-center text-sm font-label font-medium rounded-sm transition-all ${
                  isActive
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        <button
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors duration-200 disabled:opacity-30 disabled:hover:text-on-surface-variant"
        >
          <ChevronRight strokeWidth={1} size={24} />
        </button>
      </nav>
    </section>
  );
};
