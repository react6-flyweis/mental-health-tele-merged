import type { Conversation } from "@/components/messages/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { X } from "lucide-react";

type ChatHeaderProps = {
  conversation: Conversation;
  onClose: () => void;
};

export function ChatHeader({ conversation }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarFallback>{conversation.avatarInitials}</AvatarFallback>
        </Avatar>

        <div>
          <p className="text-base font-medium">{conversation.providerName}</p>
          <p className="text-muted-foreground text-sm">
            {conversation.specialty}
          </p>
        </div>
      </div>
      {/* 
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="text-muted-foreground"
      >
        <X className="size-5" />
      </Button> */}
    </div>
  );
}
