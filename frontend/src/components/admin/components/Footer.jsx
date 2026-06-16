import React from "react";

export const Footer = () => (
  <footer className="mt-auto py-12 px-12 bg-surface-dim border-t border-stone-200/10 ml-72">
    <div className="flex justify-between items-center opacity-60">
      <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
        <a className="hover:text-primary transition-colors" href="#">
          Chính sách bảo mật
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          Trạng thái hệ thống
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          Tài liệu API
        </a>
      </div>
      <p className="text-[10px] font-medium tracking-widest">
        © 2024 CASAFINE ATELIER. Đã đăng ký bản quyền.
      </p>
    </div>
  </footer>
);
