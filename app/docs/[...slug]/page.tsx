import { DocsLayout } from "@/components/docs-layout";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TableOfContents } from "@/components/toc";
import { extractToc, getAllDocSlugs, getDocBySlug, getDocsByCategory } from "@/lib/docs";

import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = getDocBySlug(slug);
  return {
    title: `${frontmatter.title} - ${frontmatter.category} | F1 규정집`,
    description: frontmatter.description,
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const { frontmatter, content } = getDocBySlug(slug);
  const categories = getDocsByCategory();
  const toc = extractToc(content);

  return (
    <DocsLayout categories={categories}>
      <div className="flex">
        <article className="min-w-0 flex-1 px-8 py-10 lg:px-12 lg:py-12">
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                {frontmatter.category}
              </span>
              <span className="text-xs text-muted">제{frontmatter.chapter}장</span>
            </div>
            <p className="text-sm text-muted">{frontmatter.description}</p>
          </div>
          <MarkdownRenderer content={content} />
        </article>

        {/* Right TOC */}
        <aside className="hidden w-56 shrink-0 px-4 pt-12 xl:block">
          <TableOfContents items={toc} />
        </aside>
      </div>
    </DocsLayout>
  );
}
