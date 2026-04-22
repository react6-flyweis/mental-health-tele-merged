"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import { dashboardApi } from "@/api/dashboard.service";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function StartChatModal({ fetchChatList }: { fetchChatList?: () => void }) {
  const [open, setOpen] = useState(false);
  const router = useNavigate();
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMyProviders = async () => {
    try {
      setLoading(true);

      const response: any = await dashboardApi.getProviders("patient");

      console.log("API RESPONSE 👉", response);

      const fetchedProviders =
        response?.providers ||
        response?.data?.data?.providers ||
        response?.data?.providers ||
        [];

      console.log("PROVIDERS 👉", fetchedProviders);

      setProviders(fetchedProviders);
    } catch (err: any) {
      console.log("Error fetching providers:", err);
      setError(err?.message || "Failed to fetch providers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      handleMyProviders();
    }
  }, [open]);

  const handleChat = async (providerId: string) => {
    try {
      const role =
        typeof localStorage !== "undefined"
          ? localStorage.getItem("role")?.toLowerCase()
          : "";

      const res: any = await dashboardApi.getMessageProvider(role || "", {
        providerId,
      });

      setOpen(false);

      router(
        `/dashboard/messages?chatId=${res?.chat?._id || res?.data?.chat?._id}`,
      );
      fetchChatList && fetchChatList();
    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  const [search, setSearch] = useState("");

const filteredProviders = providers.filter((item: any) =>
  `${item.firstName} ${item.lastName} ${item.specialty}`
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-gradient-dash">
        <Plus className="size-4" /> Start Chat
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden gap-0!">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Select Provider</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col">
  <div className="p-3 border-b">
    <input
      type="text"
      placeholder="Search providers..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full px-3 py-2 text-sm border rounded-md outline-none"
    />
  </div>

  <div className="max-h-120 overflow-y-auto divide-y">
    {loading ? (
      <p className="p-4 text-sm min-h-20 flex items-center justify-center">
        Loading...
      </p>
    ) : filteredProviders.length === 0 ? (
      <p className="p-4 text-sm min-h-20 flex items-center justify-center">
        No providers found
      </p>
    ) : (
      filteredProviders.map((item: any) => (
        <button
          key={item._id}
          onClick={() => handleChat(item._id)}
          className="w-full flex items-center gap-3 p-4 hover:bg-muted transition"
        >
          <Avatar className="size-10">
            <AvatarFallback>
              {item.firstName?.[0]}
              {item.lastName?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="text-left flex-1">
            <p className="text-sm font-medium">
              {item.firstName} {item.lastName}
            </p>
            <p className="text-xs text-muted-foreground">
              {item.specialty}
            </p>
          </div>
        </button>
      ))
    )}
  </div>
</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
