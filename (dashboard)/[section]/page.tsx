import * as React from "react";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

interface SectionMeta {
  title: string;
  description: string;
  phase: string;
}

const SECTION_MAP: Record<string, SectionMeta> = {
  analytics: {
    title: "Analytics",
    description: "Deep dive into messaging metrics, conversion rates, and contact growth.",
    phase: "Phase 2",
  },
  inbox: {
    title: "Inbox",
    description: "Unified multi-channel inbox for WhatsApp, Instagram, Facebook, SMS, and email.",
    phase: "Phase 2",
  },
  calls: {
    title: "Calls",
    description: "Track inbound and outbound voice calls, listen to recordings, and view call summaries.",
    phase: "Phase 3",
  },
  contacts: {
    title: "Contacts",
    description: "Customer database with tags, custom fields, appointment history, and segmentation.",
    phase: "Phase 2",
  },
  pipelines: {
    title: "Pipelines",
    description: "Visual stage tracking for bookings, bridal consultations, and client follow-ups.",
    phase: "Phase 3",
  },
  bookings: {
    title: "Bookings",
    description: "Appointment scheduling calendar with automated reminders and staff availability.",
    phase: "Phase 3",
  },
  library: {
    title: "Library",
    description: "Pre-written reply templates, canned responses, and shared media assets.",
    phase: "Phase 2",
  },
  automations: {
    title: "Automations",
    description: "Event-based triggers, auto-replies, appointment reminders, and follow-up sequences.",
    phase: "Phase 3",
  },
  flows: {
    title: "Flows",
    description: "Interactive visual conversation flow builder for booking bots and qualifying leads.",
    phase: "Phase 3",
  },
  broadcasts: {
    title: "Broadcasts",
    description: "Bulk marketing campaigns and promotional announcements targeted by contact tag.",
    phase: "Phase 2",
  },
  "ai-agents": {
    title: "AI Agents",
    description: "Autonomous AI receptionist to answer FAQs, check availability, and capture bookings 24/7.",
    phase: "Phase 3",
  },
  team: {
    title: "Team",
    description: "Manage staff members, roles, channel assignment permissions, and working hours.",
    phase: "Phase 2",
  },
  settings: {
    title: "Settings",
    description: "Workspace configuration, channel API integrations, notification rules, and billing.",
    phase: "Phase 2",
  },
};

export function generateStaticParams() {
  return Object.keys(SECTION_MAP).map((section) => ({
    section,
  }));
}

interface PageProps {
  params: Promise<{
    section: string;
  }>;
}

export default async function SectionPage({ params }: PageProps) {
  const { section } = await params;
  const meta = SECTION_MAP[section] ?? {
    title: section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, " "),
    description: "This module is part of the Big Hawk Inbox roadmap.",
    phase: "Phase 2",
  };

  return (
    <PlaceholderPage
      title={meta.title}
      description={meta.description}
      phase={meta.phase}
    />
  );
}
