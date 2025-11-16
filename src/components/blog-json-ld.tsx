import { SITE_URL, AUTHOR_IMAGE_URL } from "@/config/site";

interface BlogJsonLdProps {
  url: string;
  title: string;
  description: string;
  authorName: string;
  publishDate: string; // ISO format: "2025-03-23T12:00:00Z"
  imageUrl?: string;
}

export default function BlogJsonLd(props: BlogJsonLdProps) {
  const { url, title, description, authorName, publishDate, imageUrl } = props;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: authorName,
      ...(AUTHOR_IMAGE_URL && {
        logo: {
          "@type": "ImageObject",
          url: AUTHOR_IMAGE_URL,
        },
      }),
    },
    datePublished: publishDate,
    ...(imageUrl && {
      image: imageUrl,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
