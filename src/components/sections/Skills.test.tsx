import { describe, expect, it } from "bun:test";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { skills } from "@/content";
import { Skills } from "./Skills";

describe("Skills", () => {
  it("keeps inference, model APIs, and agent tooling together before filtering other groups", async () => {
    await act(async () => { render(<Skills />); });
    const categories = screen.getByRole("tablist", { name: "Skill categories" });
    expect(within(categories).getByRole("tab", { name: "AI infrastructure & agents" })).toHaveAttribute("aria-selected", "true");
    const aiPanel = screen.getByRole("tabpanel", { name: "AI infrastructure & agents" });
    for (const name of ["vLLM", "Ascend NPU", "PyTorch", "OpenAI API", "Agent skills", "HTTP & SSE"]) {
      expect(within(aiPanel).getByRole("heading", { name })).toBeInTheDocument();
    }
    expect(within(aiPanel).getByRole("link", { name: "Flawless" })).toHaveAttribute("href", "#project-flawless");
    expect(within(aiPanel).getByRole("link", { name: "Kitsune Proxy" })).toHaveAttribute("href", "#project-kitsune-proxy");
    expect(screen.queryByText("GitHub Actions")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Python" })).not.toBeInTheDocument();

    await act(async () => { fireEvent.click(within(categories).getByRole("tab", { name: "Scientific computing" })); });
    expect(screen.getByRole("heading", { name: "Python" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "NumPy & SciPy" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Claude Code Insights" })).toHaveAttribute("href", "#project-claude-code-insights");
    expect(screen.queryByText("Agent skills")).not.toBeInTheDocument();

    await act(async () => { fireEvent.click(within(categories).getByRole("tab", { name: "Development tools" })); });
    expect(screen.getByText("GitHub Actions")).toBeInTheDocument();
    expect(screen.queryByText("PyTorch")).not.toBeInTheDocument();
    expect(within(categories).getByRole("tab", { name: "Development tools" })).toHaveAttribute("aria-selected", "true");

    await act(async () => { fireEvent.click(within(categories).getByRole("tab", { name: "Development tools" })); });
    expect(screen.getByText("GitHub Actions")).toBeInTheDocument();

    await act(async () => { fireEvent.click(within(categories).getByRole("tab", { name: "Web & data" })); });
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.queryByText("GitHub Actions")).not.toBeInTheDocument();
  });

  it("associates panels with tabs and supports arrow-key navigation without losing project links", async () => {
    await act(async () => { render(<Skills />); });
    const aiTab = screen.getByRole("tab", { name: "AI infrastructure & agents" });
    expect(screen.getByRole("tabpanel", { name: "AI infrastructure & agents" })).toHaveAttribute("aria-labelledby", aiTab.id);
    await act(async () => {
      aiTab.focus();
      fireEvent.keyDown(aiTab, { key: "ArrowRight", code: "ArrowRight" });
    });
    const scienceTab = screen.getByRole("tab", { name: "Scientific computing" });
    expect(scienceTab).toHaveFocus();
    expect(scienceTab).toHaveAttribute("aria-selected", "true");
    await act(async () => { fireEvent.keyDown(scienceTab, { key: "ArrowRight", code: "ArrowRight" }); });
    const systemsTab = screen.getByRole("tab", { name: "Systems & embedded" });
    expect(systemsTab).toHaveFocus();
    expect(systemsTab).toHaveAttribute("aria-selected", "true");
    const panel = screen.getByRole("tabpanel", { name: "Systems & embedded" });
    expect(within(panel).getAllByRole("link", { name: "LUMA" })[0]).toHaveAttribute("href", "#project-luma");
    expect(within(panel).getByRole("heading", { name: "ESP32 & Arduino" }).querySelectorAll("svg")).toHaveLength(2);
    expect(within(panel).getAllByRole("link")[0].querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    await act(async () => { fireEvent.keyDown(systemsTab, { key: "End", code: "End" }); });
    expect(screen.getByRole("tab", { name: "Development tools" })).toHaveAttribute("aria-selected", "true");
  });

  it("keeps a skill's brand mark and evidence link when its display name changes", async () => {
    const skill = skills.find(item => item.id === "vllm")!;
    const name = skill.name;
    const baseline = render(<Skills />);
    const icon = screen.getByRole("heading", { name }).querySelector("svg")?.innerHTML;
    baseline.unmount();
    try {
      skill.name = "Inference runtime";
      await act(async () => { render(<Skills />); });
      const heading = screen.getByRole("heading", { name: "Inference runtime" });
      expect(heading.querySelector("svg")?.innerHTML).toBe(icon);
      expect(icon).toBeDefined();
      expect(within(heading.closest("li")!).getByRole("link", { name: skill.source!.name })).toHaveAttribute("href", skill.source!.url);
    } finally { skill.name = name; }
  });
});
