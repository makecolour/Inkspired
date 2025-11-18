"use client";

import { Link } from "next-view-transitions";
import { useLanguage } from "@/contexts/language-context";
import { formatDate, slugify } from "@/lib/utils";
import type { MDXFileData } from "@/lib/blog";

interface HomeClientProps {
  posts: MDXFileData[];
}

export default function HomeClient({ posts }: HomeClientProps) {
  const { language } = useLanguage();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      {/* Hero Section */}
      <section className="mb-10 space-y-3 sm:mb-16 sm:space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {language === "en" ? "Welcome to Inkspired" : "Chào mừng đến với Inkspired"}
        </h1>
        <p className="text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-400 md:text-xl">
          {language === "en" 
            ? "This is simply a space to write. Sometimes it’s about tech, sometimes about literature or life, and sometimes just thoughts worth noting, or maybe not."
            : "Đây đơn giản là một không gian để viết. Đôi khi về công nghệ, đôi khi về văn học hoặc cuộc sống, và đôi khi chỉ là những suy nghĩ đáng để ghi lại, hoặc có thể không."
          }
        </p>
      </section>

      {/* Blog Posts */}
      <section className="space-y-6 sm:space-y-8">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          {language === "en" ? "Latest Posts" : "Bài viết mới nhất"}
        </h2>
        <div className="space-y-8 sm:space-y-12">
          {posts.map((post) => {
            const title = language === "vi" && post.metadata.titleVi 
              ? post.metadata.titleVi 
              : post.metadata.title;
            const description = language === "vi" && post.metadata.descriptionVi
              ? post.metadata.descriptionVi
              : post.metadata.description;

            return (
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
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
                      {description}
                    </p>
                    <time className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-500">
                      {formatDate(post.metadata.date)}
                    </time>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
