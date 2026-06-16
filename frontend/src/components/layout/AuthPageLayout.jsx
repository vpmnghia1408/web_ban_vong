import { Header } from "../layout/Header";
import { anh4, anh7 } from "../../anh";

export const AuthPageLayout = ({ side = "login", children }) => {
  const sideContent = {
    login: {
      title: "Hương trầm mang lại sự tĩnh lặng.",
      subtitle:
        "Đăng nhập để thanh toán đơn hàng, theo dõi vận chuyển và lưu lại những mẫu vòng tay yêu thích.",
      bgImage: anh4,
    },
    register: {
      title: "Đeo trầm hương, tâm an vạn sự cát.",
      subtitle:
        "Tạo tài khoản để mua hàng nhanh hơn, theo dõi đơn hàng và nhận tư vấn chọn vòng trầm phù hợp.",
      bgImage: anh7,
    },
  };

  const content = sideContent[side];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fbf9f6] text-[#30332f]">
      <img
        src={content.bgImage}
        alt="Không gian trầm hương"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#fbf9f6]/80 backdrop-blur-[2px]" />
      <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-[#fbf9f6]/30 via-[#fbf9f6]/60 to-transparent lg:block" />

      <div className="relative z-10">
        <Header isAuthPage />

        <main className="flex min-h-screen pt-[72px]">
          <section className="hidden w-[46%] items-end px-12 pb-16 lg:flex">
            <div className="max-w-sm rounded-2xl border border-white/45 bg-white/50 p-8 shadow-[0_30px_80px_rgba(48,51,47,0.14)] backdrop-blur-xl">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.28em] text-primary">
                VÒNG TAY HƯƠNG TRẦM
              </span>
              <h2 className="mb-5 font-headline text-4xl font-extrabold leading-tight tracking-tight text-on-background">
                {content.title}
              </h2>
              <p className="text-sm leading-7 text-on-surface-variant">
                {content.subtitle}
              </p>
            </div>
          </section>

          <section className="flex flex-1 items-center justify-center px-6 py-10 lg:px-12">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
};
