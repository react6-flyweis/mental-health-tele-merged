"use client";

import { useState } from "react";
import { settingApi } from "@/api/setting.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send } from "lucide-react";

export function MessageComposer({ chatId, fetchMessages }: { chatId: string; fetchMessages: () => void }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      setError("");

      await settingApi.sendMessage(
        { content:message },
        "patient",
        chatId
      );

      setMessage("");
      fetchMessages();

    } catch (err: any) {
      console.error("Send message error:", err);
      setError("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2 border-t p-3">
      <div className="flex items-center gap-2">
        
        <Button type="button" variant="ghost" size="icon-sm">
          <Paperclip className="size-4" />
        </Button>

        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="h-9 bg-muted"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />

        <Button
          type="button"
          className="bg-gradient-dash p-4"
          size="icon-sm"
          onClick={handleSendMessage}
          disabled={loading}
        >
          <Send className="size-4" />
        </Button>
      </div>

      {error && (
        <p className="text-red-500 text-xs ml-9">{error}</p>
      )}

      <p className="text-muted-foreground text-xs">
        All messages are encrypted and HIPAA compliant
      </p>
    </div>
  );
}