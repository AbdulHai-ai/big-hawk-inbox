"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  Moon,
  Sun,
  Bell,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { mockUser } from "@/lib/mock/workspace";

export function Topbar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const pageName = React.useMemo(() => {
    if (pathname === "/" || !pathname) return "Overview";
    const segment = pathname.split("/").filter(Boolean)[0] || "";
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
  }, [pathname]);

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-border bg-background/95 backdrop-blur-xs px-4 lg:px-6 shrink-0">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <Breadcrumb className="hidden sm:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Workspace</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{pageName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="relative hidden md:flex items-center w-48 lg:w-60">
          <Search className="absolute left-2.5 size-3.5 text-muted-foreground pointer-events-none" />
          <Input
            ref={searchInputRef}
            type="search"
            placeholder="Search..."
            className="h-8 pl-8 pr-12 text-xs bg-muted/40 focus-visible:bg-background"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-4 select-none items-center rounded border border-border bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground">
            Ctrl K
          </kbd>
        </div>

        <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Online</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle dark mode"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="text-muted-foreground hover:text-foreground cursor-pointer"
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <Bell className="size-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg p-1 hover:bg-muted/60 transition-colors cursor-pointer text-left outline-none"
              >
                <Avatar className="size-7 bg-muted text-foreground flex items-center justify-center font-medium">
                  <AvatarFallback className="text-xs font-semibold">{mockUser.initials}</AvatarFallback>
                </Avatar>
                <div className="hidden xl:flex flex-col leading-none">
                  <span className="text-xs font-medium text-foreground">{mockUser.name}</span>
                  <span className="text-[10px] text-muted-foreground">{mockUser.role}</span>
                </div>
                <ChevronDown className="size-3 text-muted-foreground hidden sm:block" />
              </button>
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="text-xs cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-xs cursor-pointer">Workspace settings</DropdownMenuItem>
            <DropdownMenuItem className="text-xs cursor-pointer" variant="destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Log out"
          className="text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
