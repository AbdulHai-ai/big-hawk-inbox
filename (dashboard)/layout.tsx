import * as React from "react";
import { Suspense } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Suspense fallback={<aside className="hidden lg:flex w-60 h-screen border-r border-sidebar-border bg-sidebar shrink-0 sticky top-0" />}>
        <Sidebar />
      </Suspense>
      <div className="flex flex-1 flex-col min-w-0">
        <Suspense fallback={<header className="sticky top-0 z-30 flex h-14 w-full border-b border-border bg-background" />}>
          <Topbar />
        </Suspense>
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <Suspense fallback={<div className="p-8 text-center text-xs text-muted-foreground">Loading...</div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
