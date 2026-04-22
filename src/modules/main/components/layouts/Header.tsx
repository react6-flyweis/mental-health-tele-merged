"use client";

import * as React from "react";
import { useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/medical-health-tele-logo.png";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import userIcon from "@/assets/icons/user-icon.svg";
import { useEffect, useState } from "react";
import { publicPageApi } from "@/api/publicpage.api";
import { useFetch } from "@/hooks/useFetch";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/modules/main/context/auth.context";

export function Header() {
  const {
    data: headerData,
    loading: headerLoading,
    error: headerError,
  } = useFetch(publicPageApi.getDashboardAPI) as any;
  const patientToken =
    typeof window !== "undefined" ? localStorage.getItem("patientToken") : null;
  const { user } = useAuth();
  const router = useNavigate();

  const navItems =
    headerData?.header?.navItems
      ?.slice()
      ?.sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
      ?.map((item: any) => {
        const conditions =
          headerData?.conditions?.map((cond: any) => ({
            label: cond.label,
            to: cond.destinationUrl,
          })) || [];

        if (item.label === "Conditions") {
          return {
            label: item.label,
            to: item.url,
            items: item?.children.map((child: any) => ({
              label: child.label,
              to: child.url ?? "",
            })),
          };
        }

        if (item.label === "Services") {
          return {
            label: item.label,
            to: item.url,
            items: item?.children.map((child: any) => ({
              label: child.label,
              to: child.url ?? "",
            })),
          };
        }

        if (item.label === "Blog") {
          return {
            label: item.label,
            to: item.url,
            items: item?.children.map((child: any) => ({
              label: child.label,
              to: child.url ?? "",
            })),
          };
        }

        if (item.label === "Company") {
          return {
            label: item.label,
            to: item.url,
            items: item?.children.map((child: any) => ({
              label: child.label,
              to: child.url ?? "",
            })),
          };
        }

        if (item.label === "FAQs") {
          return {
            label: item.label,
            to: item.url,
            items:
              item?.children?.length > 0
                ? item?.children.map((child: any) => ({
                    label: child.label,
                    to: child.url ?? "",
                  }))
                : [{ label: "General", to: "/faqs" }],
          };
        }

        return {
          label: item.label,
          to: item.url,
          items: [],
        };
      }) || [];
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  if (headerLoading) {
    return (
      <header>
        <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-4">
          <div className="md:hidden">
            <Skeleton className="size-10 rounded-md" />
          </div>
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Mental Health Tele logo"
              className="sm:h-9 h-6 w-auto object-contain"
            />
          </Link>
          <nav className="hidden md:flex flex-1 items-center justify-center gap-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
          </nav>
          <div className="ml-auto hidden md:flex items-center gap-2">
            <Skeleton className="h-10 w-28 rounded-md" />
            <Skeleton className="h-10 w-36 rounded-md" />
          </div>
        </div>
        <Separator />
      </header>
    );
  }

  if (headerError) {
    return (
      <header>
        <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Mental Health Tele logo"
              className="sm:h-9 h-6 w-auto"
            />
          </Link>
          <div className="hidden md:flex flex-1 items-center justify-center gap-2 text-sm text-destructive">
            <AlertCircle className="size-4" />
            <span>Failed to load navigation. Please refresh.</span>
          </div>
          {patientToken ? (
            <div
              className="ml-auto hidden lg:flex items-center gap-3 cursor-pointer"
              onClick={() => router("/dashboard")}
            >
              <Avatar className="size-10 border border-slate-100 bg-white">
                <AvatarFallback>
                  {user?.firstName?.charAt(0) || ""}
                  {user?.lastName?.charAt(0) || ""}
                </AvatarFallback>
              </Avatar>

              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-semibold">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </div>
          ) : (
            <div className="ml-auto hidden lg:flex items-center gap-2">
              <Link to="/login">
                <Button className="bg-accent ">
                  <img src={userIcon} alt="User Icon" className="size-4" />
                  <span className="text-gradient bg-gradient-primary">
                    Sign In
                  </span>
                </Button>
              </Link>
              <Link to="/onboarding">
                <Button className="bg-gradient-primary">
                  Get Started
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
        <Separator />
      </header>
    );
  }

  return (
    <header>
      <div className="container mx-auto flex flex-row-reverse lg:flex-row items-center justify-between gap-6 px-4 py-4">
        {/* mobile hamburger */}
        <div className="lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="p-2">
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[75vw] p-4">
              <nav className="flex flex-col gap-3">
                {navItems.map((nav: any) => {
                  const itemActive = pathname?.startsWith(nav.to);
                  return (
                    <div key={nav.label}>
                      <Link
                        to={nav.to}
                        className={cn(
                          "block font-medium",
                          itemActive && "text-primary",
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        {nav.label}
                      </Link>
                      {nav.items && nav.items.length > 0 && (
                        <div className="ml-4 mt-1 flex flex-col gap-1">
                          {nav.items.map((sub: any) => (
                            <Link
                              key={sub.to}
                              to={sub.to}
                              className={cn(
                                "block text-sm",
                                pathname?.startsWith(sub.to) && "text-primary",
                              )}
                              onClick={() => setMobileOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
              {patientToken ? (
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => router("/dashboard")}
                >
                  <Avatar className="size-10 border border-slate-100 bg-white">
                    <AvatarFallback>
                      {user?.firstName?.charAt(0) || ""}
                      {user?.lastName?.charAt(0) || ""}
                    </AvatarFallback>
                  </Avatar>

                  <div className="hidden sm:flex flex-col">
                    <span className="text-sm font-semibold">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex flex-col gap-2">
                  <Link
                    to={headerData?.header?.primaryCta?.url ?? "/login"}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Button className="w-full bg-accent text-primary">
                      <img src={userIcon} alt="User Icon" className="size-4" />
                      {headerData?.header?.primaryCta?.label ?? "Sign In"}
                    </Button>
                  </Link>
                  <Link
                    to={headerData?.header?.secondaryCta?.url ?? "/onboarding"}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Button className="w-full bg-gradient-primary">
                      {headerData?.header?.secondaryCta?.label ?? "Get Started"}
                    </Button>
                  </Link>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Mental Health Tele logo"
            className="sm:h-9 h-6 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex flex-1 items-center justify-center xl:gap-4 gap-1">
          {navItems.map((nav: any) => {
            const navActive = pathname?.startsWith(nav.to);

            return (
              <DropdownMenu key={nav.label}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn("px-3", navActive && "")}
                  >
                    <span className="mr-2">{nav.label}</span>
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start" className="w-48">
                  {nav.items.map((item: any) => {
                    const itemActive = pathname?.startsWith(item.to);

                    return (
                      <Link
                        key={item.to}
                        className={cn(itemActive && "text-primary")}
                        to={item.to}
                      >
                        <DropdownMenuItem>{item.label}</DropdownMenuItem>
                      </Link>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          })}
        </nav>

        {patientToken ? (
          <div
            className="ml-auto hidden lg:flex items-center gap-3 cursor-pointer"
            onClick={() => router("/dashboard")}
          >
            <Avatar className="size-10 border border-slate-100 bg-white">
              <AvatarFallback>
                {user?.firstName?.charAt(0) || ""}
                {user?.lastName?.charAt(0) || ""}
              </AvatarFallback>
            </Avatar>

            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-semibold">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>
        ) : (
          <div className="ml-auto hidden lg:flex items-center gap-2">
            <Link to={headerData?.header?.secondaryCta?.url ?? "/login"}>
              <Button className="bg-accent ">
                <img src={userIcon} alt="User Icon" className="size-4" />

                <span className="text-gradient bg-gradient-primary">
                  {headerData?.header?.secondaryCta?.label ?? "Sign In"}
                </span>
              </Button>
            </Link>

            <Link to={headerData?.header?.primaryCta?.url ?? "/onboarding"}>
              <Button className="bg-gradient-primary">
                {headerData?.header?.primaryCta?.label ?? "Get Started"}
                <ArrowRight />
              </Button>
            </Link>
          </div>
        )}
      </div>
      <Separator />
    </header>
  );
}
