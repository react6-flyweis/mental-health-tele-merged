import DashHeader from "@/modules/main/components/dashboard/DashHeader";
import DashSidebar from "@/modules/main/components/layouts/DashSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <SidebarProvider className="font-serif">
      <DashSidebar />

      <SidebarInset>
        <DashHeader />
        <div className="container mx-auto bg-[#F9FAFB] px-4 py-6">
          <Outlet />
        </div>
      </SidebarInset>

      <ToastContainer />
    </SidebarProvider>
  );
}
