import type { Workspace, User } from "@/types";

export const mockUser: User = {
  name: "Ilyas Zaka",
  role: "Workspace admin",
  initials: "IZ",
};

export const mockWorkspace: Workspace = {
  id: "ws-1",
  name: "Ilyas Salon",
  type: "team",
  avatarInitial: "I",
  channelsConnected: [],
  setupProgress: 17,
  setupSteps: [
    { id: "step-1", label: "Connect a channel", completed: false },
    { id: "step-2", label: "Add first contact", completed: false },
    { id: "step-3", label: "Set business hours", completed: true },
    { id: "step-4", label: "Add a service", completed: true },
    { id: "step-5", label: "Customize inbox", completed: false },
    { id: "step-6", label: "Invite team member", completed: false },
    { id: "step-7", label: "Set up automations", completed: false },
    { id: "step-8", label: "Configure notifications", completed: false },
  ],
};

export function getMockWorkspace(): Workspace {
  return mockWorkspace;
}

export function getMockUser(): User {
  return mockUser;
}
