import { ArrowRight, BarChart2, Camera, PlayCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full py-12 mt-12 bg-stone-100 dark:bg-stone-900 font-body text-sm tracking-wide text-stone-800 dark:text-stone-200">
      <div className="grid grid-cols-4 gap-8 px-6 lg:px-12 max-w-screen-xl mx-auto">
        <div className="col-span-1">
          <div className="text-lg font-bold text-stone-900 dark:text-stone-50 mb-5 font-headline">
            VÒNG TAY HƯƠNG TRẦM
          </div>
          <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-5">
            Cửa hàng vòng tay trầm hương cao cấp mang lại năng lượng phong thủy
            cát tường, bình an và hương thơm thanh tịnh tự nhiên.
          </p>
          <div className="flex space-x-4">
            <BarChart2 className="w-5 h-5 text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 cursor-pointer transition-colors" />
            <Camera className="w-5 h-5 text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 cursor-pointer transition-colors" />
            <PlayCircle className="w-5 h-5 text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="font-bold text-stone-900 dark:text-stone-50 mb-6 uppercase tracking-widest text-[10px] font-headline">
            Mua sắm
          </h4>
          <ul className="space-y-4">
            {["Vòng Trầm Nam", "Vòng Trầm Nữ", "Vòng Trầm 108 Hạt", "Vòng Trầm Phối Charm"].map((item) => (
              <li key={item}>
                <a
                  className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-all"
                  href="#"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-stone-900 dark:text-stone-50 mb-6 uppercase tracking-widest text-[10px] font-headline">
            Thông tin
          </h4>
          <ul className="space-y-4">
            {[
              "Tư vấn chọn vòng",
              "Chính sách giao hàng",
              "Chính sách bảo hành",
              "Điều khoản dịch vụ",
            ].map((item) => (
              <li key={item}>
                <a
                  className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-all"
                  href="#"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-stone-900 dark:text-stone-50 mb-6 uppercase tracking-widest text-[10px] font-headline">
            Đăng ký nhận tin
          </h4>
          <p className="text-stone-500 dark:text-stone-400 mb-6">
            Nhận thông tin sớm nhất về các mẫu vòng tay mới và ưu đãi theo mùa.
          </p>
          <div className="flex items-center border-b border-stone-300 dark:border-stone-700 pb-2">
            <input
              className="bg-transparent border-none focus:ring-0 w-full text-stone-900 dark:text-stone-50 placeholder:text-stone-400 outline-none"
              placeholder="Địa chỉ email"
              type="text"
            />
            <button className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 px-6 lg:px-12 max-w-screen-xl mx-auto flex flex-row justify-between items-center text-stone-400 border-t border-stone-200 dark:border-stone-800 pt-6">
        <p className="text-xs">© 2024 VÒNG TAY HƯƠNG TRẦM. Đã đăng ký bản quyền.</p>
        <div className="flex space-x-6 text-xs">
          {["Bảo mật", "Điều khoản", "Cookie"].map((item) => (
            <a
              key={item}
              className="hover:text-stone-900 dark:hover:text-stone-50 transition-all"
              href="#"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
