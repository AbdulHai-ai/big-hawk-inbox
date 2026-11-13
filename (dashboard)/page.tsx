"use client";

import * as React from "react";
import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PeriodToggle } from "@/components/dashboard/PeriodToggle";
import { OverviewHeader } from "@/components/dashboard/OverviewHeader";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { ContactGrowthChart } from "@/components/dashboard/ContactGrowthChart";
import { MessageActivityChart } from "@/components/dashboard/MessageActivityChart";
import { NeedsAttentionCard } from "@/components/dashboard/NeedsAttentionCard";
import { ReachOutCard } from "@/components/dashboard/ReachOutCard";
import { GettingSetupCard } from "@/components/dashboard/GettingSetupCard";

import { USE_EMPTY_STATE } from "@/lib/config";
import { getMockMetrics, getMockHourlyActivity } from "@/lib/mock/metrics";
import { getMockConversations } from "@/lib/mock/conversations";
import { getMockWorkspace, getMockUser } from "@/lib/mock/workspace";
import { formatDateRange, getPeriodDays, subDays, exportToCsv } from "@/lib/utils";
import type { Period } from "@/types";

const FALLBACK_DATE = new Date("2026-11-14T00:00:00.000Z");

export default function OverviewPage() {
  const [period, setPeriod] = React.useState<Period>("14D");
  const [currentDate, setCurrentDate] = React.useState<Date>(FALLBACK_DATE);

  React.useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const metrics = React.useMemo(() => getMockMetrics(USE_EMPTY_STATE), []);
  const conversations = React.useMemo(() => getMockConversations(USE_EMPTY_STATE), []);
  const hourlyActivity = React.useMemo(() => getMockHourlyActivity(USE_EMPTY_STATE), []);
  const workspace = React.useMemo(() => getMockWorkspace(), []);
  const user = React.useMemo(() => getMockUser(), []);

  const days = getPeriodDays(period);
  const startDate = subDays(currentDate, days - 1);
  const dateRangeLabel = formatDateRange(startDate, currentDate);

  const handleExportCsv = () => {
    const periodMetrics = metrics.slice(-days);
    const exportData = periodMetrics.map((m) => ({
      Date: m.date,
      "Total Contacts": m.totalContacts,
      "New Contacts": m.newContacts,
      "Messages Sent": m.messagesSent,
      "Messages Received": m.messagesReceived,
      "Open Conversations": m.openConversations,
      "Replied Conversations": m.repliedConversations,
      "First Reply (mins)": m.firstReplyMinutes ?? "",
    }));
    exportToCsv(exportData, `big-hawk-metrics-${period.toLowerCase()}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Header Area */}
      <OverviewHeader
        metrics={metrics}
        period={period}
        workspace={workspace}
        user={user}
      />

      {/* 2. Controls Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-3">
          <PeriodToggle period={period} onPeriodChange={setPeriod} />
          <span className="text-xs font-medium text-muted-foreground">
            {dateRangeLabel}
          </span>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            className="h-8 text-xs font-medium cursor-pointer gap-1.5"
          >
            <Download className="size-3.5" />
            <span>Export CSV</span>
          </Button>

          <Link
            href="/analytics"
            className="text-xs font-medium text-brand hover:underline inline-flex items-center gap-1 group whitespace-nowrap"
          >
            <span>Every number, any period, in Analytics</span>
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* 3. Four Stat Cards */}
      <StatsRow
        metrics={metrics}
        period={period}
        conversations={conversations}
      />

      {/* 4. Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ContactGrowthChart metrics={metrics} period={period} />
        <MessageActivityChart metrics={metrics} period={period} />
      </div>

      {/* 5. Bottom Row: 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NeedsAttentionCard conversations={conversations} />
        <ReachOutCard hourlyActivity={hourlyActivity} />
        <GettingSetupCard steps={workspace.setupSteps} />
      </div>
    </div>
  );
}
