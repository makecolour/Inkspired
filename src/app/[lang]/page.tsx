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
      
      {/* Hero Section */}
      <section className="mb-10 space-y-3 sm:mb-16 sm:space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Welcome to Inkspired
        </h1>
        <p className="text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-400 md:text-xl">
          A space where ideas meet expression. Blending personal writing, 
          practical tips, and in-depth technical lectures for curious minds 
          who love both art and technology.
        </p>
      </section>

      {/* Blog Posts */}
      <section className="space-y-6 sm:space-y-8">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Latest Posts</h2>
        <div className="space-y-8 sm:space-y-12">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link
                href={`/blog/${post.slug}/`}
                className="block rounded-lg border border-neutral-200 bg-white p-5 transition-all hover:shadow-lg hover:border-neutral-300 sm:p-6 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
              >
                <div className="flex w-full flex-col space-y-2 sm:space-y-3">
                  <h3
                    style={{
                      viewTransitionName: slugify(post.metadata.title),
                    }}
                    className="text-lg font-semibold leading-tight tracking-tight transition-colors group-hover:text-blue-600 sm:text-xl dark:group-hover:text-blue-400"
                  >
                    {post.metadata.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
                    {post.metadata.description}
                  </p>
                  <time className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-500">
                    {formatDate(post.metadata.date)}
                  </time>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
