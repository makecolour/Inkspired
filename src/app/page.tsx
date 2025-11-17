import type { Metadata } from "next";
import { Link } from "next-view-transitions";

import { getBlogPosts } from "@/lib/blog";
import { formatDate, slugify } from "@/lib/utils";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  AUTHOR_NAME,
} from "@/config/site";
import HomeClient from "@/components/home-client";

const defaultTitle = `${SITE_NAME} — A blog by ${AUTHOR_NAME}`;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  title: defaultTitle,
  description: SITE_DESCRIPTION,
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  author: {
    "@type": "Person",
    name: AUTHOR_NAME,
    url: SITE_URL,
  },
};

export default function Home() {
  const posts = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient posts={posts} />
    </>
  );
}
