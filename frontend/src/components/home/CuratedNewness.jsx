import { ArrowUpRight } from "lucide-react";
import { anh4 } from "../../anh";

export const CuratedNewness = () => {
  return (
    <section className="py-16 max-w-screen-xl mx-auto px-6 lg:px-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tighter mb-3">
          Trầm Hương Tự Nhiên
        </h2>
        <p className="text-on-surface-variant text-sm max-w-xl mx-auto">
          Vòng tay trầm hương được tuyển chọn tỉ mỉ theo từng nhu cầu: chiêu tài lộc, cầu bình an, tĩnh tâm và cân bằng năng lượng phong thủy.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Large Feature - Left, spans 2 rows */}
        <div className="relative group overflow-hidden rounded-lg row-span-2">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            alt="Vòng tay trầm hương tự nhiên phong thủy"
            src={anh4}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
};
