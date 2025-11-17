"use client";

import { Link } from "next-view-transitions";

import { AUTHOR_NAME, AUTHOR_IMAGE_URL, GITHUB_URL, SITE_NAME } from "@/config/site";
import { useLanguage } from "@/contexts/language-context";
import LanguageSwitcher from "./language-switcher";

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:gap-6">
      <div className="flex flex-row items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 transition-all"
        >
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold tracking-tight text-transparent transition-all group-hover:from-blue-700 group-hover:to-purple-700 sm:text-xl dark:from-blue-400 dark:to-purple-400">
            {SITE_NAME || "blog"}
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {GITHUB_URL && AUTHOR_IMAGE_URL && (
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group flex items-center gap-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={AUTHOR_IMAGE_URL}
                loading="eager"
                alt={AUTHOR_NAME}
                className="h-8 w-8 rounded-full border-2 border-neutral-200 transition-all group-hover:scale-105 group-hover:border-blue-500 sm:h-10 sm:w-10 dark:border-neutral-800 dark:group-hover:border-blue-400"
              />
              <span className="hidden text-sm italic text-neutral-600 transition-colors group-hover:text-blue-600 sm:inline dark:text-neutral-400 dark:group-hover:text-blue-400">
                by {AUTHOR_NAME}
              </span>
            </Link>
          )}
        </div>
      </div>
      <nav className="flex gap-4 border-b border-neutral-200 pb-3 sm:gap-6 dark:border-neutral-800">
        <Link
          href="/"
          className="text-sm font-medium text-neutral-600 transition-colors hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400"
        >
          {t.nav.home}
        </Link>
        <Link
          href="/blog"
          className="text-sm font-medium text-neutral-600 transition-colors hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400"
        >
          {t.nav.blog}
        </Link>
        <Link
          href="/about"
          className="text-sm font-medium text-neutral-600 transition-colors hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400"
        >
          {t.nav.about}
        </Link>
      </nav>
      </div>
    </header>
  );
}
