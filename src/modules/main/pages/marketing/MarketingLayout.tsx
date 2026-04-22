import { Header } from "@/modules/main/components/layouts/Header";
import Footer from "@/modules/main/components/layouts/Footer";
import { Outlet } from "react-router";

export default function MarketingLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
