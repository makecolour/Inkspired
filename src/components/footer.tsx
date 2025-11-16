import { Link } from "next-view-transitions";

import { GITHUB_URL, LINKEDIN_URL } from "@/config/site";

function getLinks() {
  const links: { name: string; url: string }[] = [];
  if (LINKEDIN_URL) links.push({ name: "linkedin", url: LINKEDIN_URL });
  if (GITHUB_URL) links.push({ name: "github", url: GITHUB_URL });
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
      className="h-5 w-5"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export default function Footer() {
  const links = getLinks();

  return (
    <footer className="mt-12 text-center">
      <ul className="font-sm flex flex-col space-y-3 space-x-0 text-neutral-600 sm:flex-row sm:space-y-0 sm:space-x-6 dark:text-neutral-300">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center text-sm transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            >
              {link.name}
              <UpRightArrowIcon />
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
