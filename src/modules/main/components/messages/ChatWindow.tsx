import type { Conversation } from "@/components/messages/types";
import { ChatHeader } from "@/components/messages/ChatHeader";
import { ChatMessages } from "@/components/messages/ChatMessages";
import { MessageComposer } from "@/components/messages/MessageComposer";
import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { settingApi } from "@/api/setting.api";

type ChatWindowProps = {
  activeConversation?: Conversation;
  onCloseConversation: () => void;
  chatId?: string;
};

export function ChatWindow({
  activeConversation,
  onCloseConversation,
  chatId,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sendMessageError, setSendMessageError] = useState<string | null>(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [conversationData, setConversationData] = useState<any>({});
  const fetchMessages = async () => {
    if (!chatId) return;

    try {
      setLoading(true);
      setError("");

      const res = await settingApi.getChatMessage("patient", chatId);

      const messagesData = res?.data?.chat?.messages || [];

      const formattedMessages = messagesData.map((msg: any) => ({
        id: msg._id,
        text: msg.content,
        sender: msg.senderType,
        time: msg.createdAt,
        isOwn: msg.senderType === "patient",
      }));
      const chat = res?.data?.chat;

      setConversationData({
        ...activeConversation,
        providerName: `${chat?.providerId?.firstName} ${chat?.providerId?.lastName}`,
        specialty: chat?.providerId?.specialty,
        image: chat?.providerId?.profileImageUrl,
        avatarInitials: `${chat?.providerId?.firstName[0]}${chat?.providerId?.lastName[0]}`,
      });
      setMessages(formattedMessages);
    } catch (err: any) {
      console.error("Get messages error:", err);
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  const handleSendMessage = async (content: string) => {
    if (!chatId) return;

    try {
      setIsSendingMessage(true);
      setSendMessageError(null);
      await settingApi.sendMessage({ content }, "patient", chatId);
      await fetchMessages();
    } catch (err: any) {
      setSendMessageError(err?.message || "Failed to send message");
      throw err;
    } finally {
      setIsSendingMessage(false);
    }
  };
  if (!activeConversation) {
    return (
      <section className="flex h-full min-h-155 items-center justify-center rounded-xl border bg-card p-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <MessageSquare className="text-muted-foreground size-14" />
          </div>
          <p className="text-base font-medium">Select a conversation</p>
          <p className="text-muted-foreground mt-2 text-sm">
            Choose a therapist from the list to start messaging
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="w-full flex h-full min-h-155 flex-col rounded-xl border bg-card">
      <ChatHeader
        conversation={conversationData}
        onClose={onCloseConversation}
      />
      <ChatMessages messages={messages} />
      <MessageComposer
        onSend={handleSendMessage}
        isSending={isSendingMessage}
        errorMessage={sendMessageError}
      />
    </section>
  );
}
