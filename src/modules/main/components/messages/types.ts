export type Sender = "provider" | "patient";

export type MessageItem = {
  id: string;
  sender: Sender;
  text: string;
  time: string;
};

export type Conversation = {
  lastMessage: string;
  lastMessageAt: string | number | Date;
  providerId: any;
  id: string;
  providerName: string;
  specialty: string;
  avatarInitials: string;
  previewText: string;
  previewTime: string;
  unreadCount?: number;
  messages: MessageItem[];
  image?: string;
};
