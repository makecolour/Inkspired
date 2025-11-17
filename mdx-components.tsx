import {
  Children,
  createElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type HtmlHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { Link } from "next-view-transitions";
import type { MDXComponents } from "mdx/types";
import { codeToHtml, type ShikiTransformer } from "shiki";
import {
  transformerNotationFocus,
  transformerNotationHighlight,
} from "@shikijs/transformers";

import { slugify } from "@/lib/utils";
import CopyButton from "@/components/copy-button";
import BlogPostLayout from "@/components/blog-post-layout";

type AnchorProps = ComponentPropsWithoutRef<"a">;
type HeadingProps = ComponentPropsWithoutRef<"h1">;
type StrongProps = ComponentPropsWithoutRef<"strong">;

function CopyLinkIcon() {
  return (
    <svg
      className="octicon octicon-link"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      height="16"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path>
    </svg>
  );
}

const generateAnchorId = (children: ReactNode): string => {
  if (typeof children === "string") {
    return slugify(children);
  }

  let id = "";

  for (const child of Children.toArray(children)) {
    if (typeof child === "string") {
      id += child;
    } else if (isValidElement<{ children?: ReactNode }>(child)) {
      id += generateAnchorId(child.props.children);
    }
  }

  return slugify(id);
};

const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  // eslint-disable-next-line react/display-name
  return ({ children, id, ...props }: HeadingProps) => {
    const anchorId = id || generateAnchorId(children);

    return createElement(
      `h${level}`,
      { ...props, className: "blog-heading font-semibold", id: anchorId },
      [
        children,
        <a
          key="anchor"
          aria-label={`Permalink: ${anchorId}`}
          href={`#${anchorId}`}
          className="anchor"
        >
          <CopyLinkIcon />
        </a>,
      ],
    );
  };
};

export function transformerEmptyLine(): ShikiTransformer {
  return {
    line(node, line) {
      if (node.children.length === 0 && this.tokens.length !== line) {
        node.children.push({
          type: "text",
          value: " ",
        });
      }
    },
  };
}

async function Pre({ children, ...props }: HtmlHTMLAttributes<HTMLPreElement>) {
  const codeElement = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === "code",
  ) as ReactElement<HTMLPreElement> | undefined;

  const className = codeElement?.props?.className ?? "";
  const isCodeBlock = className.startsWith("language-");

  if (isCodeBlock) {
    const lang = className.split(" ")[0]?.split("-")[1] ?? "";

    if (!lang) {
      return <code {...props}>{children}</code>;
    }

    const html = await codeToHtml(String(codeElement?.props.children), {
      lang,
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
      transformers: [
        transformerNotationHighlight(),
        transformerNotationFocus(),
        transformerEmptyLine(),
      ],
    });

    return (
      <div className="custom-code-block relative">
        <CopyButton content={String(codeElement?.props.children)} />
        <span className="lang">{lang}</span>
        <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }

  // If not, return the component as is
  return <pre {...props}>{children}</pre>;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: BlogPostLayout,
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    a: ({ href, children, ...props }: AnchorProps) => {
      const isInternalLink = href && href.startsWith("/");

      if (isInternalLink) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }

      return (
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href={href}
          {...props}
        >
          {children}
        </a>
      );
    },
    strong: (props: StrongProps) => (
      <strong className="font-semibold" {...props} />
    ),
    Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
      <table>
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ),
    pre: Pre,
    ...components,
  };
}
