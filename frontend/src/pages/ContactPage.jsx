import { MainContact } from "../components/Contact/MainContact.jsx";
import { Header } from "../components/layout/Header.jsx";
import { Footer } from "../components/layout/Footer.jsx";
export const ContactPage = () => {
  return (
    <div className="bg-background text-on-background antialiased min-h-screen font-body selection:bg-primary-container">
      <Header />
      <MainContact />
      <Footer />
    </div>
  );
};
