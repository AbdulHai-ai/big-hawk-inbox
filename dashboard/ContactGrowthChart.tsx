"use client";

import * as React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DailyMetric, Period } from "@/types";
import { formatNumber, getPeriodDays, cn } from "@/lib/utils";

interface ContactGrowthChartProps {
  metrics: DailyMetric[];
  period: Period;
  className?: string;
}

type Mode = "total" | "new";

export function ContactGrowthChart({ metrics, period, className }: ContactGrowthChartProps) {
  const [mode, setMode] = React.useState<Mode>("total");
  const days = getPeriodDays(period);

  const data = React.useMemo(() => {
    return metrics.slice(-days).map((m) => {
      const parts = m.date.split("-");
      return {
        date: m.date,
        shortDate: `${parseInt(parts[1], 10)}/${parseInt(parts[2], 10)}`,
        total: m.totalContacts,
        new: m.newContacts,
      };
    });
  }, [metrics, days]);

  const latestTotal = data.length > 0 ? data[data.length - 1].total : 0;
  const totalNew = React.useMemo(() => data.reduce((acc, curr) => acc + curr.new, 0), [data]);
  const isEmpty = latestTotal === 0 && totalNew === 0;

  return (
    <Card className={cn("border-border bg-card", className)}>
      <CardHeader className="p-4 sm:p-5 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <CardTitle className="text-sm font-semibold text-foreground">
            Contact growth
          </CardTitle>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl sm:text-2xl font-bold text-foreground">
              {formatNumber(mode === "total" ? latestTotal : totalNew)}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              +{formatNumber(totalNew)} in {days} days
            </span>
          </div>
        </div>

        <div className="inline-flex items-center rounded-md border border-border bg-muted/40 p-0.5 text-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMode("total")}
            className={cn(
              "rounded px-2.5 py-1 text-xs font-medium transition-all cursor-pointer",
              mode === "total"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Total
          </button>
          <button
            type="button"
            onClick={() => setMode("new")}
            className={cn(
              "rounded px-2.5 py-1 text-xs font-medium transition-all cursor-pointer",
              mode === "new"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            New per day
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 pt-2">
        <div className="relative h-[220px] w-full">
          {isEmpty && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-card/60 backdrop-blur-2xs">
              <span className="text-xs font-medium text-muted-foreground px-3 py-1 rounded-md bg-muted border border-border">
                No contacts yet
              </span>
            </div>
          )}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="contactGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--brand)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="var(--brand)" stopOpacity={0.0} />
                </linearGradient>
              </defs>
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
                formatter={(val: unknown) => [
                  formatNumber(Number(val)),
                  mode === "total" ? "Total Contacts" : "New Contacts",
                ]}
              />
              <Area
                type="monotone"
                dataKey={mode}
                stroke="var(--brand)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#contactGradient)"
                dot={false}
                activeDot={{ r: 4, stroke: "var(--brand)", strokeWidth: 2, fill: "var(--background)" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
