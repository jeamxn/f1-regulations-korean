"use client";

import type { TocItem } from "@/lib/docs";

import { useEffect, useState } from "react";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" },
    );

    for (const item of items) {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-24">
      <h4 className="mb-3 text-xs font-semibold tracking-wider text-muted uppercase">목차</h4>
      <ul className="flex flex-col gap-1 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block border-l-2 py-1 text-[13px] leading-snug transition-colors ${
                activeId === item.id
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
              style={{ paddingLeft: `${(item.level - 2) * 12 + 12}px` }}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
