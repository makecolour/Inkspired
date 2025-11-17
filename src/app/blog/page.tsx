import type { Metadata } from "next";
import { Link } from "next-view-transitions";

import { getBlogPosts } from "@/lib/blog";
import { formatDate, slugify } from "@/lib/utils";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  AUTHOR_NAME,
} from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `All posts from ${SITE_NAME}`,
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndex() {
  const posts = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
    <div className="space-y-6 sm:space-y-8">
      <header className="space-y-3 sm:space-y-4">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          All Posts
        </h1>
        <p className="text-sm text-neutral-600 sm:text-base dark:text-neutral-400">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} and counting...
        </p>
      </header>

      <div className="space-y-8 sm:space-y-12">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link
              href={`/blog/${post.slug}/`}
              className="block rounded-lg border border-neutral-200 bg-white p-5 transition-all hover:shadow-lg hover:border-neutral-300 sm:p-6 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
            >
              <div className="flex w-full flex-col space-y-2 sm:space-y-3">
                <h2
                  style={{
                    viewTransitionName: slugify(post.metadata.title),
                  }}
                  className="text-lg font-semibold leading-tight tracking-tight transition-colors group-hover:text-blue-600 sm:text-xl dark:group-hover:text-blue-400"
                >
                  {post.metadata.title}
                </h2>
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
    </div>
    </div>
  );
}
