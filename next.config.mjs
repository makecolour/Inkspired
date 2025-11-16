import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";

const nextConfig = {
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
      },
    ],
  },
  async redirects() {
    return [
      // Redirect /blog/* (no trailing slash) to /blog/*/
      {
        source: "/blog/:slug((?!.*\\/|.*\\.).+)",
        destination: "/blog/:slug/",
        permanent: true,
      },
    ];
  },
  trailingSlash: true,
};

const withMDX = createMDX({
  options: {
    jsx: true,
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
  },
});

export default withMDX(nextConfig);
