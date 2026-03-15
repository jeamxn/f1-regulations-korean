import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "docs");

export interface DocFrontmatter {
  title: string;
  chapter: number;
  category: string;
  categorySlug: string;
  description: string;
}

export interface DocMeta {
  slug: string[];
  frontmatter: DocFrontmatter;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface CategoryGroup {
  name: string;
  slug: string;
  docs: DocMeta[];
}

function getMdFiles(dir: string, basePath: string[] = []): { filePath: string; slug: string[] }[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: { filePath: string; slug: string[] }[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      files.push(...getMdFiles(path.join(dir, entry.name), [...basePath, entry.name]));
    } else if (entry.name.endsWith(".md")) {
      const nameWithoutExt = entry.name.replace(/\.md$/, "");
      files.push({
        filePath: path.join(dir, entry.name),
        slug: [...basePath, nameWithoutExt],
      });
    }
  }

  return files;
}

export function getAllDocs(): DocMeta[] {
  const files = getMdFiles(docsDirectory);
  return files
    .map(({ filePath, slug }) => {
      const content = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(content);
      return {
        slug,
        frontmatter: data as DocFrontmatter,
      };
    })
    .sort((a, b) => {
      if (a.frontmatter.categorySlug !== b.frontmatter.categorySlug) {
        return a.frontmatter.categorySlug.localeCompare(b.frontmatter.categorySlug);
      }
      return a.frontmatter.chapter - b.frontmatter.chapter;
    });
}

export function getDocsByCategory(): CategoryGroup[] {
  const docs = getAllDocs();
  const categoryMap = new Map<string, CategoryGroup>();

  const categoryOrder = ["technical-regulations", "sporting-regulations", "financial-regulations"];

  for (const doc of docs) {
    const key = doc.frontmatter.categorySlug;
    if (!categoryMap.has(key)) {
      categoryMap.set(key, {
        name: doc.frontmatter.category,
        slug: key,
        docs: [],
      });
    }
    categoryMap.get(key)!.docs.push(doc);
  }

  return categoryOrder.filter((slug) => categoryMap.has(slug)).map((slug) => categoryMap.get(slug)!);
}

export function getDocBySlug(slug: string[]): { frontmatter: DocFrontmatter; content: string } {
  const filePath = path.join(docsDirectory, ...slug) + ".md";
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    frontmatter: data as DocFrontmatter,
    content,
  };
}

export function getAllDocSlugs(): string[][] {
  const files = getMdFiles(docsDirectory);
  return files.map(({ slug }) => slug);
}

export function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match = headingRegex.exec(content);

  while (match !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, "")
      .replace(/\s+/g, "-");
    toc.push({ id, text, level });
    match = headingRegex.exec(content);
  }

  return toc;
}
