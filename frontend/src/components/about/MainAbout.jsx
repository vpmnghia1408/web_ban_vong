import React from "react";
import { anh1, anh2, anh3, anh5 } from "../../anh";

const Hero = () => (
  <section className="px-8 lg:px-16 mb-24">
    <div className="grid grid-cols-12 gap-10 items-center">
      <div className="col-span-7 relative">
        <img
          className="w-full h-[520px] object-cover rounded-lg shadow-sm"
          alt="Vòng tay trầm hương tự nhiên cao cấp"
          src={anh1}
        />
        <div className="absolute -bottom-5 right-8 bg-white dark:bg-stone-900 p-6 rounded-lg max-w-xs shadow-2xl z-10 border border-stone-100 dark:border-stone-800">
          <p className="text-stone-900 dark:text-stone-100 font-body text-sm font-semibold leading-relaxed italic">
            "Hương trầm tự nhiên không nồng nàn phô trương, mà thoảng nhẹ mang lại cảm giác bình yên và tĩnh lặng cho tâm hồn."
          </p>
        </div>
      </div>
      <div className="col-span-5 pl-8">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05] text-on-background mb-5 font-headline">
          Trầm hương <br />
          từ tâm an.
        </h1>
        <p className="text-base text-on-surface-variant font-body leading-relaxed mb-6">
          Chúng tôi tập trung vào những mẫu vòng tay trầm hương phong thủy cao cấp. Chọn lọc kỹ lưỡng từ nguồn trầm tự nhiên, mỗi hạt trầm mang vẻ đẹp mộc mạc và hương thơm vĩnh cửu.
        </p>
        <div className="w-16 h-px bg-primary"></div>
      </div>
    </div>
  </section>
);

const Story = () => (
  <section className="bg-surface-container-low py-24 px-8 lg:px-16 overflow-hidden">
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-row gap-16">
        <div className="flex-1 space-y-8">
          <span className="font-headline uppercase tracking-widest text-xs font-semibold text-primary">
            VÒNG TAY HƯƠNG TRẦM
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-on-background font-headline">
            Hương thơm thanh khiết dẫn lối sự tĩnh lặng
          </h2>
          <div className="space-y-5 text-on-surface-variant leading-relaxed max-w-lg text-base">
            <p>
              Đeo chiếc vòng trầm hương trên tay giúp điều hòa khí huyết, giữ tâm thanh tịnh giữa cuộc sống xô bồ, đồng thời là món trang sức tinh tế và sang trọng.
            </p>
            <p>
              Chúng tôi không chạy theo số lượng đại trà. Mỗi chiếc vòng trầm tại đây đều là một tác phẩm được xâu chuỗi thủ công, đảm bảo chuẩn trầm tự nhiên và có giá trị phong thủy cao nhất.
            </p>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="grid grid-cols-2 gap-4">
            <img
              className="w-full aspect-[4/5] object-cover rounded-lg translate-y-12"
              alt="Vòng trầm hương phong thủy"
              src={anh5}
            />
            <img
              className="w-full aspect-[4/5] object-cover rounded-lg -translate-y-12"
              alt="Vòng tay trầm hương tự nhiên cao cấp"
              src={anh3}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Process = () => {
  const steps = [
    {
      num: "01",
      title: "Chọn loại trầm",
      heading: "Chuẩn tự nhiên",
      desc: "Cam kết sử dụng trầm hương tự nhiên tích tụ linh khí đất trời, mang lại mùi thơm dịu ngọt, bền lâu.",
      img: anh1,
      offset: false,
    },
    {
      num: "02",
      title: "Số hạt & Kích thước",
      heading: "Vừa vặn cổ tay",
      desc: "Được tư vấn chi tiết về số lượng hạt (như 108 hạt, 17 hạt theo sinh-lão-bệnh-tử) và đường kính hạt phù hợp với cổ tay nam/nữ.",
      img: anh5,
      offset: true,
    },
    {
      num: "03",
      title: "Tư vấn phong thủy",
      heading: "Hợp mệnh & Hợp tuổi",
      desc: "Tư vấn lựa chọn charm đi kèm (vàng, bạc, đá quý) phù hợp với bản mệnh để gia tăng tài lộc và may mắn.",
      img: anh2,
      offset: false,
    },
  ];

  return (
  <section className="py-24 px-8 lg:px-16">
      <div className="text-center mb-20">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 font-headline">
          Chọn vòng trầm theo cách an yên hơn
        </h2>
        <p className="text-on-surface-variant font-body">
          Bắt đầu từ sự tự nhiên của trầm hương, sau đó mới đến kiểu dáng phối hợp phong thủy.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-10">
        {steps.map((step, idx) => (
          <div key={idx} className={`space-y-6 ${step.offset ? "mt-16" : ""}`}>
            <div className="bg-surface-container-high aspect-square rounded-lg flex items-center justify-center p-8 overflow-hidden">
              <img
                className="w-full h-full object-cover rounded shadow-sm"
                alt={step.title}
                src={step.img}
              />
            </div>
            <div>
              <span className="text-primary font-headline text-sm font-bold block mb-2">
                {step.num}. {step.title}
              </span>
              <h3 className="text-lg font-bold mb-2 font-headline">
                {step.heading}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const MainAbout = () => {
  return (
    <main className="pt-24">
      <Hero />
      <Story />
      <Process />
    </main>
  );
};
