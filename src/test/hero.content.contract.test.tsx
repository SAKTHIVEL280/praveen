import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSection from "@/components/sections/HeroSection";

describe("Hero content contract", () => {
  it("renders key brand copy for Praveen S", () => {
    render(<HeroSection />);

    expect(screen.getByRole("heading", { name: "Praveen S" })).toBeInTheDocument();
    expect(screen.getByText("I build cloud-native AI systems", { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(
        "Cloud AI Developer & Systems Practitioner (9.2 CGPA) building resilient cloud backends, multi-agent AI orchestration pipelines, PostgreSQL databases, and automated CI/CD infrastructure.",
        { exact: false }
      ),
    ).toBeInTheDocument();
  });

  it("exposes social links and accessibility labels", () => {
    render(<HeroSection />);

    const linkedinLink = screen.getByRole("link", { name: "Visit LinkedIn profile" });
    const githubLink = screen.getByRole("link", { name: "Visit GitHub profile" });

    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/praveen-s57");
    expect(githubLink).toHaveAttribute("href", "https://github.com/PRAVEEN1000-7");
  });
});
