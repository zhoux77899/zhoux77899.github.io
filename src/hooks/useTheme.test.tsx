import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useTheme } from "@/hooks/useTheme";

function wrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe("useTheme", () => {
  it("throws when used outside ThemeProvider", () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      "useTheme must be used within ThemeProvider"
    );
  });

  it("returns theme and toggleTheme inside ThemeProvider", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBeDefined();
    expect(typeof result.current.toggleTheme).toBe("function");
    expect(typeof result.current.setTheme).toBe("function");
  });

  it("toggles theme when toggleTheme is called", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    const initial = result.current.theme;
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe(initial === "light" ? "dark" : "light");
  });
});
