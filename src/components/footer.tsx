"use client";

import { Link } from "next-view-transitions";

import { GITHUB_URL, LINKEDIN_URL, AUTHOR_NAME, COPYRIGHT_YEAR } from "@/config/site";
import { useLanguage } from "@/contexts/language-context";

function getLinks() {
  const links: { name: string; url: string }[] = [];
  if (LINKEDIN_URL) links.push({ name: "LinkedIn", url: LINKEDIN_URL });
  if (GITHUB_URL) links.push({ name: "GitHub", url: GITHUB_URL });
  return links;
}

function UpRightArrowIcon() {
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
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export default function Footer() {
  const links = getLinks();
  const { t } = useLanguage();

  return (
    <footer className="mt-12 border-t border-neutral-200 pt-6 sm:mt-16 sm:pt-8 dark:border-neutral-800">
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        {links.length > 0 && (
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-1 text-sm font-medium text-neutral-600 transition-all hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                {link.name}
                <UpRightArrowIcon />
              </Link>
            ))}
          </nav>
        )}
        <div className="flex flex-col items-center gap-2 text-center text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">
          <p>
            © {COPYRIGHT_YEAR} {AUTHOR_NAME}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
