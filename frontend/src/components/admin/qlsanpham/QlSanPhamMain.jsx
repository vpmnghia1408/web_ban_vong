import React, { useEffect, useMemo, useState } from "react";
import { Edit2, Image, PackagePlus, Search, Trash2 } from "lucide-react";
import { productService } from "../../../services/productService.js";
import { categoryService } from "../../../services/categoryService.js";

const emptyForm = {
  name: "",
  price: "",
  description: "",
  image_url: "",
  image_url_2: "",
  image_url_3: "",
  loai_tram: "",
  category_id: "",
  quantity: "",
};

const formatPrice = (price) => {
  const numberPrice = Number(price);
  if (Number.isNaN(numberPrice)) return price;
  return `${numberPrice.toLocaleString("vi-VN")} VND`;
};

const ProductForm = ({
  form,
  categories,
  isEditing,
  submitting,
  onChange,
  onSubmit,
  onCancel,
}) => (
  <form
    onSubmit={onSubmit}
    className="rounded-2xl border border-stone-200/70 bg-white p-6 shadow-sm"
  >
    <div className="mb-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
        {isEditing ? "Chỉnh sửa" : "Tạo mới"}
      </p>
      <h2 className="mt-1 text-xl font-bold text-on-background">
        {isEditing ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
      </h2>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
          Tên sản phẩm
        </label>
        <input
          value={form.name}
          onChange={(event) => onChange("name", event.target.value)}
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
          Giá
        </label>
        <input
          type="number"
          min="0"
          value={form.price}
          onChange={(event) => onChange("price", event.target.value)}
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
          Tồn kho
        </label>
        <input
          type="number"
          min="0"
          value={form.quantity}
          onChange={(event) => onChange("quantity", event.target.value)}
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
          Danh mục
        </label>
        <select
          value={form.category_id}
          onChange={(event) => onChange("category_id", event.target.value)}
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
          required
        >
          <option value="">Chọn danh mục</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
          Loại trầm
        </label>
        <input
          value={form.loai_tram}
          onChange={(event) => onChange("loai_tram", event.target.value)}
          placeholder="Trầm tốc tự nhiên"
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
          required
        />
      </div>

      <div className="col-span-2">
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
          Mô tả
        </label>
        <textarea
          value={form.description}
          onChange={(event) => onChange("description", event.target.value)}
          rows={3}
          className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
          required
        />
      </div>

      {[
        ["image_url", "Ảnh chính"],
        ["image_url_2", "Ảnh phụ 1"],
        ["image_url_3", "Ảnh phụ 2"],
      ].map(([field, label]) => (
        <div className="col-span-2" key={field}>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
            {label}
          </label>
          <input
            value={form[field]}
            onChange={(event) => onChange(field, event.target.value)}
            placeholder="https://..."
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
            required={field === "image_url"}
          />
        </div>
      ))}
    </div>

    {(form.image_url || form.image_url_2 || form.image_url_3) && (
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[form.image_url, form.image_url_2, form.image_url_3].map(
          (image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-xl border border-stone-200 bg-stone-50"
            >
              {image ? (
                <img
                  src={image}
                  alt={`Ảnh ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-stone-300">
                  <Image size={20} />
                </div>
              )}
            </div>
          ),
        )}
      </div>
    )}

    <div className="mt-5 flex gap-3">
      {isEditing && (
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border border-stone-200 px-5 py-3 text-sm font-bold text-on-surface transition hover:bg-stone-50"
        >
          Hủy
        </button>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-on-primary transition hover:opacity-90 disabled:opacity-60"
      >
        <PackagePlus size={16} />
        {submitting ? "Đang lưu..." : isEditing ? "Lưu" : "Thêm"}
      </button>
    </div>
  </form>
);

export const QlSanPhamMain = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const [productResponse, categoryResponse] = await Promise.all([
        productService.getAll(),
        categoryService.getAllCategories(),
      ]);
      setProducts(productResponse.data || []);
      setCategories(categoryResponse.data || []);
      setError("");
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Không thể tải sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categoryNameById = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[String(category.id)] = category.name;
      return acc;
    }, {});
  }, [categories]);

  const filteredProducts = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return products;
    return products.filter((product) =>
      [
        product.name,
        product.loai_tram,
        categoryNameById[String(product.category_id)],
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(keyword)),
    );
  }, [products, searchQuery, categoryNameById]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      image_url: product.image_url || "",
      image_url_2: product.image_url_2 || "",
      image_url_3: product.image_url_3 || "",
      loai_tram: product.loai_tram || "",
      category_id: product.category_id || "",
      quantity: product.quantity || "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
      category_id: Number(form.category_id),
    };

    try {
      if (editingId) {
        await productService.update(editingId, payload);
      } else {
        await productService.create(payload);
      }
      resetForm();
      await fetchData();
    } catch (err) {
      console.error("Error saving product:", err);
      setError(err.response?.data?.message || "Không thể lưu sản phẩm.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Bạn có chắc muốn xóa sản phẩm "${product.name}"?`)) {
      return;
    }

    try {
      await productService.delete(product.id);
      await fetchData();
      if (editingId === product.id) resetForm();
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(err.response?.data?.message || "Không thể xóa sản phẩm.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
            Quản lý sản phẩm
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-on-background">
            Kho sản phẩm
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
            Quản lý tên, giá, tồn kho, danh mục và bộ 3 ảnh sản phẩm.
          </p>
        </div>
        <div className="relative w-80">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-[30%] text-stone-400"
          />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Tìm sản phẩm..."
            className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-8 rounded-2xl border border-stone-200/70 bg-white shadow-sm">
          <div className="border-b border-stone-200/70 px-6 py-5">
            <h2 className="font-bold text-on-background">Danh sách sản phẩm</h2>
            <p className="text-xs text-on-surface-variant">
              {filteredProducts.length} sản phẩm đang hiển thị
            </p>
          </div>
          <div className="divide-y divide-stone-100">
            {loading &&
              [1, 2, 3].map((item) => (
                <div key={item} className="px-6 py-5">
                  <div className="h-20 rounded-xl bg-stone-100 animate-pulse" />
                </div>
              ))}

            {!loading &&
              filteredProducts.map((product) => {
                const quantity = Number(product.quantity || 0);
                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-5 px-6 py-5 transition hover:bg-stone-50"
                  >
                    <div className="flex shrink-0 -space-x-3">
                      {[
                        product.image_url,
                        product.image_url_2,
                        product.image_url_3,
                      ]
                        .filter(Boolean)
                        .slice(0, 3)
                        .map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={product.name}
                            className="h-16 w-14 rounded-lg border-2 border-white object-cover shadow-sm"
                          />
                        ))}
                      {!product.image_url && (
                        <div className="flex h-16 w-14 items-center justify-center rounded-lg bg-stone-100 text-stone-400">
                          <Image size={18} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-on-background">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-on-surface-variant">
                        {categoryNameById[String(product.category_id)] ||
                          "Chưa có danh mục"}{" "}
                        · {product.loai_tram}
                      </p>
                    </div>

                    <div className="w-32 text-right">
                      <p className="font-bold text-primary">
                        {formatPrice(product.price)}
                      </p>
                      <p
                        className={`mt-1 text-xs font-semibold ${
                          quantity > 0 ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        Tồn kho: {quantity}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="rounded-lg p-2 text-on-surface-variant transition hover:bg-primary/10 hover:text-primary"
                      >
                        <Edit2 size={17} />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="rounded-lg p-2 text-on-surface-variant transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                );
              })}

            {!loading && filteredProducts.length === 0 && (
              <div className="px-6 py-12 text-center text-sm text-on-surface-variant">
                Không tìm thấy sản phẩm phù hợp.
              </div>
            )}
          </div>
        </div>

        <aside className="col-span-4">
          <ProductForm
            form={form}
            categories={categories}
            isEditing={Boolean(editingId)}
            submitting={submitting}
            onChange={(field, value) =>
              setForm((current) => ({ ...current, [field]: value }))
            }
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        </aside>
      </section>
    </div>
  );
};
