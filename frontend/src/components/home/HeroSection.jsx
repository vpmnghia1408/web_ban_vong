import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { anh1, anh3, anh5 } from "../../anh";

const slides = [
  { src: anh1, alt: "Vòng tay trầm hương tự nhiên cao cấp", pos: "right-0 top-0 w-[80%] h-[400px]" },
  { src: anh5, alt: "Vòng chuỗi trầm hương 108 hạt", pos: "right-0 top-0 w-[80%] h-[400px]" },
  { src: anh3, alt: "Vòng trầm sánh chìm phối charm", pos: "right-0 top-0 w-[80%] h-[400px]" },
];

const secondarySlides = [
  { src: anh5, alt: "Vòng chuỗi trầm hương 108 hạt", pos: "left-0 bottom-10 w-[45%] h-56" },
  { src: anh3, alt: "Vòng trầm sánh chìm phối charm", pos: "left-0 bottom-10 w-[45%] h-56" },
  { src: anh1, alt: "Vòng tay trầm hương tự nhiên cao cấp", pos: "left-0 bottom-10 w-[45%] h-56" },
];

const thirdSlides = [
  { src: anh3, alt: "Vòng trầm sánh chìm phối charm", pos: "right-[15%] bottom-0 w-[30%] h-40" },
  { src: anh1, alt: "Vòng tay trầm hương tự nhiên cao cấp", pos: "right-[15%] bottom-0 w-[30%] h-40" },
  { src: anh5, alt: "Vòng chuỗi trầm hương 108 hạt", pos: "right-[15%] bottom-0 w-[30%] h-40" },
];

export const HeroSection = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden flex items-center px-6 lg:px-12 py-16 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-12 gap-8 w-full items-center">
        {/* Hero Content */}
        <div className="col-span-12 lg:col-span-6 z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-[11px] font-bold mb-4 tracking-[0.2em] uppercase">
            Trầm hương tự nhiên tuyển chọn
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-on-background">
            Nghệ thuật của <br />
            <span className="text-primary italic font-serif">Sự Tĩnh Lặng.</span>
          </h1>
          <p className="text-base text-on-surface-variant max-w-md mb-8 leading-relaxed">
            Chúng tôi tuyển chọn những mẫu vòng tay trầm hương tự nhiên cao cấp,
            mang lại năng lượng bình an, may mắn và hương thơm thanh tịnh mỗi ngày.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 text-sm bg-primary text-on-primary rounded-md font-semibold hover:bg-primary-dim transition-all flex items-center gap-2"
            >
              Xem bộ sưu tập <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-3 text-sm border border-outline-variant/30 text-on-background rounded-md font-semibold hover:bg-surface-container transition-all"
            >
              Tư vấn phong thủy
            </button>
          </div>
        </div>

        {/* Auto-rotating Image Collage */}
        <div className="col-span-12 lg:col-span-6 relative h-[480px] mt-10 lg:mt-0">
          {/* Main Large Image */}
          <div className={`absolute right-0 top-0 w-[80%] h-[400px] rounded-lg overflow-hidden shadow-2xl collage-float transition-opacity duration-700 ease-in-out ${current === 0 ? "opacity-100" : "opacity-0"}`}>
            <img className="w-full h-full object-cover" src={anh1} alt="Vòng tay trầm hương tự nhiên cao cấp" referrerPolicy="no-referrer" />
          </div>
          <div className={`absolute right-0 top-0 w-[80%] h-[400px] rounded-lg overflow-hidden shadow-2xl collage-float transition-opacity duration-700 ease-in-out ${current === 1 ? "opacity-100" : "opacity-0"}`}>
            <img className="w-full h-full object-cover" src={anh5} alt="Vòng chuỗi trầm hương 108 hạt" referrerPolicy="no-referrer" />
          </div>
          <div className={`absolute right-0 top-0 w-[80%] h-[400px] rounded-lg overflow-hidden shadow-2xl collage-float transition-opacity duration-700 ease-in-out ${current === 2 ? "opacity-100" : "opacity-0"}`}>
            <img className="w-full h-full object-cover" src={anh3} alt="Vòng trầm sánh chìm phối charm" referrerPolicy="no-referrer" />
          </div>

          {/* Overlapping Detail 1 */}
          <div className={`absolute left-0 bottom-10 w-[45%] h-56 rounded-lg overflow-hidden shadow-2xl border-4 border-background collage-float transition-opacity duration-700 ease-in-out ${current === 0 ? "opacity-100" : "opacity-0"}`}>
            <img className="w-full h-full object-cover" src={anh5} alt="Vòng chuỗi trầm hương 108 hạt" referrerPolicy="no-referrer" />
          </div>
          <div className={`absolute left-0 bottom-10 w-[45%] h-56 rounded-lg overflow-hidden shadow-2xl border-4 border-background collage-float transition-opacity duration-700 ease-in-out ${current === 1 ? "opacity-100" : "opacity-0"}`}>
            <img className="w-full h-full object-cover" src={anh3} alt="Vòng trầm sánh chìm phối charm" referrerPolicy="no-referrer" />
          </div>
          <div className={`absolute left-0 bottom-10 w-[45%] h-56 rounded-lg overflow-hidden shadow-2xl border-4 border-background collage-float transition-opacity duration-700 ease-in-out ${current === 2 ? "opacity-100" : "opacity-0"}`}>
            <img className="w-full h-full object-cover" src={anh1} alt="Vòng tay trầm hương tự nhiên cao cấp" referrerPolicy="no-referrer" />
          </div>

          {/* Overlapping Detail 2 */}
          <div className={`absolute right-[15%] bottom-0 w-[30%] h-40 rounded-lg overflow-hidden shadow-2xl border-4 border-background collage-float transition-opacity duration-700 ease-in-out ${current === 0 ? "opacity-100" : "opacity-0"}`}>
            <img className="w-full h-full object-cover" src={anh3} alt="Vòng trầm sánh chìm phối charm" referrerPolicy="no-referrer" />
          </div>
          <div className={`absolute right-[15%] bottom-0 w-[30%] h-40 rounded-lg overflow-hidden shadow-2xl border-4 border-background collage-float transition-opacity duration-700 ease-in-out ${current === 1 ? "opacity-100" : "opacity-0"}`}>
            <img className="w-full h-full object-cover" src={anh1} alt="Vòng tay trầm hương tự nhiên cao cấp" referrerPolicy="no-referrer" />
          </div>
          <div className={`absolute right-[15%] bottom-0 w-[30%] h-40 rounded-lg overflow-hidden shadow-2xl border-4 border-background collage-float transition-opacity duration-700 ease-in-out ${current === 2 ? "opacity-100" : "opacity-0"}`}>
            <img className="w-full h-full object-cover" src={anh5} alt="Vòng chuỗi trầm hương 108 hạt" referrerPolicy="no-referrer" />
          </div>

          {/* Dots indicator */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${current === i ? "bg-primary w-6" : "bg-stone-300 hover:bg-stone-400"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
