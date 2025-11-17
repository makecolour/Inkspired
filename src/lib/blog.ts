import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { SITE_URL, TWITTER_HANDLE } from "@/config/site";
import { formatDate } from "@/lib/utils";

interface Metadata {
  title: string;
  description: string;
  date: string | Date;
  titleVi?: string;
  descriptionVi?: string;
}

interface FrontMatterParseResult {
  metadata: Metadata;
}

export interface MDXFileData extends FrontMatterParseResult {
  slug: string;
}

const getMDXDirectories = (dir: string): string[] => {
  return fs.readdirSync(dir).filter((file) => {
    const fullPath = path.join(dir, file);
    const isDirectory = fs.statSync(fullPath).isDirectory();
    // Check if directory contains page.mdx
    if (!isDirectory) return false;
    const mdxPath = path.join(fullPath, "page.mdx");
    return fs.existsSync(mdxPath);
  });
};

const readMDXFile = (filePath: string): FrontMatterParseResult => {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(rawContent);

  return {
    metadata: {
      title: data.title,
      description: data.description,
      date: data.date,
      titleVi: data.titleVi,
      descriptionVi: data.descriptionVi,
    },
  };
};

const getMDXData = (dir: string): MDXFileData[] => {
  const mdxDirectories = getMDXDirectories(dir);

  return mdxDirectories.map((directory) => {
    const filePath = path.join(dir, directory, "page.mdx"); // Always read page.mdx

    const { metadata } = readMDXFile(filePath);
    const slug = directory; // Use the directory name as the slug

    return {
      metadata,
      slug,
    };
  });
};

export const getBlogPosts = (): MDXFileData[] => {
  return getMDXData(path.join(process.cwd(), "src", "app", "blog"));
};

export const generateBlogMetadata = ({
  title,
  description,
  date,
  slug,
  titleVi,
  descriptionVi,
}: {
  title: string;
  description: string;
  date: string | Date;
  slug: string;
  titleVi?: string;
  descriptionVi?: string;
}) => {
  const url = `${SITE_URL}blog/${slug}`;
  const dateStr = date instanceof Date ? date.toISOString().split("T")[0] : date;
  const publishedTime = formatDate(dateStr, { month: "long" });
  const imageUrl = `${SITE_URL}og/blog/?title=${encodeURIComponent(title)}&top=${publishedTime}`;

  return {
    title,
    titleVi,
    date: publishedTime,
    description,
    descriptionVi,
    alternates: {
      canonical: `/blog/${slug}/`,
    },
    openGraph: {
      title,
      description,
      publishedTime,
      type: "article",
      url,
      images: [
        {
          url: imageUrl,
        },
      ],
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      creator: TWITTER_HANDLE || undefined,
      images: [imageUrl],
    },
  };
};
