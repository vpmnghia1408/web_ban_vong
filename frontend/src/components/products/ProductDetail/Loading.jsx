// Skeleton loading cho trang chi tiết sản phẩm
export const ProductDetailSkeleton = () => (
  <main className="max-w-6xl mx-auto px-8 pt-10">
    <section className="grid grid-cols-12 gap-8 lg:gap-12 mb-24 animate-pulse">
      <div className="col-span-6">
        <div className="w-full aspect-[4/5] rounded-lg bg-surface-container-high" />
      </div>
      <div className="col-span-6 pt-6 space-y-5">
        <div className="h-4 w-40 rounded bg-surface-container-high" />
        <div className="h-16 w-full rounded bg-surface-container-high" />
        <div className="h-8 w-48 rounded bg-surface-container-high" />
        <div className="h-32 w-full rounded bg-surface-container-high" />
      </div>
    </section>
  </main>
);
