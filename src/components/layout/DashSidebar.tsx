import logo from "@/assets/images/logo.svg";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  LayoutGrid,
  Search,
  Calendar,
  Video,
  Pill,
  CreditCard,
  MessageSquare,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router";

const SIDEBAR_MENU = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard", isActive: true },
  { href: "/dashboard/appointments", icon: Calendar, label: "Appointments" },
  { href: "/dashboard/video-sessions", icon: Video, label: "Video Sessions" },
  {
    href: "/dashboard/patient-records",
    icon: Search,
    label: "Patient Records",
  },
  { href: "/dashboard/prescriptions", icon: Pill, label: "Prescriptions" },
  { href: "/dashboard/messages", icon: MessageSquare, label: "Messages" },
  { href: "/dashboard/earnings", icon: CreditCard, label: "Earnings" },
  { href: "/dashboard/availability", icon: Calendar, label: "Availability" },
  { href: "/dashboard/profile", icon: Search, label: "Profile" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function DashSidebar() {
  return (
    <Sidebar side="left">
      <SidebarHeader className="border-b p-3 mb-5">
        <NavLink to="/dashboard" className="flex items-center gap-3">
          <img src={logo} alt="Mental Health Tele" className="h-9 w-auto" />
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {SIDEBAR_MENU.map(({ href, icon: Icon, label }) => (
                <SidebarMenuItem key={href}>
                  <NavLink
                    to={href}
                    end={href === "/dashboard"}
                    className="w-full"
                  >
                    {({ isActive }) => (
                      <SidebarMenuButton
                        className={cn(
                          "h-10",
                          isActive && "bg-gradient-dash text-white!",
                        )}
                        isActive={isActive}
                      >
                        <Icon />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="mt-auto">
        <SidebarSeparator />
        <SidebarFooter className="px-4 py-3 text-sm text-muted-foreground">
          © 2026 MindCare
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
