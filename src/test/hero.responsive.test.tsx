import { describe, expect, it, afterEach } from "vitest";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import HeroSection from "@/components/sections/HeroSection";

afterEach(() => {
  cleanup();
  window.innerWidth = 1280;
});

describe("Hero responsive behavior", () => {
  it("applies mobile layout styles when viewport is mobile", async () => {
    window.innerWidth = 390;

    render(<HeroSection />);
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    const bg = screen.getByTestId("hero-bg");
    const leftBlock = screen.getByTestId("hero-left-block");
    const tagline = screen.getByTestId("hero-tagline");

    await waitFor(() => {
      expect(bg).toHaveClass("bg-scroll");
      expect(leftBlock).toHaveClass("translate-x-0");
      expect(leftBlock).toHaveClass("-translate-y-[48px]");
      expect(tagline).toHaveClass("ml-0");
    });
  });

  it("applies tablet layout styles when viewport is tablet", async () => {
    window.innerWidth = 1024;

    render(<HeroSection />);
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    const bg = screen.getByTestId("hero-bg");
    const leftBlock = screen.getByTestId("hero-left-block");
    const tagline = screen.getByTestId("hero-tagline");

    await waitFor(() => {
      expect(bg).toHaveClass("md:bg-fixed");
      expect(leftBlock).toHaveClass("translate-x-0");
      expect(leftBlock).toHaveClass("md:-translate-y-[96px]");
      expect(tagline).toHaveClass("md:ml-[40px]");
    });
  });

  it("applies wide-screen layout styles on large displays", async () => {
    window.innerWidth = 1920;

    render(<HeroSection />);
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    const leftBlock = screen.getByTestId("hero-left-block");
    const tagline = screen.getByTestId("hero-tagline" );

    await waitFor(() => {
      expect(leftBlock).toHaveClass("translate-x-0");
      expect(leftBlock).toHaveClass("2xl:-translate-y-[162px]");
      expect(tagline).toHaveClass("2xl:ml-[160px]");
    });
  });
});
