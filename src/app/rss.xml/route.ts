import { generateFeed } from "@/lib/feed";
import { getBlogPosts } from "@/lib/blog";
import { metadata } from "@/app/layout";

export async function GET() {
  const posts = getBlogPosts();
  const feed = generateFeed(posts, metadata);
  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
