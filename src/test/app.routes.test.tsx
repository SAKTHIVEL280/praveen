import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import App from "@/App";

vi.mock("@/pages/Index", () => ({
  default: () => <div>home-page</div>,
}));

vi.mock("@/pages/Projects", () => ({
  default: () => <div>projects-page</div>,
}));

vi.mock("@/pages/NotFound", () => ({
  default: () => <div>not-found-page</div>,
}));

// Mocks removed because UI components are no longer imported in App.tsx

afterEach(() => {
  cleanup();
  window.history.replaceState({}, "", "/");
});

describe("app routes", () => {
  it("renders the home route", async () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    expect(await screen.findByText("home-page")).toBeInTheDocument();
  });

  it("renders the projects route", async () => {
    window.history.pushState({}, "", "/projects");
    render(<App />);

    expect(await screen.findByText("projects-page")).toBeInTheDocument();
  });

  it("renders the catch-all route", async () => {
    window.history.pushState({}, "", "/missing-route");
    render(<App />);

    expect(await screen.findByText("not-found-page")).toBeInTheDocument();
  });
});