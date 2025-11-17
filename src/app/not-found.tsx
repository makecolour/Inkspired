import { Link } from "next-view-transitions";

export default function NotFound() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center space-y-4 text-center sm:min-h-[400px] sm:space-y-6">
      <div className="space-y-2 sm:space-y-3">
        <h1 className="text-5xl font-bold text-neutral-900 sm:text-6xl dark:text-neutral-100">
          404
        </h1>
        <h2 className="text-xl font-semibold text-neutral-700 sm:text-2xl dark:text-neutral-300">
          Page Not Found
        </h2>
        <p className="px-4 text-sm text-neutral-600 sm:text-base dark:text-neutral-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 sm:px-6 sm:py-3 sm:text-base dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Back to Home
      </Link>
    </div>
  );
}
