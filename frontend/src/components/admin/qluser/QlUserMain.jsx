import React, { useEffect, useMemo, useState } from "react";
import {
  Edit,
  Mail,
  Phone,
  Search,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { authService } from "../../../services/authService.js";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role_id: 1,
};

const UserForm = ({
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
    <div className="mb-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
        {isEditing ? "Chỉnh sửa" : "Tạo mới"}
      </p>
      <h2 className="mt-1 text-xl font-bold text-on-background">
        {isEditing ? "Cập nhật người dùng" : "Thêm người dùng"}
      </h2>
    </div>

    <div className="space-y-4">
      {[
        ["name", "Họ và tên", "Nguyễn Văn A", "text"],
        ["email", "Email", "email@example.com", "email"],
        ["phone", "Số điện thoại", "09XXXXXXXX", "tel"],
      ].map(([field, label, placeholder, type]) => (
        <div key={field}>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
            {label}
          </label>
          <input
            type={type}
            value={form[field]}
            onChange={(event) => onChange(field, event.target.value)}
            placeholder={placeholder}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
            required
          />
        </div>
      ))}

      {!isEditing && (
        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
            Mật khẩu
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(event) => onChange("password", event.target.value)}
            placeholder="Tối thiểu 6 ký tự"
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
            required
          />
        </div>
      )}

      <div>
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
          Vai trò
        </label>
        <select
          value={form.role_id}
          onChange={(event) => onChange("role_id", Number(event.target.value))}
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
        >
          <option value={1}>Người dùng</option>
          <option value={0}>Admin</option>
        </select>
      </div>
    </div>

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
        <UserPlus size={16} />
        {submitting ? "Đang lưu..." : isEditing ? "Lưu" : "Thêm"}
      </button>
    </div>
  </form>
);

export const QlUserMain = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // fetch user từ backend và lưu vào state users
  const fetchUsers = async () => {
    try {
      const response = await authService.getAllUsers();
      setUsers(response.data || []);
      setError("");
    } catch (err) {
      console.error("Error loading users:", err);
      setError("Không thể tải danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Lọc người dùng dựa trên searchQuery, tìm kiếm trong name, email và phone
  const filteredUsers = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return users;
    return users.filter((user) =>
      [user.name, user.email, user.phone]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(keyword)),
    );
  }, [users, searchQuery]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  // Khi nhấn nút chỉnh sửa, điền thông tin người dùng vào form và chuyển sang chế độ chỉnh sửa
  const handleEdit = (user) => {
    setEditingId(user.id);
    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      password: "",
      role_id: Number(user.role_id ?? 1),
    });
  };

  // Xử lý submit form, phân biệt giữa tạo mới và cập nhật dựa trên editingId
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (editingId) {
        await authService.updateUser(editingId, {
          name: form.name,
          email: form.email,
          phone: form.phone,
          role_id: Number(form.role_id),
        });
      } else {
        await authService.createUser(form);
      }
      resetForm();
      await fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err);
      setError(err.response?.data?.message || "Không thể lưu người dùng.");
    } finally {
      setSubmitting(false);
    }
  };

  // Xử lý xóa người dùng, yêu cầu xác nhận trước khi xóa
  const handleDelete = async (user) => {
    if (!window.confirm(`Bạn có chắc muốn xóa người dùng "${user.name}"?`)) {
      return;
    }

    try {
      await authService.deleteUser(user.id);
      await fetchUsers();
      if (editingId === user.id) resetForm();
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(err.response?.data?.message || "Không thể xóa người dùng.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
            Quản lý người dùng
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-on-background">
            Tài khoản khách hàng
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
            Theo dõi, thêm mới và cập nhật thông tin người dùng trong hệ thống.
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
            placeholder="Tìm tên, email, số điện thoại..."
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
                <Users size={18} />
              </div>
              <div>
                <h2 className="font-bold text-on-background">
                  Danh sách người dùng
                </h2>
                <p className="text-xs text-on-surface-variant">
                  {filteredUsers.length} tài khoản đang hiển thị
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-stone-100">
            {loading &&
              [1, 2, 3].map((item) => (
                <div key={item} className="px-6 py-5">
                  <div className="h-16 rounded-xl bg-stone-100 animate-pulse" />
                </div>
              ))}

            {!loading &&
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-5 px-6 py-5 transition hover:bg-stone-50"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                    {(user.name || user.email || "U").slice(0, 1).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-on-background">
                      {user.name}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-xs text-on-surface-variant">
                      <span className="inline-flex items-center gap-1">
                        <Mail size={13} />
                        {user.email}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Phone size={13} />
                        {user.phone || "Chưa cập nhật"}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      Number(user.role_id) === 0
                        ? "bg-primary text-on-primary"
                        : "bg-stone-100 text-on-surface-variant"
                    }`}
                  >
                    {Number(user.role_id) === 0 ? "Admin" : "Người dùng"}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="rounded-lg p-2 text-on-surface-variant transition hover:bg-primary/10 hover:text-primary"
                    >
                      <Edit size={17} />
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className="rounded-lg p-2 text-on-surface-variant transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              ))}

            {!loading && filteredUsers.length === 0 && (
              <div className="px-6 py-12 text-center text-sm text-on-surface-variant">
                Không tìm thấy người dùng phù hợp.
              </div>
            )}
          </div>
        </div>

        <aside className="col-span-4">
          <UserForm
            form={form}
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
