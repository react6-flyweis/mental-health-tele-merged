import { useEffect } from "react";
import { useNavigate } from "react-router";
import bgImage from "../assets/images/bgimg.svg";
import Logo from "../assets/images/logo.svg";
import LoginCard from "../components/auth/LoginCard";
import { Loading } from "@/components/Loading";
import { useAuthStore } from "@/store/authStore";

export default function ProviderLoginPage() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && token) {
      navigate("/provider/dashboard", { replace: true });
    }
  }, [hasHydrated, token, navigate]);

  if (!hasHydrated) {
    return <Loading />;
  }

  return (
    <div className="bg-[linear-gradient(180deg,#F0F9F7_0%,#E8F4F8_100%)] min-h-screen w-full">
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center lg:px-6 px-3 w-full"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div
          className="flex items-center gap-3 mb-[40px] cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="Logo" className="h-[50px]" />
        </div>
        <LoginCard role="Provider" onSubmitPath="/provider/dashboard" useApi />
      </div>
    </div>
  );
}
