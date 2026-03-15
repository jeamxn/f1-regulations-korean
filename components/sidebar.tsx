"use client";

import type { CategoryGroup } from "@/lib/docs";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Sidebar({ categories }: { categories: CategoryGroup[] }) {
  const pathname = usePathname();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map((c) => [c.slug, true])),
  );

  const toggleCategory = (slug: string) => {
    setOpenCategories((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <nav className="flex flex-col gap-1 py-4">
      <Link href="/" className="mb-6 flex items-center gap-3 px-4 transition-opacity hover:opacity-80">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent font-mono text-sm font-bold text-white">
          F1
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">F1 규정집</div>
          <div className="text-xs text-muted">2026 한국어 번역</div>
        </div>
      </Link>

      {categories.map((category) => (
        <div key={category.slug} className="mb-1">
          <button
            onClick={() => toggleCategory(category.slug)}
            className="flex w-full items-center gap-2.5 rounded-lg px-4 py-2 text-left text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-surface text-[10px] font-bold text-muted">
              {category.icon}
            </span>
            <span className="flex-1">{category.name}</span>
            <svg
              className={`h-3.5 w-3.5 transition-transform ${openCategories[category.slug] ? "rotate-0" : "-rotate-90"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {openCategories[category.slug] && (
            <div className="mt-0.5 ml-4 flex flex-col gap-0.5 border-l border-border pl-4">
              {category.docs.map((doc) => {
                const href = `/docs/${doc.slug.join("/")}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "bg-accent/10 font-medium text-accent"
                        : "text-muted hover:bg-surface hover:text-foreground"
                    }`}>
                    {doc.frontmatter.title}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-surface lg:hidden">
      <svg className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}
