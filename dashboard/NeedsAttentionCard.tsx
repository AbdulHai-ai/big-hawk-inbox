"use client";

import * as React from "react";
import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EmptyState } from "@/components/shared/EmptyState";
import type { Conversation } from "@/types";
import { cn } from "@/lib/utils";

interface NeedsAttentionCardProps {
  conversations: Conversation[];
  className?: string;
}

const FIXED_BASE_TIME = new Date("2026-11-14T01:00:00.000Z").getTime();

function getRelativeTime(isoDate: string, now: number): string {
  try {
    const diffMs = Math.max(0, now - new Date(isoDate).getTime());
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  } catch {
    return "";
  }
}

export function NeedsAttentionCard({
  conversations,
  className,
}: NeedsAttentionCardProps) {
  const [now, setNow] = React.useState<number>(FIXED_BASE_TIME);

  React.useEffect(() => {
    setNow(Date.now());
  }, []);

  const openConvs = conversations.filter((c) => c.status === "open").slice(0, 5);

  return (
    <Card className={cn("border-border bg-card flex flex-col justify-between", className)}>
      <div>
        <CardHeader className="p-4 sm:p-5 pb-3 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-semibold text-foreground">
            Needs attention
          </CardTitle>
          <Link
            href="/inbox"
            className="text-xs font-medium text-brand hover:underline inline-flex items-center gap-1 group"
          >
            <span>Open inbox</span>
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 pt-0">
          {openConvs.length === 0 ? (
            <EmptyState
              icon={MessageSquare}
              title="All caught up!"
              description="No open conversations need attention right now."
              className="py-8 border-none bg-transparent"
            />
          ) : (
            <div className="divide-y divide-border/60">
              {openConvs.map((conv) => (
                <div
                  key={conv.id}
                  className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-3 group hover:bg-muted/30 rounded-md px-1 transition-colors"
                >
                  <Avatar className="size-8 rounded-full bg-brand/10 text-brand text-xs font-semibold shrink-0 mt-0.5">
                    <AvatarFallback className="bg-brand/10 text-brand font-semibold text-xs">
                      {conv.contactAvatarInitial}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold text-foreground truncate">
                        {conv.contactName}
                      </span>
                      <span className="text-[10px] text-muted-foreground shrink-0">
                        {getRelativeTime(conv.lastMessageAt, now)}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {conv.lastMessage}
                    </p>
                  </div>

                  {conv.unread && (
                    <span className="size-2 rounded-full bg-brand shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
