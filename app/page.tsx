import { getDocsByCategory } from "@/lib/docs";

import Link from "next/link";

export default function Home() {
  const categories = getDocsByCategory();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent font-mono text-sm font-bold text-white">
              F1
            </div>
            <span className="text-sm font-semibold text-foreground">F1 규정집</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">2026</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-xs text-muted">2026 시즌 규정</span>
          </div>
          <h1 className="mb-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            FIA 포뮬러 원
            <br />
            <span className="text-muted">규정집 한국어 번역</span>
          </h1>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted">
            2026 FIA 포뮬러 원 월드 챔피언십의 기술, 스포츠, 재정 규정을 한국어로 번역하여 제공합니다.
          </p>
          {categories.length > 0 && (
            <Link
              href={`/docs/${categories[0].docs[0].slug.join("/")}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
              규정 읽기 시작
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}
        </div>
      </section>

      {/* Category Cards */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-2 text-sm font-semibold tracking-wider text-muted uppercase">규정 카테고리</h2>
        <p className="mb-10 text-2xl font-semibold tracking-tight text-foreground">
          {categories.length}가지 핵심 규정 영역
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/docs/${category.docs[0].slug.join("/")}`}
              className="group relative overflow-hidden rounded-xl border border-border bg-surface p-6 transition-all hover:border-border hover:bg-surface-hover">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 transition-opacity group-hover:opacity-100`}
              />
              <div className="relative">
                <div className={`mb-4 h-1 w-8 rounded-full ${category.accent}`} />
                <h3 className="mb-2 text-lg font-semibold text-foreground">{category.name}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">{category.docs.length}개 챕터</span>
                  <svg
                    className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Chapters */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-foreground">전체 목록</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <div key={category.slug}>
              <h3 className="mb-3 text-sm font-semibold text-muted">{category.name}</h3>
              <div className="flex flex-col gap-1">
                {category.docs.map((doc) => (
                  <Link
                    key={doc.slug.join("/")}
                    href={`/docs/${doc.slug.join("/")}`}
                    className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground">
                    <span className="mr-2 font-mono text-xs text-muted/50">
                      {String(doc.frontmatter.chapter).padStart(2, "0")}
                    </span>
                    {doc.frontmatter.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted">
              본 사이트는 FIA 공식 문서의 비공식 한국어 번역입니다. 정확한 내용은 FIA 원문을 참고하세요.
            </p>
            <p className="text-xs text-muted">f1.jeamxn.dev</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
