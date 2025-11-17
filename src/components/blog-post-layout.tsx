"use client";

import type { ReactNode } from "react";
import { Link } from "next-view-transitions";
import { useLanguage } from "@/contexts/language-context";

function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

export default function BlogPostLayout({ children }: { children: ReactNode }) {
  const { t } = useLanguage();

  return (
    <>
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-900 sm:mb-8 sm:text-sm dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        <ArrowLeftIcon />
        {t.blog.backToBlog}
      </Link>
      <article className="prose prose-sm prose-neutral max-w-none sm:prose-base dark:prose-invert prose-headings:scroll-mt-20 prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg sm:prose-h1:text-3xl sm:prose-h2:text-2xl sm:prose-h3:text-xl prose-a:font-medium prose-a:text-neutral-900 prose-a:no-underline prose-a:decoration-neutral-400 hover:prose-a:underline hover:prose-a:decoration-neutral-600 prose-code:text-sm prose-code:text-neutral-900 prose-pre:overflow-x-auto prose-pre:bg-neutral-50 prose-pre:border prose-pre:border-neutral-200 prose-img:rounded-lg dark:prose-headings:text-neutral-100 dark:prose-a:text-neutral-100 dark:prose-a:decoration-neutral-600 dark:hover:prose-a:decoration-neutral-400 dark:prose-code:text-neutral-100 dark:prose-pre:bg-neutral-900 dark:prose-pre:border-neutral-800">
        {children}
      </article>
    </>
  );
}
