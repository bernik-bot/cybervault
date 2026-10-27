import { createContentLoader } from "vitepress";

const EMOJI = /[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{20E3}]/gu;

function clean(text) {
  return text.replace(EMOJI, "").replace(/<[^>]+>/g, "").trim();
}

function pageTitle({ frontmatter, src }) {
  return clean(frontmatter.title || src.match(/^#\s+(.+)$/m)?.[1] || "");
}

function pageHeadings(src) {
  return [...src.matchAll(/^##\s+(.+)$/gm)].map((m) => clean(m[1])).filter(Boolean);
}

export default createContentLoader("**/*.md", {
  includeSrc: true,
  transform(raw) {
    const sections = {};
    const entries = [];
    let links = 0;
    let pages = 0;

    for (const page of raw) {
      const section = page.url.split("/")[1];
      if (!section) continue;

      const count = (page.src.match(/\]\(https?:\/\//g) || []).length;
      const entry = (sections[section] ??= { links: 0, pages: [] });

      entry.links += count;
      links += count;
      pages += 1;
      if (page.url !== `/${section}/`) {
        entry.pages.push({ title: pageTitle(page), url: page.url, links: count });
      }
      entries.push({
        title: pageTitle(page),
        url: page.url,
        links: count,
        headings: pageHeadings(page.src),
      });
    }

    for (const entry of Object.values(sections)) {
      entry.pages.sort((a, b) => b.links - a.links);
    }

    return { links, pages, sections, entries };
  },
});
