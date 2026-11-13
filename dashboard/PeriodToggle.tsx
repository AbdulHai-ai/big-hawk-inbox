"use client";

import * as React from "react";
import type { Period } from "@/types";
import { cn } from "@/lib/utils";

interface PeriodToggleProps {
  period: Period;
  onPeriodChange: (p: Period) => void;
  className?: string;
}

const PERIOD_OPTIONS: Period[] = ["7D", "14D", "30D", "90D"];

export function PeriodToggle({
  period,
  onPeriodChange,
  className,
}: PeriodToggleProps) {
  return (
    <div
      role="group"
      aria-label="Select reporting period"
      className={cn(
        "inline-flex items-center rounded-lg border border-border bg-muted/40 p-1 text-xs",
        className
      )}
    >
      {PERIOD_OPTIONS.map((option) => {
        const isSelected = period === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onPeriodChange(option)}
            aria-pressed={isSelected}
            className={cn(
              "rounded-md px-3 py-1 font-medium transition-all cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              isSelected
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
