import { useEffect, useRef } from "react";
import { ArrowLeftRight, FileText } from "lucide-react";
import gsap from "gsap";

interface ExperienceToggleProps {
  currentExperience: "casual" | "professional" | null;
  onOpenSelector: () => void;
  delay?: number;
}

const ExperienceToggle = ({
  currentExperience,
  onOpenSelector,
  delay = 4,
}: ExperienceToggleProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const resumeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const targets = [btnRef.current, resumeRef.current].filter(Boolean);
    if (targets.length > 0) {
      gsap.fromTo(
        targets,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay, ease: "power3.out" }
      );
    }
  }, [delay]);

  if (!currentExperience) return null;

  return (
    <>
      <button
        ref={btnRef}
        onClick={onOpenSelector}
        className="fixed top-6 left-6 z-[60] cursor-pointer flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-border/60 bg-background/80 backdrop-blur-md hover:border-foreground/40 hover:scale-105 active:scale-95 transition-all duration-300 select-none shadow-sm"
        style={{ opacity: 0, color: "hsl(var(--foreground))" }}
        aria-label="Switch experience mode"
      >
        <div className="w-5 h-5 rounded bg-white text-black flex items-center justify-center font-bold text-[11px] leading-none select-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          S.
        </div>
        <span
          className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-bold"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {currentExperience}
        </span>
        <ArrowLeftRight className="w-3.5 h-3.5 opacity-60 transition-transform duration-300 group-hover:rotate-180" />
      </button>

      {currentExperience === "professional" && (
        <a
          ref={resumeRef}
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="fixed top-6 right-6 z-[60] cursor-pointer flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-black/70 backdrop-blur-xl text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 select-none shadow-lg"
          style={{ opacity: 0 }}
          aria-label="View Sakthivel E Resume (PDF)"
          title="View & Download Sakthivel E's Resume (PDF)"
        >
          <FileText className="w-3.5 h-3.5" />
          <span
            className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-bold"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Resume (PDF)
          </span>
        </a>
      )}
    </>
  );
};

export default ExperienceToggle;
