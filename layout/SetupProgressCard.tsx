"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { mockWorkspace } from "@/lib/mock/workspace";
import { cn } from "@/lib/utils";

interface SetupProgressCardProps {
  className?: string;
}

export function SetupProgressCard({ className }: SetupProgressCardProps) {
  const { setupProgress } = mockWorkspace;

  return (
    <div
      className={cn(
        "rounded-lg border border-sidebar-border bg-sidebar-accent/25 p-3 flex flex-col gap-2.5",
        className
      )}
    >
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-sidebar-foreground">Workspace setup</span>
        <span className="text-muted-foreground font-semibold">{setupProgress}%</span>
      </div>

      <Progress
        value={setupProgress}
        className="w-full [&_[data-slot=progress-indicator]]:bg-brand"
      />

      <p className="text-xs text-muted-foreground leading-snug">
        Next: connect WhatsApp, Instagram or Facebook
      </p>

      <Button
        size="sm"
        className="w-full h-7 text-xs font-medium bg-brand text-brand-foreground hover:bg-brand/90 cursor-pointer shadow-xs"
      >
        Continue setup
      </Button>
    </div>
  );
}
