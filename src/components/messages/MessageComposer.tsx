import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send } from "lucide-react";

export function MessageComposer() {
  return (
    <div className="space-y-2 border-t p-3">
      <div className="flex items-center gap-2">
        <Button type="button" variant="ghost" size="icon-sm">
          <Paperclip className="size-4" />
        </Button>

        <Input placeholder="Type your message..." className="h-9 bg-muted" />

        <Button type="button" className="bg-gradient-dash" size="icon-sm">
          <Send className="size-4" />
        </Button>
      </div>

      {/* <p className="text-muted-foreground text-xs">
        All messages are encrypted and HIPAA compliant
      </p> */}
    </div>
  );
}
