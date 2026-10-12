import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { githubUrl } from "@/lib/data";
import { Contact } from "./Contact";

describe("Contact", () => {
  it("provides a real GitHub destination without a simulated contact form", () => {
    const { container } = render(<Contact />);
    const link = screen.getByRole("link", { name: "Connect on GitHub" });
    expect(link).toHaveAttribute("href", githubUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(container.querySelector("form")).toBeNull();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByText("Message Sent!")).not.toBeInTheDocument();
  });
});