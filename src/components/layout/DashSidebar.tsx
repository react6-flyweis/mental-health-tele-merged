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
  {
    href: "/provider/dashboard",
    icon: LayoutGrid,
    label: "Dashboard",
    isActive: true,
  },
  {
    href: "/provider/dashboard/appointments",
    icon: Calendar,
    label: "Appointments",
  },
  {
    href: "/provider/dashboard/video-sessions",
    icon: Video,
    label: "Video Sessions",
  },
  {
    href: "/provider/dashboard/patient-records",
    icon: Search,
    label: "Patient Records",
  },
  {
    href: "/provider/dashboard/prescriptions",
    icon: Pill,
    label: "Prescriptions",
  },
  {
    href: "/provider/dashboard/messages",
    icon: MessageSquare,
    label: "Messages",
  },
  { href: "/provider/dashboard/earnings", icon: CreditCard, label: "Earnings" },
  {
    href: "/provider/dashboard/availability",
    icon: Calendar,
    label: "Availability",
  },
  { href: "/provider/dashboard/profile", icon: Search, label: "Profile" },
  { href: "/provider/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function DashSidebar() {
  return (
    <Sidebar side="left">
      <SidebarHeader className="border-b p-3 mb-5">
        <NavLink to="/provider/dashboard" className="flex items-center gap-3">
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
                    end={href === "/provider/dashboard"}
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
