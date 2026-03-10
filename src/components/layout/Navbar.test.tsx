import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Navbar } from "./Navbar";

function renderNavbar() {
  return render(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  );
}

describe("Navbar", () => {
  it("renders portfolio link", () => {
    renderNavbar();
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    renderNavbar();
    expect(screen.getByText("技能")).toBeInTheDocument();
    expect(screen.getByText("项目")).toBeInTheDocument();
    expect(screen.getByText("联系")).toBeInTheDocument();
  });
});
