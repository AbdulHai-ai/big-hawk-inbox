"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  MessageSquare,
  Phone,
  Users,
  GitBranch,
  Calendar,
  BookOpen,
  Zap,
  Workflow,
  Radio,
  Bot,
  UserCog,
  Settings,
} from "lucide-react";
import { WorkspaceSwitcher } from "@/components/layout/WorkspaceSwitcher";
import { SetupProgressCard } from "@/components/layout/SetupProgressCard";
import { cn } from "@/lib/utils";

const SECTIONS = [
  {
    title: "WORKSPACE",
    items: [
      { label: "Overview", href: "/", icon: LayoutDashboard },
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
      { label: "Inbox", href: "/inbox", icon: MessageSquare },
      { label: "Calls", href: "/calls", icon: Phone },
      { label: "Contacts", href: "/contacts", icon: Users },
      { label: "Pipelines", href: "/pipelines", icon: GitBranch },
      { label: "Bookings", href: "/bookings", icon: Calendar },
    ],
  },
  {
    title: "BUILD",
    items: [
      { label: "Library", href: "/library", icon: BookOpen },
      { label: "Automations", href: "/automations", icon: Zap },
      { label: "Flows", href: "/flows", icon: Workflow },
      { label: "Broadcasts", href: "/broadcasts", icon: Radio },
      { label: "AI agents", href: "/ai-agents", icon: Bot },
    ],
  },
  {
    title: "MANAGE",
    items: [
      { label: "Team", href: "/team", icon: UserCog },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full flex-col justify-between overflow-hidden">
      <div className="p-3 pb-1 shrink-0 space-y-2.5">
        <div className="flex items-center gap-2.5 px-1.5 py-0.5">
          <div className="flex items-center justify-center size-7 rounded-md bg-brand text-brand-foreground font-bold text-xs tracking-wider shadow-xs shrink-0">
            BH
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-sm tracking-tight text-sidebar-foreground leading-tight">
              Big Hawk
            </span>
            <span className="text-[10px] text-muted-foreground leading-none">
              Inbox & CRM
            </span>
          </div>
        </div>
        <WorkspaceSwitcher />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-5">
        {SECTIONS.map((section) => (
          <div key={section.title} className="space-y-1">
            <h3 className="px-3 text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
              {section.title}
            </h3>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "group relative flex items-center gap-2.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                        : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[3px] rounded-r bg-brand" />
                    )}
                    <Icon
                      className={cn(
                        "size-4 shrink-0 transition-colors",
                        isActive ? "text-brand" : "text-muted-foreground group-hover:text-sidebar-foreground"
                      )}
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 pt-2 shrink-0">
        <SetupProgressCard />
      </div>
    </div>
  );
}

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "hidden lg:flex w-60 h-screen flex-col border-r border-sidebar-border bg-sidebar shrink-0 sticky top-0",
        className
      )}
    >
      <SidebarContent />
    </aside>
  );
}
