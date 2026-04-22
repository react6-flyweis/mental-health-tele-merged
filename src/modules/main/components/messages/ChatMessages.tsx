import { MessageItem } from "@/components/messages/types";
import { cn } from "@/lib/utils";

type ChatMessagesProps = {
  messages: MessageItem[];
};

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-1 space-y-4 bg-gray-50 overflow-y-auto p-4">
      {messages?.map((message) => {
        const isPatientMessage = message.sender === "patient";

        return (
          <div
            key={message.id}
            className={cn(
              "max-w-[80%] w-fit",
              isPatientMessage ? "ml-auto" : "mr-auto",
            )}
          >
            <div
              className={cn(
                "rounded-lg border px-2 py-1.5 text-sm leading-6",
                isPatientMessage
                  ? "bg-gray-100 text-gray-800"
                  : "bg-card",
              )}
            >
              {message.text}
            </div>
            <p
  className={cn(
    "text-muted-foreground mt-1 text-xs",
    isPatientMessage ? "text-right" : "text-left",
  )}
>
{new Date(message.time).toLocaleString("en-IN", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
})}
</p>
          </div>
        );
      })}
    </div>
  );
}
