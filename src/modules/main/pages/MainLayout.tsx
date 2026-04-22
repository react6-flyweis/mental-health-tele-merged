import "./globals.css";
import { AuthProvider } from "@/modules/main/context/auth.context";
import { Outlet } from "react-router";

// const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

// const manrope = Manrope({
//   subsets: ["latin"],
//   variable: "--font-manrope",
// });

// const arimo = Arimo({
//   subsets: ["latin"],
//   variable: "--font-arimo",
// });

export default function MainLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
