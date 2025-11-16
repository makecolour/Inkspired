import { describe, it, expect } from "vitest";

import { getBlogPosts } from "../blog";

describe("getBlogPosts", () => {
  it("returns an array of blog posts", () => {
    const posts = getBlogPosts();
    expect(Array.isArray(posts)).toBe(true);
  });

  it("each post has required fields", () => {
    const posts = getBlogPosts();
    if (posts.length > 0) {
      const post = posts[0];
      expect(post).toHaveProperty("slug");
      expect(post).toHaveProperty("metadata");
      expect(post.metadata).toHaveProperty("title");
      expect(post.metadata).toHaveProperty("description");
      expect(post.metadata).toHaveProperty("date");
    }
  });

  it("slugs are valid strings", () => {
    const posts = getBlogPosts();
    posts.forEach((post) => {
      expect(typeof post.slug).toBe("string");
      expect(post.slug.length).toBeGreaterThan(0);
    });
  });

  it("metadata has valid title and description", () => {
    const posts = getBlogPosts();
    posts.forEach((post) => {
      expect(typeof post.metadata.title).toBe("string");
      expect(typeof post.metadata.description).toBe("string");
      expect(post.metadata.title.length).toBeGreaterThan(0);
    });
  });

  it("dates are valid", () => {
    const posts = getBlogPosts();
    posts.forEach((post) => {
      // Date can be string or Date object from gray-matter parsing
      const date = post.metadata.date;
      const isValidDate =
        (typeof date === "string" && new Date(date).getTime() > 0) ||
        (date instanceof Date && date.getTime() > 0);
      expect(isValidDate).toBe(true);
    });
  });
});
