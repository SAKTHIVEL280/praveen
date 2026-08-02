import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ProfessionalIntroLoader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let active = true;

    // Smooth counter animation from 0 to 100
    const counterObj = { value: 0 };
    const tween = gsap.to(counterObj, {
      value: 100,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        if (active) {
          setProgress(Math.floor(counterObj.value));
        }
      },
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
          setTimeout(() => ScrollTrigger.refresh(), 100);
        },
      });

      // 1. Text & Subtitle Fade-in
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.2
      );

      // 2. Line Draw Across
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.6, ease: "power2.inOut" },
        0.3
      );

      // 3. Hold at 100% briefly then smooth scale & fade transition
      tl.to(
        textRef.current,
        { opacity: 0, y: -20, scale: 0.98, duration: 0.5, ease: "power3.in" },
        2.1
      );

      // 4. Curtain slide up smoothly
      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        },
        2.4
      );
    }, containerRef);

    return () => {
      active = false;
      tween.kill();
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none"
      style={{ background: "#0a0a0a" }}
    >
      <div ref={textRef} className="flex flex-col items-center text-center px-6 opacity-0">
        <span
          className="text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-4 text-gray-400 font-mono"
        >
          Professional Portfolio
        </span>

        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Praveen S
        </h1>

        <p
          className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#FFCD00] font-mono mb-8"
        >
          Cloud AI Engineer &amp; Systems Architect
        </p>

        {/* Butter-Smooth Progress Bar & Counter */}
        <div className="w-48 sm:w-64 h-[2px] bg-white/10 relative overflow-hidden mb-4">
          <div
            ref={lineRef}
            className="absolute inset-0 bg-[#FFCD00] origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <span
          ref={counterRef}
          className="text-xs tracking-[0.3em] font-mono text-[#FFCD00]"
        >
          {String(progress).padStart(3, "0")}%
        </span>
      </div>
    </div>
  );
};

export default ProfessionalIntroLoader;
