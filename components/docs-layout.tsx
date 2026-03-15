"use client";

import type { CategoryGroup } from "@/lib/docs";

import { useState } from "react";

import { MobileMenuButton, Sidebar } from "./sidebar";

export function DocsLayout({ categories, children }: { categories: CategoryGroup[]; children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="sticky top-0 z-50 flex h-14 items-center border-b border-border bg-background/80 px-4 backdrop-blur-xl lg:hidden">
        <MobileMenuButton onClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="ml-3 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-accent font-mono text-[10px] font-bold text-white">
            F1
          </div>
          <span className="text-sm font-semibold">F1 규정집</span>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="absolute top-0 left-0 h-full w-72 overflow-y-auto border-r border-border bg-background"
            onClick={(e) => e.stopPropagation()}>
            <Sidebar categories={categories} />
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-[1440px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto border-r border-border lg:block">
          <Sidebar categories={categories} />
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
