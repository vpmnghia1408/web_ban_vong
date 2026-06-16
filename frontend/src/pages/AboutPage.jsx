import React from "react";
import { MainAbout } from "../components/about/MainAbout";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
export const AboutPage = () => {
  return (
    <div className="bg-background text-on-background antialiased min-h-screen">
      <Header />
      <MainAbout />
      <Footer />
    </div>
  );
};
