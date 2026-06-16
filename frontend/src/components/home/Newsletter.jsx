export const Newsletter = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-6 lg:px-12 mb-16">
      <div className="bg-stone-900 rounded-lg p-10 md:p-16 relative overflow-hidden text-center">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-50 tracking-tighter mb-4">
            Nhận tư vấn phong thủy & Trầm Hương
          </h2>
          <p className="text-stone-400 text-sm md:text-base mb-8 leading-relaxed">
            Đăng ký nhận kiến thức chọn vòng hợp mệnh, thông tin mẫu sản phẩm mới nhất và ưu đãi đặc quyền.
          </p>
          <form
            className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="flex-grow bg-stone-800 border-none rounded-md px-5 py-3 text-sm text-stone-200 placeholder:text-stone-500 focus:ring-2 focus:ring-primary outline-none"
              placeholder="Nhập email của bạn"
              type="email"
            />
            <button className="bg-primary-container text-on-primary-container px-6 py-3 rounded-md text-sm font-bold hover:opacity-90 transition-opacity">
              Nhận tư vấn
            </button>
          </form>
        </div>
        {/* Decorative Elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-container/10 rounded-full blur-[100px]"></div>
      </div>
    </section>
  );
};
