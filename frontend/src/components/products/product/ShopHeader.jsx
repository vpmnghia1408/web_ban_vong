import { anh1 } from "../../../anh";

/** Banner đầu trang shop — tiêu đề + mô tả ngắn */
export const ShopHeader = () => (
  <section className="max-w-7xl mx-auto px-8 mb-10">
    <div className="flex flex-row items-end justify-between gap-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl lg:text-5xl font-headline font-extrabold tracking-tight text-on-background mb-4 leading-[1.04]">
          Bộ sưu tập vòng tay
        </h1>
        <p className="text-base text-on-surface-variant font-light leading-relaxed max-w-xl">
          Từ trầm tốc tự nhiên đến trầm chìm cao cấp phối charm tinh xảo, mỗi
          chiếc vòng tay được tuyển chọn để mang lại bình an, tài lộc và hương
          thơm dịu nhẹ.
        </p>
      </div>
      <div className="block w-52 h-64 overflow-hidden rounded">
        <img
          className="w-full h-full object-cover grayscale brightness-110"
          alt="Vòng tay trầm hương"
          src={anh1}
        />
      </div>
    </div>
  </section>
);
