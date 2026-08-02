import { describe, expect, it, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import AttentionGrabber from "@/components/AttentionGrabber";

afterEach(() => {
  cleanup();
  document.title = "Praveen | Cloud AI Engineer";
});

describe("AttentionGrabber component", () => {
  it("changes page title on blur / visibility change and restores on focus", () => {
    document.title = "Original Title";

    render(<AttentionGrabber awayTitle="Hey, over here! 👋" />);

    // Simulate tab blur / hide
    Object.defineProperty(document, "hidden", { value: true, configurable: true });
    document.dispatchEvent(new Event("visibilitychange"));

    expect(document.title).toBe("Hey, over here! 👋");

    // Simulate tab focus / show
    Object.defineProperty(document, "hidden", { value: false, configurable: true });
    document.dispatchEvent(new Event("visibilitychange"));

    expect(document.title).toBe("Original Title");
  });
});
