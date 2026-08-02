import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

type ExperienceChoice = "casual" | "professional";

interface ExperienceSelectorProps {
  onSelect: (choice: ExperienceChoice) => void;
}

const ExperienceSelector = ({ onSelect }: ExperienceSelectorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback((choice: ExperienceChoice) => {
    gsap.to(contentRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => onSelect(choice)
    });
  }, [onSelect]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSelect("casual");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.2
      );

      tl.fromTo(buttonsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        0.4
      );
    }, containerRef);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      ctx.revert();
    };
  }, [handleSelect]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none"
      style={{ background: "hsl(0 0% 100%)" }}
    >
      <div ref={contentRef} className="flex flex-col items-center gap-10 md:gap-14">
        <h1
          ref={headingRef}
          className="text-2xl md:text-4xl font-bold text-center"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: "hsl(0 0% 0%)",
            letterSpacing: "-0.02em",
            opacity: 0
          }}
        >
          Choose your experience
        </h1>
        
        <div ref={buttonsRef} className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          <button
            onClick={() => handleSelect("casual")}
            className="group relative px-8 py-4 text-sm md:text-base tracking-[0.1em] uppercase font-bold overflow-hidden rounded-full border border-black text-black transition-all duration-500 hover:text-white min-w-[200px]"
            style={{ fontFamily: "'Space Grotesk', sans-serif", opacity: 0 }}
          >
            <span className="relative z-10">Casual</span>
            <div className="absolute inset-0 h-full w-full bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
          </button>

          <button
            onClick={() => handleSelect("professional")}
            className="group relative px-8 py-4 text-sm md:text-base tracking-[0.1em] uppercase font-bold overflow-hidden rounded-full border border-black text-black transition-all duration-500 hover:text-white min-w-[200px]"
            style={{ fontFamily: "'Space Grotesk', sans-serif", opacity: 0 }}
          >
            <span className="relative z-10">Professional</span>
            <div className="absolute inset-0 h-full w-full bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSelector;
