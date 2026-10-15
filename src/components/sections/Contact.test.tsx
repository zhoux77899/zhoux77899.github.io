import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { githubUrl } from "@/lib/data";
import { Contact } from "./Contact";
import { SocialLinks } from "@/components/common/SocialLinks";

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

  it("uses the same monochrome brand marks beside each social and contact title", () => {
    const social = render(<SocialLinks />).container;
    const contact = render(<Contact />).container;
    const socialLinks = social.querySelectorAll("a");
    const contactLinks = contact.querySelectorAll("a");
    expect(contactLinks).toHaveLength(3);
    contactLinks.forEach((link, index) => {
      const icon = link.querySelector(".contact-brand-title > svg");
      expect(icon).toHaveAttribute("fill", "currentColor");
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon?.querySelector("path")?.getAttribute("d")).toBe(socialLinks[index]?.querySelector("path")?.getAttribute("d"));
      expect(link.querySelectorAll("svg")).toHaveLength(1);
    });
  });
});
