import React from "react";
import { useNavigate } from "react-router-dom";
import { anh1, anh6 } from "../../anh";

export const ContactHero = () => (
  <section className="px-8 lg:px-16 mb-20">
    <div className="max-w-screen-xl mx-auto">
      <span className="text-primary font-headline uppercase tracking-widest text-xs mb-4 block">
        Tư vấn Trầm Hương
      </span>
      <h1 className="text-4xl lg:text-5xl font-headline font-bold text-on-background tracking-tight leading-tight mb-8">
        Chọn chiếc vòng <br />
        hợp với bạn.
      </h1>
      <div className="grid grid-cols-12 gap-12 items-end">
        <div className="col-span-7">
          <img
            className="w-full aspect-[16/9] object-cover rounded-lg shadow-sm"
            alt="Vòng tay trầm hương tự nhiên phong thủy"
            src={anh1}
          />
        </div>
        <div className="col-span-5 pb-8">
          <p className="text-on-surface-variant text-base leading-relaxed max-w-sm">
            Bạn đang cần tìm vòng tay trầm hương phong thủy hợp mệnh, hợp tuổi hay làm quà tặng ý nghĩa? Hãy gửi thông tin, chúng tôi sẽ gợi ý mẫu vòng phù hợp nhất.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export const ContactFormSection = () => {
  const navigate = useNavigate();

  return (
  <section className="bg-surface-container-low py-24 px-8 lg:px-16">
    <div className="max-w-screen-xl mx-auto grid grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-headline font-bold text-on-background mb-8">
            Liên hệ tư vấn
          </h2>
          <form className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                Họ và tên
              </label>
              <input
                className="w-full bg-transparent border-b border-outline-variant/30 py-3 focus:outline-none focus:border-primary transition-colors font-body text-on-background"
                placeholder="Nhập họ và tên"
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                  Email
                </label>
                <input
                  className="w-full bg-transparent border-b border-outline-variant/30 py-3 focus:outline-none focus:border-primary transition-colors font-body text-on-background"
                  placeholder="hello@example.com"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                  Số đo cổ tay (cm)
                </label>
                <input
                  className="w-full bg-transparent border-b border-outline-variant/30 py-3 focus:outline-none focus:border-primary transition-colors font-body text-on-background"
                  placeholder="Ví dụ: 15cm, 16cm..."
                  type="text"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                Nhu cầu tư vấn
              </label>
              <textarea
                className="w-full bg-transparent border-b border-outline-variant/30 py-3 focus:outline-none focus:border-primary transition-colors font-body resize-none text-on-background"
                placeholder="Bạn muốn tư vấn về loại trầm hương, số hạt, mệnh phong thủy hay quà tặng?"
                rows={4}
              ></textarea>
            </div>
            <button
              type="button"
              className="bg-primary text-on-primary px-12 py-4 rounded-md font-headline text-sm uppercase tracking-widest font-bold hover:bg-primary-dim transition-all active:scale-95 inline-flex items-center gap-2 mt-4"
            >
              Gửi yêu cầu
              <span className="material-symbols-outlined text-sm flex items-center justify-center">
                arrow_forward
              </span>
            </button>
          </form>
        </div>

        <div className="flex flex-col justify-between">
          <div className="space-y-16">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-primary font-bold mb-6">
                Showroom VÒNG TAY HƯƠNG TRẦM
              </h3>
              <div className="space-y-4">
                <p className="text-2xl font-headline text-on-background leading-snug">
                  42 Nguyễn Huệ
                  <br />
                  Quận 1, TP. Hồ Chí Minh
                </p>
                <p className="text-on-surface-variant">
                  0909 888 777
                  <br />
                  contact@casafine.vn
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest text-primary font-bold mb-6">
                Giờ mở cửa
              </h3>
              <ul className="space-y-2 text-on-surface-variant">
                <li className="flex justify-between max-w-xs">
                  <span>Thứ hai - Thứ sáu</span> <span>09:00 - 20:00</span>
                </li>
                <li className="flex justify-between max-w-xs">
                  <span>Thứ bảy</span> <span>10:00 - 19:00</span>
                </li>
                <li className="flex justify-between max-w-xs">
                  <span>Chủ nhật</span> <span>Theo lịch hẹn</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12">
            <div
              className="group inline-flex items-center gap-4 cursor-pointer"
              onClick={() => navigate("/products")}
            >
              <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                <span className="material-symbols-outlined">shopping_bag</span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-on-surface-variant block">
                  Cần gợi ý nhanh?
                </span>
                <span className="text-lg font-headline font-bold text-on-background">
                  Xem bộ sưu tập vòng bán chạy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ContactMap = () => (
  <section className="w-full h-[614px] relative overflow-hidden">
    <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10"></div>
    <img
      className="w-full h-full object-cover grayscale opacity-80 scale-105"
      alt="Khu phố trung tâm với ánh sáng buổi tối"
      src={anh6}
    />
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="bg-surface-bright/90 backdrop-blur-md p-12 text-center max-w-md rounded-lg shadow-xl">
        <span
          className="material-symbols-outlined text-primary mb-4"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          location_on
        </span>
        <h4 className="text-xl font-headline font-bold mb-2">Ghé showroom</h4>
        <p className="text-on-surface-variant text-sm mb-6">
          Trải nghiệm trực tiếp và ngửi thử mùi hương thơm thanh khiết của trầm hương tự nhiên trước khi chọn chiếc vòng phù hợp với bạn.
        </p>
        <a
          className="text-primary text-xs uppercase tracking-widest font-bold border-b border-primary pb-1 hover:opacity-70 transition-opacity"
          href="https://maps.google.com"
          target="_blank"
          rel="noreferrer"
        >
          Mở trong bản đồ
        </a>
      </div>
    </div>
  </section>
);

export const MainContact = () => {
  return (
    <main className="pt-24">
      <ContactHero />
      <ContactFormSection />
      <ContactMap />
    </main>
  );
};
