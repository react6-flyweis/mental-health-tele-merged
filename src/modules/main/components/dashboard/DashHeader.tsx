"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, Suspense, useEffect } from "react";
import NotificationDrawer from "./NotificationDrawer";
import { useAuth } from "@/modules/main/context/auth.context";
import { useNavigate, useSearchParams, useLocation } from "react-router";

function DashHeaderContent() {
  const { user } = useAuth();
  const router = useNavigate();
  const pathName = useLocation();
  const hidePath = [
    "/dashboard/messages",
    "/dashboard/providers",
    "/dashboard/settings",
  ];
  const [searchParams] = useSearchParams();
  const [prevPath, setPrevPath] = useState(pathName);

  const [search, setSearch] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    router(`?${params.toString()}`);
  };
  useEffect(() => {
    if (prevPath !== pathName) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("q");

      router(pathName);
      setSearch("");
      setPrevPath(pathName);
    }
  }, [pathName]);
  useEffect(() => {
    setSearch(searchParams.get("q") || "");
  }, [searchParams]);
  return (
    <header className="w-full">
      <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-4">
        <div className="flex-1 flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          {hidePath.includes(pathName) ? null : (
            <InputGroup className=" max-w-sm h-10 border bg-muted/70 shadow-none">
              <InputGroupAddon className="pl-4">
                <Search className="size-4 text-muted-foreground" />
              </InputGroupAddon>

              <InputGroupInput
                placeholder="Search therapist, appointment, prescription..."
                className="pr-4"
                value={search}
                onChange={handleSearch}
              />
            </InputGroup>
          )}
        </div>

        <div className="flex items-center gap-5">
          <NotificationDrawer />

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router("/dashboard/settings")}
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
        </div>
      </div>
    </header>
  );
}

export default function DashHeader() {
  return (
    <Suspense fallback={<div className="w-full h-16 bg-muted animate-pulse" />}>
      <DashHeaderContent />
    </Suspense>
  );
}
