"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DailyMetric, Period } from "@/types";
import { formatNumber, getPeriodDays } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface MessageActivityChartProps {
  metrics: DailyMetric[];
  period: Period;
  className?: string;
}

export function MessageActivityChart({
  metrics,
  period,
  className,
}: MessageActivityChartProps) {
  const days = getPeriodDays(period);

  const data = React.useMemo(() => {
    return metrics.slice(-days).map((m) => {
      const parts = m.date.split("-");
      const shortDate = `${parseInt(parts[1], 10)}/${parseInt(parts[2], 10)}`;
      return {
        date: m.date,
        shortDate,
        sent: m.messagesSent,
        received: m.messagesReceived,
        firstReplyMinutes: m.firstReplyMinutes,
      };
    });
  }, [metrics, days]);

  const totalSent = React.useMemo(
    () => data.reduce((acc, curr) => acc + curr.sent, 0),
    [data]
  );
  const totalReceived = React.useMemo(
    () => data.reduce((acc, curr) => acc + curr.received, 0),
    [data]
  );

  const validReplyTimes = data
    .map((d) => d.firstReplyMinutes)
    .filter((t): t is number => t !== null && t > 0);

  const avgFirstReply =
    validReplyTimes.length > 0
      ? `${Math.round(validReplyTimes.reduce((a, b) => a + b, 0) / validReplyTimes.length)}m`
      : "—";

  const isEmpty = totalSent === 0 && totalReceived === 0;

  return (
    <Card className={cn("border-border bg-card", className)}>
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-foreground">
            Message activity
          </CardTitle>
          <span className="text-xs text-muted-foreground">
            Total {formatNumber(totalSent + totalReceived)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 pt-2">
        <div className="relative h-[180px] w-full">
          {isEmpty && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-card/60 backdrop-blur-2xs">
              <span className="text-xs font-medium text-muted-foreground px-3 py-1 rounded-md bg-muted border border-border">
                No messages yet
              </span>
            </div>
          )}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.6} />
              <XAxis
                dataKey="shortDate"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                minTickGap={20}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--popover)",
                  borderColor: "var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "var(--popover-foreground)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
                labelStyle={{ fontWeight: 600, color: "var(--foreground)" }}
                formatter={(val: unknown) => [formatNumber(Number(val)), ""]}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ fontSize: "11px", paddingBottom: "8px" }}
              />
              <Bar dataKey="sent" name="Sent" fill="var(--brand)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="received" name="Received" fill="var(--muted-foreground)" opacity={0.5} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Three mini tiles */}
        <div className="mt-4 grid grid-cols-3 gap-2.5 pt-3 border-t border-border">
          <div className="rounded-lg bg-muted/40 p-2 text-center">
            <span className="text-[11px] font-medium text-muted-foreground block">
              Sent
            </span>
            <span className="text-sm sm:text-base font-bold text-foreground">
              {formatNumber(totalSent)}
            </span>
          </div>
          <div className="rounded-lg bg-muted/40 p-2 text-center">
            <span className="text-[11px] font-medium text-muted-foreground block">
              Received
            </span>
            <span className="text-sm sm:text-base font-bold text-foreground">
              {formatNumber(totalReceived)}
            </span>
          </div>
          <div className="rounded-lg bg-muted/40 p-2 text-center">
            <span className="text-[11px] font-medium text-muted-foreground block">
              First reply
            </span>
            <span className="text-sm sm:text-base font-bold text-foreground">
              {avgFirstReply}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
