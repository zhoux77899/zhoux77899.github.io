import { describe, expect, it } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import { ContentImage } from "./ContentImage";
import { PhotoAvatar } from "./PhotoAvatar";

describe("ContentImage", () => {
  it("preserves a labelled image fallback and retries when the source changes", () => {
    const { rerender } = render(<ContentImage src="/first.jpg" alt="South Island" fallback="NZ" />);
    fireEvent.error(screen.getByRole("img", { name: "South Island" }));
    expect(screen.getByRole("img", { name: "South Island" }).tagName).toBe("DIV");
    expect(screen.getByText("NZ")).toBeInTheDocument();

    rerender(<ContentImage src="/second.jpg" alt="South Island" fallback="NZ" />);
    expect(screen.getByRole("img", { name: "South Island" })).toHaveAttribute("src", "/second.jpg");
  });
});

describe("PhotoAvatar", () => {
  it("keeps the avatar's name and initials available if its photo fails", () => {
    render(<PhotoAvatar src="/avatar.jpg" name="Ruri" className="size-[72px]" />);
    fireEvent.error(screen.getByRole("img", { name: "Ruri" }));
    expect(screen.getByRole("img", { name: "Ruri" })).toHaveTextContent("R");
    expect(screen.getByRole("img", { name: "Ruri" })).toHaveClass("size-[72px]");
  });
});