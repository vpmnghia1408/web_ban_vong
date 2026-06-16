import { MainProfile } from "../components/Profile/MainProfile.jsx";
import { Header } from "../components/layout/Header.jsx";
import { Footer } from "../components/layout/Footer.jsx";
import { useEffect, useState } from "react";
import { authService } from "../services/authService.js";

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getProfile();
        setUser(response.data || null);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Khong the tai thong tin tai khoan.");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="font-body text-on-background bg-background min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      <Header />
      {error && (
        <div className="mx-auto mt-28 max-w-4xl rounded-lg bg-red-50 px-6 py-4 text-sm text-red-700">
          {error}
        </div>
      )}
      <MainProfile user={user} />
      <Footer />
    </div>
  );
};
