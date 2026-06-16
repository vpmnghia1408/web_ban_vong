import React, { useEffect, useMemo, useState } from "react";
import { Edit2, Image, Plus, Search, Tags, Trash2, X } from "lucide-react";
import { categoryService } from "../../../services/categoryService.js";
import { productService } from "../../../services/productService.js";

const emptyForm = {
  name: "",
  description: "",
  image_url: "",
};

const CategoryForm = ({
  form,
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
    <div className="mb-5 flex items-center justify-between">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          {isEditing ? "Chỉnh sửa" : "Tạo mới"}
        </p>
        <h2 className="mt-1 text-xl font-bold text-on-background">
          {isEditing ? "Cập nhật danh mục" : "Thêm danh mục"}
        </h2>
      </div>
      {isEditing && (
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-2 text-on-surface-variant transition hover:bg-stone-100 hover:text-on-background"
        >
          <X size={18} />
        </button>
      )}
    </div>

    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
          Tên danh mục
        </label>
        <input
          value={form.name}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder="Ví dụ: Vòng trầm nam"
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
          Mô tả
        </label>
        <textarea
          value={form.description}
          onChange={(event) => onChange("description", event.target.value)}
          placeholder="Mô tả ngắn cho danh mục"
          rows={4}
          className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
          Link ảnh
        </label>
        <div className="relative">
          <Image
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            value={form.image_url}
            onChange={(event) => onChange("image_url", event.target.value)}
            placeholder="https://..."
            className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
          />
        </div>
      </div>

      {form.image_url && (
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
          <img
            src={form.image_url}
            alt={form.name || "Ảnh danh mục"}
            className="h-36 w-full object-cover"
          />
        </div>
      )}
    </div>

    <button
      type="submit"
      disabled={submitting}
      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-on-primary transition hover:opacity-90 disabled:opacity-60"
    >
      <Plus size={16} />
      {submitting
        ? "Đang lưu..."
        : isEditing
          ? "Lưu thay đổi"
          : "Thêm danh mục"}
    </button>
  </form>
);

export default function QlCategory() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const [categoryResponse, productResponse] = await Promise.all([
        categoryService.getAllCategories(),
        productService.getAll(),
      ]);
      setCategories(categoryResponse.data || []);
      setProducts(productResponse.data || []);
      setError("");
    } catch (err) {
      console.error("Error loading categories:", err);
      setError("Không thể tải danh mục.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const productCountByCategory = useMemo(() => {
    return products.reduce((acc, product) => {
      const categoryId = String(product.category_id || "");
      acc[categoryId] = (acc[categoryId] || 0) + 1;
      return acc;
    }, {});
  }, [products]);

  const filteredCategories = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return categories;
    return categories.filter((category) =>
      [category.name, category.description]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(keyword)),
    );
  }, [categories, searchQuery]);

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setForm({
      name: category.name || "",
      description: category.description || "",
      image_url: category.image_url || "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (editingId) {
        await categoryService.updateCategory(editingId, form);
      } else {
        await categoryService.createCategory(form);
      }
      resetForm();
      await fetchData();
    } catch (err) {
      console.error("Error saving category:", err);
      setError(err.response?.data?.message || "Không thể lưu danh mục.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (category) => {
    const productCount = productCountByCategory[String(category.id)] || 0;
    if (productCount > 0) {
      alert(
        "Danh mục này đang có sản phẩm, hãy chuyển sản phẩm trước khi xóa.",
      );
      return;
    }

    if (!window.confirm(`Bạn có chắc muốn xóa danh mục "${category.name}"?`)) {
      return;
    }

    try {
      await categoryService.deleteCategory(category.id);
      await fetchData();
      if (editingId === category.id) {
        resetForm();
      }
    } catch (err) {
      console.error("Error deleting category:", err);
      setError(err.response?.data?.message || "Không thể xóa danh mục.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
            Quản lý danh mục
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-on-background">
            Danh mục sản phẩm
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
            Tạo và sắp xếp nhóm sản phẩm để khách hàng dễ tìm đúng dòng vòng
            trầm phù hợp.
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
            placeholder="Tìm danh mục..."
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
          <div className="flex items-center justify-between border-b border-stone-200/70 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <Tags size={18} />
              </div>
              <div>
                <h2 className="font-bold text-on-background">
                  Danh sách danh mục
                </h2>
                <p className="text-xs text-on-surface-variant">
                  {filteredCategories.length} danh mục đang hiển thị
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-stone-100">
            {loading &&
              [1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 px-6 py-5">
                  <div className="h-16 w-16 rounded-xl bg-stone-100 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-48 rounded bg-stone-100 animate-pulse" />
                    <div className="h-3 w-72 rounded bg-stone-100 animate-pulse" />
                  </div>
                </div>
              ))}

            {!loading &&
              filteredCategories.map((category) => {
                const productCount =
                  productCountByCategory[String(category.id)] || 0;

                return (
                  <div
                    key={category.id}
                    className="flex items-center gap-5 px-6 py-5 transition hover:bg-stone-50"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                      {category.image_url ? (
                        <img
                          src={category.image_url}
                          alt={category.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-stone-400">
                          <Image size={20} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-on-background">
                        {category.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-on-surface-variant">
                        {category.description}
                      </p>
                    </div>

                    <div className="w-28 text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                        Sản phẩm
                      </p>
                      <p className="mt-1 font-bold text-primary">
                        {productCount}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="rounded-lg p-2 text-on-surface-variant transition hover:bg-primary/10 hover:text-primary"
                      >
                        <Edit2 size={17} />
                      </button>
                      <button
                        onClick={() => handleDelete(category)}
                        className="rounded-lg p-2 text-on-surface-variant transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                );
              })}

            {!loading && filteredCategories.length === 0 && (
              <div className="px-6 py-12 text-center text-sm text-on-surface-variant">
                Không tìm thấy danh mục phù hợp.
              </div>
            )}
          </div>
        </div>

        <aside className="col-span-4">
          <CategoryForm
            form={form}
            isEditing={Boolean(editingId)}
            submitting={submitting}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        </aside>
      </section>
    </div>
  );
}
