"use client";

import * as React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SetupStep } from "@/types";
import { cn } from "@/lib/utils";

interface GettingSetupCardProps {
  steps: SetupStep[];
  className?: string;
}

export function GettingSetupCard({ steps, className }: GettingSetupCardProps) {
  const total = steps.length;
  const completed = steps.filter((s) => s.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Ring geometry
  const size = 44;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <Card className={cn("border-border bg-card flex flex-col justify-between", className)}>
      <div>
        <CardHeader className="p-4 sm:p-5 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-foreground">
              Getting set up
            </CardTitle>
            <div className="relative inline-flex items-center justify-center">
              <svg width={size} height={size} className="-rotate-90 transform">
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  className="stroke-muted"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  className="stroke-brand transition-all duration-500"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span className="absolute text-[10px] font-bold text-foreground">
                {percentage}%
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            <span className="font-semibold text-foreground">{completed} of {total} done.</span>{" "}
            Keep going.
          </p>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 pt-0">
          <ul className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
            {steps.map((step) => (
              <li
                key={step.id}
                className={cn(
                  "flex items-center gap-2.5 text-xs py-1 rounded transition-colors",
                  step.completed ? "text-muted-foreground" : "text-foreground font-medium"
                )}
              >
                {step.completed ? (
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="size-4 text-muted-foreground/60 shrink-0" />
                )}
                <span className={cn(step.completed && "line-through opacity-80")}>
                  {step.label}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </div>
    </Card>
  );
}
