"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { ChatWindow } from "@/modules/main/components/messages/ChatWindow";
import { MessagesSidebar } from "@/modules/main/components/messages/MessagesSidebar";
import { settingApi } from "@/api/setting.api";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchParams } from "react-router";
import { StartChatModal } from "@/modules/main/components/messages/StartChatModal";

function MessagesContent() {
  const [activeConversationId, setActiveConversationId] = useState<
    string | undefined
  >(undefined);
  const [searparams] = useSearchParams();
  const chatId = searparams.get("chatId");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatList, setChatList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const search = useDebounce(searchQuery, 500);
  const activeConversation = useMemo(
    () =>
      chatList.find(
        (item) => String(item.id || item._id) === String(activeConversationId),
      ),
    [activeConversationId, chatList],
  );

  const fetchChatList = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await settingApi.getChatList("patient", search);

      const normalizedChats = (res?.data?.chats || [])
        .filter((i: any) => i?.providerId)
        .map((chat: any) => ({
          ...chat,
          id: chat.id || chat._id,
        }));

      setChatList(normalizedChats);
    } catch (err: any) {
      console.error("Chat list error:", err);
      setError("Failed to load chats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatList();
  }, [search]);

  useEffect(() => {
    if (chatId) {
      setActiveConversationId(chatId);
    }
  }, [chatId]);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-medium">Messages</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Secure communication with your therapists
          </p>
        </div>
        <StartChatModal fetchChatList={fetchChatList} />
      </header>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div
          className={`${activeConversationId ? "hidden" : "block"} xl:block`}
        >
          <MessagesSidebar
            chatList={chatList}
            loading={loading}
            error={error}
            activeConversationId={activeConversationId}
            onConversationSelect={setActiveConversationId}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div
          className={`${activeConversationId ? "block" : "hidden"} xl:block`}
        >
          <ChatWindow
            activeConversation={activeConversation}
            chatId={activeConversation?.id}
            onCloseConversation={() => setActiveConversationId(undefined)}
          />
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div>Loading messages...</div>}>
      <MessagesContent />
    </Suspense>
  );
}
