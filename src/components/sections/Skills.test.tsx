import { describe, expect, it } from "bun:test";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { Skills } from "./Skills";

describe("Skills", () => {
  it("starts with AI / ML and filters skills when a category is selected", async () => {
    await act(async () => { render(<Skills />); });
    const categories = screen.getByRole("radiogroup", { name: "Skill categories" });
    expect(within(categories).getByRole("radio", { name: "AI / ML" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByText("PyTorch")).toBeInTheDocument();
    expect(screen.queryByText("Docker")).not.toBeInTheDocument();

    await act(async () => { fireEvent.click(within(categories).getByRole("radio", { name: "DevOps & Tools" })); });
    expect(screen.getByText("Docker")).toBeInTheDocument();
    expect(screen.queryByText("PyTorch")).not.toBeInTheDocument();
    expect(within(categories).getByRole("radio", { name: "DevOps & Tools" })).toHaveAttribute("aria-checked", "true");

    await act(async () => { fireEvent.click(within(categories).getByRole("radio", { name: "DevOps & Tools" })); });
    expect(screen.getByText("Docker")).toBeInTheDocument();

    await act(async () => { fireEvent.click(within(categories).getByRole("radio", { name: "Frontend" })); });
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.queryByText("Docker")).not.toBeInTheDocument();
  });
});