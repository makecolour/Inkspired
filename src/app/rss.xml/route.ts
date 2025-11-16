import { generateFeed } from "@/lib/feed";
import { getBlogPosts } from "@/lib/blog";
import { metadata } from "@/app/page";

export async function GET() {
  const posts = getBlogPosts();
  const feed = generateFeed(posts, metadata);
  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
