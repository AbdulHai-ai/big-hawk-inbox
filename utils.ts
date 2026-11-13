export { cn } from "cn"


import type { Period } from "@/types";

export function formatDate(date: Date): string {
  return date
    .toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();
}

export function formatDateRange(start: Date, end: Date): string {
  const startMonth = start.toLocaleDateString("en-US", { month: "short" });
  const startDay = start.getDate();
  const endMonth = end.toLocaleDateString("en-US", { month: "short" });
  const endDay = end.getDate();
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startYear !== endYear) {
    return `${startMonth} ${startDay}, ${startYear} \u2013 ${endMonth} ${endDay}, ${endYear}`;
  }
  return `${startMonth} ${startDay} \u2013 ${endMonth} ${endDay}, ${endYear}`;
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function getGreetingPeriod(date?: Date): "morning" | "afternoon" | "evening" {
  const hour = (date ?? new Date()).getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

export function getGreeting(name: string, date?: Date): string {
  const period = getGreetingPeriod(date);
  if (period === "morning") return `Good morning, ${name}.`;
  if (period === "afternoon") return `Good afternoon, ${name}.`;
  return `Good evening, ${name}.`;
}

export function exportToCsv(
  data: Record<string, string | number | null>[],
  filename: string
): void {
  if (typeof window === "undefined" || !data.length) return;
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers
      .map((header) => {
        const val = row[header];
        if (val === null || val === undefined) return '""';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      })
      .join(",")
  );
  const csvContent = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getPeriodDays(period: Period): number {
  switch (period) {
    case "7D":
      return 7;
    case "14D":
      return 14;
    case "30D":
      return 30;
    case "90D":
      return 90;
    default:
      return 7;
  }
}

export function subDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}
