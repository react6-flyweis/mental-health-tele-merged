import bgImage from "@/assets/bgimg.svg";

import logo from "@/assets/medical-health-tele-logo.png";
import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="bg-[linear-gradient(180deg,#F0F9F7_0%,#E8F4F8_100%)] min-h-screen w-full">
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center lg:px-6 px-3 w-full"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Link to="/" className="flex items-center gap-3 mb-5">
          <img src={logo} alt="Logo" className="h-12" />
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
