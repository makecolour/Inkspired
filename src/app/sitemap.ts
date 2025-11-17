import { promises as fs } from "fs";
import path from "path";

import { SITE_URL } from "@/config/site";
import { getBlogPosts } from "@/lib/blog";

export default async function sitemap() {
  const posts = getBlogPosts();

  const blogUrls = posts.map((post) => ({
    url: `${SITE_URL}blog/${post.slug}/`,
    lastModified: new Date(post.metadata.date).toISOString(),
  }));

  const routes = [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${SITE_URL}blog`,
      lastModified: new Date().toISOString(),
    },
  ];

  return [...routes, ...blogUrls];
}
