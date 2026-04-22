import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type ChatHeaderProps = {
  conversation: any;
  onClose: () => void;
};

const getInitials = (name: string = "") =>
  name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

export function ChatHeader({ conversation, onClose }: ChatHeaderProps) {
  const isPatientAdmin = conversation.chatType === "patient-admin";

  const name = isPatientAdmin
    ? conversation.counterparty?.name
    : `${conversation.providerId?.firstName || ""} ${conversation.providerId?.lastName || ""}`;

  const specialty = isPatientAdmin
    ? conversation.counterparty?.role
    : conversation.providerId?.specialty;

  const image = isPatientAdmin
    ? conversation.counterparty?.profileImageUrl
    : conversation.providerId?.profileImageUrl;

  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          {image && (
            <AvatarImage src={image} alt={name} className="object-cover" />
          )}

          <AvatarFallback>
            {getInitials(name || "U")}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="text-base font-medium">{name}</p>
          <p className="text-muted-foreground text-sm">{specialty}</p>
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="text-muted-foreground xl:hidden"
      >
        <X className="size-5" />
      </Button>
    </div>
  );
}