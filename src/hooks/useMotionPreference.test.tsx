import { describe, expect, it } from "bun:test";
import { act, renderHook } from "@testing-library/react";
import { setMediaQuery } from "@/test/media";
import { useMotionPreference } from "./useMotionPreference";

describe("useMotionPreference", () => {
  it("reads the current preference and responds to changes while mounted", () => {
    const query = "(prefers-reduced-motion: reduce)";
    setMediaQuery(query, true);
    const { result } = renderHook(useMotionPreference);
    expect(result.current).toBe(true);

    act(() => setMediaQuery(query, false));
    expect(result.current).toBe(false);

    act(() => setMediaQuery(query, true));
    expect(result.current).toBe(true);
  });
});
