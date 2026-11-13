"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockWorkspace } from "@/lib/mock/workspace";
import { cn } from "@/lib/utils";

interface WorkspaceSwitcherProps {
  className?: string;
}

export function WorkspaceSwitcher({ className }: WorkspaceSwitcherProps) {
  const workspace = mockWorkspace;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 p-2.5 rounded-lg border border-sidebar-border bg-sidebar-accent/30 hover:bg-sidebar-accent/60 cursor-pointer transition-colors select-none",
        className
      )}
      role="button"
      tabIndex={0}
      aria-label={`Current workspace: ${workspace.name}`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <Avatar className="size-8 rounded-lg bg-brand text-brand-foreground flex items-center justify-center font-semibold shrink-0">
          <AvatarFallback className="bg-brand text-brand-foreground rounded-lg font-semibold text-sm">
            {workspace.avatarInitial}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0 leading-tight text-left">
          <span className="truncate text-sm font-semibold text-sidebar-foreground">
            {workspace.name}
          </span>
          <span className="truncate text-xs text-muted-foreground capitalize">
            {workspace.type} workspace
          </span>
        </div>
      </div>
      <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
    </div>
  );
}
