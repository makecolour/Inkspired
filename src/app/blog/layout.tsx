import type { ReactNode } from "react";
import { Link } from "next-view-transitions";

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

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="blog-layout-wrapper">
      {children}
    </div>
  );
}
