export interface Workspace {
  id: string;
  name: string;
  type: "team" | "personal";
  avatarInitial: string;
  channelsConnected: string[];
  setupProgress: number; // 0-100
  setupSteps: SetupStep[];
}

export interface SetupStep {
  id: string;
  label: string;
  completed: boolean;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  tags: string[];
  createdAt: string; // ISO date
  avatarInitial: string;
}

export interface Conversation {
  id: string;
  contactId: string;
  contactName: string;
  contactAvatarInitial: string;
  lastMessage: string;
  lastMessageAt: string; // ISO date
  status: "open" | "closed";
  assignedTo?: string;
  channel: "whatsapp" | "instagram" | "facebook" | "sms" | "email";
  unread: boolean;
}

export interface DailyMetric {
  date: string; // YYYY-MM-DD
  totalContacts: number;
  newContacts: number;
  messagesSent: number;
  messagesReceived: number;
  openConversations: number;
  repliedConversations: number;
  firstReplyMinutes: number | null;
}

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  direction: "inbound" | "outbound";
  timestamp: string; // ISO date
  channel: "whatsapp" | "instagram" | "facebook" | "sms" | "email";
}

export interface HourlyActivity {
  hour: number; // 0-23
  count: number;
}

export type Period = "7D" | "14D" | "30D" | "90D";

export interface User {
  name: string;
  role: string;
  initials: string;
}
