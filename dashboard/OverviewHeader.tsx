"use client";

import * as React from "react";
import type { DailyMetric, Period, Workspace, User } from "@/types";
import { formatDate, getGreetingPeriod, formatNumber, getPeriodDays } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface OverviewHeaderProps {
  metrics: DailyMetric[];
  period: Period;
  workspace: Workspace;
  user: User;
}

const FALLBACK_DATE = new Date("2026-11-14T09:00:00.000Z");

export function OverviewHeader({
  metrics,
  period,
  workspace,
  user,
}: OverviewHeaderProps) {
  const [currentDate, setCurrentDate] = React.useState<Date>(FALLBACK_DATE);

  React.useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const days = getPeriodDays(period);
  const totalMessages = React.useMemo(() => {
    const periodSlice = metrics.slice(-days);
    return periodSlice.reduce(
      (sum, m) => sum + m.messagesSent + m.messagesReceived,
      0
    );
  }, [metrics, days]);

  const greetingPeriod = getGreetingPeriod(currentDate);
  const dateStr = formatDate(currentDate);
  const firstName = user.name.split(" ")[0] || user.name;

  return (
    <div className="flex flex-col gap-1.5 sm:gap-2">
      {/* Date line */}
      <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
        {dateStr}
      </span>

      {/* Greeting with brand accent period */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground capitalize">
        Good {greetingPeriod}, {firstName}
        <span className="text-brand font-black">.</span>
      </h1>

      {/* Summary sentence */}
      <p className="text-xs sm:text-sm text-muted-foreground">
        You exchanged{" "}
        <span className="font-semibold text-foreground">
          {formatNumber(totalMessages)}
        </span>{" "}
        messages in the last {days} days.
      </p>

      {/* Channel status banner */}
      {workspace.channelsConnected.length === 0 && (
        <div className="mt-1 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
          <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>No channels connected yet</span>
        </div>
      )}
    </div>
  );
}
