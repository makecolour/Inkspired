import { Link } from "next-view-transitions";

import { AUTHOR_NAME, AUTHOR_IMAGE_URL, GITHUB_URL } from "@/config/site";

export default function Header() {
  return (
    <header className="mb-10 flex flex-row place-content-between">
      <Link
        href="/"
        className={
          "flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
        }
      >
        blog
      </Link>
      {GITHUB_URL && AUTHOR_IMAGE_URL && (
        <span className="relative flex items-center gap-1 italic">
          by
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={AUTHOR_IMAGE_URL}
              loading="eager"
              alt={AUTHOR_NAME}
              className="relative mx-1 inline h-8 w-8 rounded-full"
            />
          </Link>
        </span>
      )}
    </header>
  );
}
