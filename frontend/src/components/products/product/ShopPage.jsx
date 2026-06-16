import { useState, useEffect, useMemo, use } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { wishlistService } from "../../../services/wishlistService";
import { ITEMS_PER_PAGE } from "./shopConstants";
import { applyFiltersAndSort } from "./shopUtils";
import { ShopHeader } from "./ShopHeader";
import { ShopFilterBar } from "./ShopFilterBar";
import { ShopProductGrid } from "./ShopProductGrid";
import { ShopPagination } from "./ShopPagination";
import { ShopSearchResult } from "./ShopSearchResult";
import { categoryService } from "../../../services/categoryService";

/** Trang shop — điều phối logic + ghép các component con */
export const ShopPage = ({ products, loading, error, searchQuery }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [favoritedIds, setFavoritedIds] = useState(new Set());

  const [categories, setCategories] = useState([]); // state lưu danh sách danh mục lấy từ API
  const [category, setCategory] = useState(""); // filter theo category_id
  const [loaiTram, setLoaiTram] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Khi component mount, lấy danh sách danh mục từ API để hiển thị trong filter
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getAllCategories();
        if (res.success && res.data) {
          setCategories([
            { value: "", label: "Tất cả danh mục" },
            ...res.data.map((cat) => ({
              value: cat.id.toString(),
              label: cat.name,
            })),
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Kiểm tra xem có filter nào đang được áp dụng hay không để hiển thị nút "Xóa bộ lọc"
  const hasActiveFilter =
    category !== "" ||
    loaiTram !== "" ||
    priceRange !== "" ||
    sortBy !== "default";

  // Khi sản phẩm hoặc filter thay đổi, reset về trang 1 để tránh lỗi trang không tồn tại
  useEffect(() => {
    setCurrentPage(1);
  }, [products, category, loaiTram, priceRange, sortBy]);

  // Khi component mount hoặc khi trạng thái đăng nhập thay đổi, lấy wishlist của người dùng
  useEffect(() => {
    const fetchWishlist = async () => {
      if (isLoggedIn) {
        try {
          const res = await wishlistService.getWishlist();
          if (res.success && res.data) {
            setFavoritedIds(new Set(res.data.map((item) => item.product_id)));
          }
        } catch (err) {
          console.error("Failed to fetch wishlist:", err);
        }
      } else {
        setFavoritedIds(new Set());
      }
    };
    fetchWishlist();
  }, [isLoggedIn]);

  // Xử lý thêm/xóa sản phẩm vào wishlist
  const handleToggleWishlist = async (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    const isFav = favoritedIds.has(productId);
    try {
      if (isFav) {
        const res = await wishlistService.removeFromWishlist(productId);
        if (res.success) {
          setFavoritedIds((prev) => {
            const next = new Set(prev);
            next.delete(productId);
            return next;
          });
        }
      } else {
        const res = await wishlistService.addToWishlist(productId);
        if (res.success) {
          setFavoritedIds((prev) => new Set([...prev, productId]));
        }
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  // Cập nhật URL khi tìm kiếm để có thể chia sẻ hoặc lưu lại kết quả
  const handleSearchSubmit = (keyword) => {
    if (keyword.trim()) {
      setSearchParams({ search: keyword.trim() });
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  // Đặt lại tất cả filter về mặc định
  const handleResetFilters = () => {
    setCategory("");
    setLoaiTram("");
    setPriceRange("");
    setSortBy("default");
  };

  // Khi đổi trang,set currentpage và cuộn lên vị trí của filter bar để người dùng dễ thấy
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const filterSection = document.getElementById("shop-filter-section");
    if (filterSection) {
      filterSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  // Tính toán lại danh sách sản phẩm sau khi áp dụng filter và sort
  const filteredProducts = useMemo(
    () =>
      applyFiltersAndSort(products, {
        category,
        loaiTram,
        priceRange,
        sortBy,
      }),
    [products, category, loaiTram, priceRange, sortBy],
  );

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  // Lấy ra sản phẩm của trang hiện tại
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <main className="pt-24">
      <ShopHeader />

      <div id="shop-filter-section">
        <ShopFilterBar
          productCount={filteredProducts.length}
          totalCount={products.length}
          searchQuery={searchQuery}
          onSearchSubmit={handleSearchSubmit}
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
          loaiTram={loaiTram}
          onLoaiTramChange={setLoaiTram}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          sortBy={sortBy}
          onSortChange={setSortBy}
          hasActiveFilter={hasActiveFilter}
          onResetFilters={handleResetFilters}
        />
      </div>

      <ShopSearchResult
        searchQuery={searchQuery}
        onClearSearch={() => handleSearchSubmit("")}
      />

      <ShopProductGrid
        products={currentProducts}
        loading={loading}
        error={error}
        favoritedIds={favoritedIds}
        onToggleWishlist={handleToggleWishlist}
      />

      <ShopPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
};
