import type { Conversation } from "@/components/messages/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type MessagesSidebarProps = {
  chatList: Conversation[];
  activeConversationId?: string;
  onConversationSelect: (conversationId: string) => void;
  loading: boolean;
  error: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const getInitials = (name: string = "") => {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase();
};

export function MessagesSidebar({
  chatList,
  activeConversationId,
  onConversationSelect,
  loading,
  error,
  searchQuery,
  setSearchQuery,
}: MessagesSidebarProps) {
  console.log({ chatList });
  return (
    <aside className="h-full rounded-xl border bg-card">
      <div className="border-b p-3">
        <div className="relative">
          <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
          <Input
            placeholder="Search conversations..."
            className="h-9 bg-muted pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="h-105 overflow-y-auto md:h-140">
        {loading && (
          <p className="h-full flex justify-center items-center p-3 text-sm animate-pulse">
            Loading chats...
          </p>
        )}

        {error && (
          <p className="text-red-500 h-full flex justify-center items-center p-3 text-sm">
            {error}
          </p>
        )}

        {!loading && !error && chatList.length === 0 && (
          <p className="h-full flex justify-center items-center p-3 text-sm">
            No chats found
          </p>
        )}
        <div className="divide-y">
          {!loading &&
            chatList?.map((conversation: any) => {
              const isActive = activeConversationId === conversation.id;

              return (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => onConversationSelect(String(conversation.id))}
                  className={cn(
                    "w-full px-3 py-3 text-left transition-colors",
                    isActive ? "bg-muted/70" : "hover:bg-muted/40",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="mt-0.5 size-10">
                      <AvatarFallback>
                        {conversation.chatType === "patient-admin" ? (
                          conversation.counterparty?.name ? (
                            getInitials(conversation.counterparty?.name)
                          ) : (
                            "ST"
                          )
                        ) : conversation.providerId?.profileImageUrl ? (
                          <img
                            src={conversation.providerId.profileImageUrl}
                            alt={`${conversation.providerId.firstName} ${conversation.providerId.lastName}`}
                            className="size-full object-cover rounded-full"
                          />
                        ) : (
                          `${conversation.providerId?.firstName?.charAt(0) || ""}${
                            conversation.providerId?.lastName?.charAt(0) || ""
                          }`.toUpperCase()
                        )}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium">
                          {conversation.chatType === "patient-admin"
                            ? conversation.counterparty?.name
                            : `${conversation.providerId?.firstName || ""} ${conversation.providerId?.lastName || ""}`}
                        </p>
                        {conversation.updatedAt && (
                          <p className="text-muted-foreground shrink-0 text-xs">
                            {new Date(conversation.updatedAt).toLocaleString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        )}
                      </div>

                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {conversation.chatType === "patient-admin"
                          ? conversation.counterparty?.role
                          : conversation.providerId?.specialty}
                      </p>

                      <div className="mt-1 flex items-center justify-between gap-2">
                        <p className="text-muted-foreground line-clamp-1 text-xs">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unreadCount ? (
                          <Badge className="bg-gradient-dash h-5 min-w-5 rounded-full px-1.5 text-[10px]">
                            {conversation.unreadCount}
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
      </div>
    </aside>
  );
}
