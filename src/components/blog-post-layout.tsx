"use client";

import type { ReactNode } from "react";
import { Link } from "next-view-transitions";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";

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

function ArrowUpIcon() {
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
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

export default function BlogPostLayout({ children }: Readonly<{ children: ReactNode }>) {
  const { t } = useLanguage();
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show button after scrolling down 300px
      setShowButton(scrollTop > 300);
      
      // Check if near bottom (within 800px of the bottom)
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      setIsNearBottom(distanceFromBottom < 800);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
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
      
      {/* Sticky scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 rounded-full bg-neutral-900 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 ${
          showButton && !isNearBottom ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUpIcon />
      </button>

      {/* Bottom navigation - appears when near bottom */}
      <div className={`mt-8 flex items-center justify-between transition-opacity duration-300 sm:mt-12 ${
        isNearBottom ? "opacity-100" : "opacity-0"
      }`}>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-900 sm:text-sm dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <ArrowLeftIcon />
          {t.blog.backToBlog}
        </Link>
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-900 sm:text-sm dark:text-neutral-400 dark:hover:text-neutral-100"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon />
          Back to top
        </button>
      </div>
    </div>
  );
}
