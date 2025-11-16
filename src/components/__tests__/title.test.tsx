import { describe, it, expect } from "vitest";

import { render, screen } from "@testing-library/react";

import Title from "../title";

describe("Title Component", () => {
  const mockProps = {
    title: "Test Blog Post Title",
    date: "2024-01-15",
  };

  it("renders title heading", () => {
    render(<Title {...mockProps} />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeDefined();
    expect(heading.textContent).toBe("Test Blog Post Title");
  });

  it("renders formatted date", () => {
    render(<Title {...mockProps} />);
    const dateText = screen.getByText(/Jan/);
    expect(dateText).toBeDefined();
  });
});
