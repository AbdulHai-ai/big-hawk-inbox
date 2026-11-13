import * as React from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PlaceholderPageProps {
  title: string;
  description: string;
  phase?: string;
}

export function PlaceholderPage({
  title,
  description,
  phase = "Phase 2",
}: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 sm:p-12 max-w-lg mx-auto">
      <div className="flex items-center justify-center size-14 rounded-2xl bg-muted/60 text-muted-foreground mb-4 border border-border shadow-xs">
        <Clock className="size-6 text-brand" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      <div className="mt-6 flex items-center gap-2">
        <Badge
          variant="outline"
          className="px-3 py-1 text-xs font-medium border-brand/30 bg-brand/5 text-brand"
        >
          Arrives in {phase}
        </Badge>
      </div>
    </div>
  );
}
