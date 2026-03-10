import { describe, it, expect, vi, beforeEach } from "vitest";
import { cn, scrollToSection } from "./utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("filters falsy values", () => {
    expect(cn("a", false, "b", undefined)).toBe("a b");
  });
});

describe("scrollToSection", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="test-section">content</div>';
    const el = document.getElementById("test-section");
    if (el) {
      el.scrollIntoView = vi.fn();
    }
  });

  it("calls scrollIntoView when element exists", () => {
    scrollToSection("test-section");
    const el = document.getElementById("test-section");
    expect(el?.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("does not throw when element does not exist", () => {
    expect(() => scrollToSection("nonexistent")).not.toThrow();
  });
});
