import { formatDate, slugify } from "@/lib/utils";

interface TitleProps {
  title: string;
  date: string;
}

export default function Title(props: TitleProps) {
  const { title, date } = props;

  return (
    <header className="mb-8 space-y-3 border-b border-neutral-200 pb-6 sm:mb-12 sm:space-y-4 sm:pb-8 dark:border-neutral-800">
      <h1
        style={{
          viewTransitionName: slugify(title),
        }}
        className="title text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
      >
        {title}
      </h1>
      <div className="flex items-center gap-4 text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">
        <time dateTime={date}>
          {formatDate(date, {
            month: "long",
          })}
        </time>
      </div>
    </header>
  );
}
