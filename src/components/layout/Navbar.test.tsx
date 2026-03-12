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
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });
});
