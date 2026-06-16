import { useState, useEffect } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/home/HeroSection";
import { LimitedRelease } from "../components/home/LimitedRelease";
import { CuratedNewness } from "../components/home/CuratedNewness";
import { Newsletter } from "../components/home/Newsletter";
import { productService } from "../services/productService";

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await productService.getAll();
        setProducts(result.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Khong the tai danh sach san pham.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="text-on-background bg-background min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <LimitedRelease
          products={products}
          isLoading={isLoading}
          error={error}
        />
        <CuratedNewness />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};
