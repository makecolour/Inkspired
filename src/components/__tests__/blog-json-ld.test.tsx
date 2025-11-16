import { describe, it, expect, vi } from "vitest";

import { render } from "@testing-library/react";

import BlogJsonLd from "../blog-json-ld";

vi.mock("@/config/site", () => ({
  SITE_URL: "https://example.com/",
  AUTHOR_IMAGE_URL: "https://example.com/avatar.png",
}));

describe("BlogJsonLd", () => {
  const mockProps = {
    url: "https://example.com/blog/test-post/",
    title: "Test Blog Post",
    description: "A test blog post description",
    authorName: "Test Author",
    publishDate: "2024-01-15T10:00:00Z",
    imageUrl: "https://example.com/og/image.jpg",
  };

  it("renders script tag with application/ld+json type", () => {
    const { container } = render(<BlogJsonLd {...mockProps} />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeDefined();
  });

  it("includes correct JSON-LD data in script", () => {
    const { container } = render(<BlogJsonLd {...mockProps} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonContent = script?.textContent;

    expect(jsonContent).toContain("BlogPosting");
    expect(jsonContent).toContain("Test Blog Post");
    expect(jsonContent).toContain("A test blog post description");
    expect(jsonContent).toContain("Test Author");
    expect(jsonContent).toContain("2024-01-15T10:00:00Z");
  });

  it("includes URL in mainEntityOfPage", () => {
    const { container } = render(<BlogJsonLd {...mockProps} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonContent = script?.textContent;

    expect(jsonContent).toContain("https://example.com/blog/test-post/");
  });

  it("includes image when provided", () => {
    const { container } = render(<BlogJsonLd {...mockProps} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonContent = script?.textContent;

    expect(jsonContent).toContain("https://example.com/og/image.jpg");
  });

  it("excludes image field when not provided", () => {
    const propsWithoutImage = { ...mockProps, imageUrl: undefined };
    const { container } = render(<BlogJsonLd {...propsWithoutImage} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonContent = script?.textContent;
    const jsonData = JSON.parse(jsonContent || "{}");

    expect(jsonData.image).toBeUndefined();
  });

  it("includes publisher with logo when AUTHOR_IMAGE_URL is set", () => {
    const { container } = render(<BlogJsonLd {...mockProps} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonContent = script?.textContent;
    const jsonData = JSON.parse(jsonContent || "{}");

    expect(jsonData.publisher).toBeDefined();
    expect(jsonData.publisher["@type"]).toBe("Organization");
    expect(jsonData.publisher.logo).toBeDefined();
  });

  it("generates valid JSON-LD structure", () => {
    const { container } = render(<BlogJsonLd {...mockProps} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonContent = script?.textContent;

    expect(() => JSON.parse(jsonContent || "{}")).not.toThrow();
  });
});
