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
      <div className="space-y-12">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="group block"
          >
            <div className="flex w-full flex-col space-y-3">
              <p
                style={{
                  viewTransitionName: slugify(post.metadata.title),
                }}
                className="text-lg font-medium group-hover:underline group-hover:decoration-neutral-400 group-hover:underline-offset-4 group-hover:dark:decoration-neutral-600"
              >
                {post.metadata.title.toLowerCase()}
              </p>
              <p className="prose prose-neutral dark:prose-invert">
                {post.metadata.description.toLowerCase()}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(post.metadata.date).toLowerCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
