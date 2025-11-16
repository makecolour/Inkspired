import { describe, it, expect } from "vitest";

import { slugify, formatDate } from "../utils";

describe("slugify", () => {
  it("converts string to lowercase slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slugify("Hello & World!")).toBe("hello-world");
  });

  it("replaces multiple spaces with single hyphen", () => {
    expect(slugify("Hello    World")).toBe("hello-world");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("");
  });
});

describe("formatDate", () => {
  it("formats date with default options", () => {
    const date = "2025-01-15";
    const formatted = formatDate(date);
    expect(formatted).toContain("2025");
  });

  it("formats date with custom month option", () => {
    const date = "2025-01-15";
    const formatted = formatDate(date, { month: "long" });
    expect(formatted.toLowerCase()).toContain("january");
  });

  it("handles invalid date gracefully", () => {
    const date = "invalid-date";
    expect(() => formatDate(date)).not.toThrow();
  });
});
