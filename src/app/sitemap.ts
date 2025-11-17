import { promises as fs } from "fs";
import path from "path";

import { SITE_URL, LOCALES } from "@/config/site";

async function getNoteSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isFile() && (entry.name === "page.mdx" || entry.name.endsWith(".mdx")))
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name),
      );
      return path.dirname(relativePath);
    })
    .filter((slug, index, self) => self.indexOf(slug) === index) // Remove duplicates
    .map((slug) => slug.replace(/\\/g, "/"));
}

export default async function sitemap() {
  const notesDirectory = path.join(process.cwd(), "src", "app", "[lang]", "blog");
  const slugs = await getNoteSlugs(notesDirectory);

  // Generate URLs for each locale
  const notes = LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({
      url: `${SITE_URL}${locale}/blog/${slug}/`,
      lastModified: new Date().toISOString(),
    }))
  );

  const routes = LOCALES.flatMap((locale) => [
    {
      url: `${SITE_URL}${locale}`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${SITE_URL}${locale}/blog`,
      lastModified: new Date().toISOString(),
    },
  ]);

  return [...routes, ...notes];
}
