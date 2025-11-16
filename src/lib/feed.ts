import type { Metadata } from "next";
import { Feed } from "feed";

import {
  SITE_URL,
  AUTHOR_NAME,
  AUTHOR_EMAIL,
  AUTHOR_IMAGE_URL,
  COPYRIGHT_YEAR,
} from "@/config/site";
import type { MDXFileData } from "@/lib/blog";

export function generateFeed(posts: MDXFileData[], metadata: Metadata) {
  const feedOptions = {
    author: {
      name: AUTHOR_NAME,
      email: AUTHOR_EMAIL,
      link: SITE_URL,
    },
    description: metadata.description?.toString() || "",
    favicon: `${SITE_URL}favicon.ico`,
    feedLinks: { atom: `${SITE_URL}atom.xml`, rss: `${SITE_URL}rss.xml` },
    generator: "Feed for Node.js",
    id: SITE_URL,
    image: AUTHOR_IMAGE_URL || undefined,
    link: SITE_URL,
    title: metadata.title?.toString() || "",
    copyright: `All rights reserved ${COPYRIGHT_YEAR}, ${AUTHOR_NAME}`,
  };

  const feed = new Feed(feedOptions);

  for (const post of posts) {
    feed.addItem({
      date: new Date(post.metadata.date),
      description: post.metadata.description,
      id: `${SITE_URL}/blog/${post.slug}/`,
      link: `${SITE_URL}/blog/${post.slug}/`,
      title: post.metadata.title,
    });
  }

  return feed;
}
