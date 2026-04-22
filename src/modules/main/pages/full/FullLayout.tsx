import logo from "@/assets/medical-health-tele-logo.png";
import bgPattern from "@/assets/landing/hero/bg-pattern.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Outlet } from "react-router";

export default function FullLayout() {
  return (
    <div className="min-h-screen bg-[#F4F9F8] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -scale-x-100 left-0 z-0 opacity-40 max-w-xs pointer-events-none">
        <img
          src={bgPattern}
          alt="Background pattern left"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute  right-0 z-0 opacity-40 max-w-xs pointer-events-none">
        <img
          src={bgPattern}
          alt="Background pattern right"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full  relative z-10">
        <div className="flex justify-center mb-6">
          {/* <img
            src={logo}
            alt="Mental Health Tele"
            priority
            className="object-contain"
          /> */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Mental Health Tele logo"
              className="sm:h-9 h-6 w-auto min-w-25  object-contain"
            />
          </Link>
        </div>
        <Outlet />
        <ToastContainer />
      </div>
    </div>
  );
}
