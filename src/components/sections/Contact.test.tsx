import { describe, expect, it } from "bun:test";
import { render, screen, within } from "@testing-library/react";
import { githubUrl, personalInfo } from "@/content";
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

  it("keeps account handles, destinations and brand marks when display names change", () => {
    const baseline = render(<Contact />);
    const icons = new Map(Array.from(baseline.container.querySelectorAll("a"), link => [link.getAttribute("href"), link.querySelector("svg")?.innerHTML]));
    baseline.unmount();
    const names = personalInfo.socialLinks.map(link => link.name);
    try {
      personalInfo.socialLinks.forEach((link, index) => { link.name = `Account ${index + 1}`; });
      const view = render(<Contact />);
      personalInfo.socialLinks.forEach(link => {
        const account = within(view.container).getByRole("link", { name: link.contactLabel });
        expect(account).toHaveTextContent(link.name);
        expect(account).toHaveTextContent(link.handle);
        expect(account).toHaveAttribute("href", link.url);
        expect(account.querySelector("svg")?.innerHTML).toBe(icons.get(link.url));
      });
    } finally {
      personalInfo.socialLinks.forEach((link, index) => { link.name = names[index]; });
    }
  });
});
