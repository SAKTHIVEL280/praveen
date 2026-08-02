import "@testing-library/jest-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { afterEach } from "vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Clean up GSAP tickers and ScrollTriggers after each test to prevent late-firing unhandled exceptions
afterEach(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.killTweensOf("*");
});

// Polyfill global requestAnimationFrame / cancelAnimationFrame for late-firing GSAP tickers during teardown
if (typeof global !== "undefined") {
  if (!global.requestAnimationFrame) {
    global.requestAnimationFrame = (callback) => setTimeout(callback, 0) as unknown as number;
  }
  if (!global.cancelAnimationFrame) {
    global.cancelAnimationFrame = (id) => clearTimeout(id);
  }
}
