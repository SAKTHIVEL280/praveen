import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

import redactifyImg from "@/assets/redactify.webp";
import voicesopImg from "@/assets/voicesop.webp";
import groundworkImg from "@/assets/groundwork.webp";
import daeqImg from "@/assets/daeq.webp";

const imageSources = [redactifyImg, voicesopImg, groundworkImg, daeqImg];

const preloadImages = (): Promise<void> => {
  return new Promise((resolve) => {
    let loaded = 0;
    const total = imageSources.length;
    if (total === 0) { resolve(); return; }
    imageSources.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded >= total) resolve();
      };
      img.src = src;
    });
    setTimeout(resolve, 5000);
  });
};

const REEL_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const IntroLoader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leverWrapRef = useRef<HTMLDivElement>(null);
  const leverArmRef = useRef<HTMLDivElement>(null);
  const leverKnobRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const reelRefs = useRef<HTMLDivElement[]>([]);
  const frameRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const mobileHintRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);

  const isTriggered = useRef(false);
  const startY = useRef(0);
  const currentPull = useRef(0);
  const pullActive = useRef(false);
  const clickTime = useRef(0);

  const triggerSpin = (startVal: number) => {
    if (isTriggered.current) return;
    isTriggered.current = true;

    // Fade out hints and skip button
    gsap.to([hintRef.current, mobileHintRef.current, skipBtnRef.current], {
      opacity: 0,
      y: -10,
      duration: 0.35,
      ease: "power2.in",
    });

    const computedDigitH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--digit-h')) || (window.innerWidth < 768 ? 80 : 130);
    const cellH = computedDigitH * 1.15;
    const targets = [21, 20, 20];

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
        setTimeout(() => ScrollTrigger.refresh(), 100);
      },
    });

    // 1 - Animate knob pull down to maximum (if not already there)
    tl.fromTo(leverKnobRef.current,
      { y: startVal },
      { y: 80, duration: Math.max(0.08, ((80 - startVal) / 80) * 0.3), ease: "power2.in" }
    );

    // 2 - Release and rebound elastically
    tl.to(leverKnobRef.current, {
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });

    // 3 - Reels spin
    reelRefs.current.forEach((reel, i) => {
      if (!reel) return;
      const inner = reel.querySelector(".reel-inner") as HTMLElement;
      if (!inner) return;

      const targetY = -(targets[i] * cellH);
      const fullCycleY = 10 * cellH;
      const spinDelay = i * 0.35;

      tl.to(inner, {
        y: -(fullCycleY * 2),
        duration: 1.0 + i * 0.25,
        ease: "none",
      }, 0.35 + spinDelay);

      tl.to(inner, {
        y: targetY,
        duration: 0.7,
        ease: "back.out(1.4)",
      }, 0.35 + spinDelay + 1.0 + i * 0.25);
    });

    const lastReelStop = 0.35 + 2 * 0.35 + 1.0 + 2 * 0.25 + 0.7;

    // Bounce on land
    tl.to(frameRef.current, {
      scale: 1.03, duration: 0.12, ease: "power2.out", yoyo: true, repeat: 1,
    }, lastReelStop + 0.05);

    // Phase 3: Lever morphs into %
    if (leverArmRef.current) {
      tl.to(leverArmRef.current, {
        opacity: 0,
        scale: 0.3,
        duration: 0.4,
        ease: "power3.in",
      }, lastReelStop + 0.4);
    }

    if (percentRef.current) {
      tl.to(percentRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "back.out(1.8)",
      }, lastReelStop + 0.65);
    }

    // Phase 4: Hold "100 %" then fade to black
    const blackStart = lastReelStop + 1.6;
    const fadeTargets = [".reel-digit", ".reel-divider", percentRef.current].filter(Boolean);
    tl.to(fadeTargets, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    }, blackStart);

    tl.to(frameRef.current, {
      backgroundColor: "hsl(0 0% 0%)",
      borderColor: "hsl(0 0% 0%)",
      duration: 0.5,
      ease: "power2.inOut",
    }, blackStart + 0.1);

    // Phase 5: Clean black box scales up to fill screen
    const morphStart = blackStart + 0.8;
    tl.to(frameRef.current, {
      scale: 25,
      borderRadius: "0px",
      duration: 1.4,
      ease: "power3.inOut",
    }, morphStart);

    tl.to(bgRef.current, {
      background: "hsl(0 0% 0%)",
      duration: 0.4,
      ease: "power2.inOut",
    }, morphStart + 0.6);

    tl.to(frameRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    }, morphStart + 1.0);
  };

  const handleStart = (clientY: number) => {
    if (isTriggered.current) return;
    pullActive.current = true;
    startY.current = clientY;
    currentPull.current = 0;
    clickTime.current = Date.now();
    document.body.style.cursor = "grabbing";
    document.body.style.setProperty("user-select", "none");
    document.body.style.setProperty("-webkit-user-select", "none");
  };

  const handleMove = (clientY: number) => {
    if (!pullActive.current || isTriggered.current) return;
    const diff = clientY - startY.current;
    const pull = Math.max(0, Math.min(80, diff));
    currentPull.current = pull;
    if (leverKnobRef.current) {
      gsap.set(leverKnobRef.current, { y: pull });
    }
  };

  const handleEnd = () => {
    if (!pullActive.current || isTriggered.current) return;
    pullActive.current = false;
    document.body.style.cursor = "";
    document.body.style.setProperty("user-select", "");
    document.body.style.setProperty("-webkit-user-select", "");

    const duration = Date.now() - clickTime.current;
    // Trigger if pulled past 40px OR if it was a quick click/tap (< 250ms)
    if (currentPull.current >= 40 || duration < 250) {
      triggerSpin(currentPull.current);
    } else {
      // Return back to top elastically
      if (leverKnobRef.current) {
        gsap.to(leverKnobRef.current, {
          y: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)",
        });
      }
    }
  };

  useEffect(() => {
    let active = true;
    const preloadPromise = preloadImages();

    preloadPromise.then(() => {
      if (!active) return;
      // Setup initial styles
      if (percentRef.current) gsap.set(percentRef.current, { opacity: 0, scale: 0, rotation: -90 });
      if (leverKnobRef.current) gsap.set(leverKnobRef.current, { xPercent: -50, y: 0 });

      const tl = gsap.timeline();

      // Entrance animation
      tl.fromTo(frameRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
        0.3
      );
      tl.fromTo(leverWrapRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
        0.5
      );
      // Stagger entrance of indicators and skip button
      tl.fromTo([hintRef.current, mobileHintRef.current],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 },
        0.8
      );
      tl.fromTo(skipBtnRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        1.1
      );
    });

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientY);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientY);
    const onMouseUp = () => handleEnd();
    const onTouchEnd = () => handleEnd();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      active = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.body.style.cursor = "";
      document.body.style.setProperty("user-select", "");
      document.body.style.setProperty("-webkit-user-select", "");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] select-none"
      style={{ pointerEvents: "none" }}
    >
      <style>{`
        :root {
          --digit-h: 80px;
        }
        @media (min-width: 768px) {
          :root {
            --digit-h: 130px;
          }
        }
      `}</style>
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1]"
        style={{ background: "hsl(0 0% 100%)" }}
      />

      <div className="absolute inset-0 z-[3] flex items-center justify-center">
        <div className="flex items-center gap-6 md:gap-10 pointer-events-auto">
          {/* Slot frame */}
          <div
            ref={frameRef}
            className="flex items-center gap-3 md:gap-4 px-8 md:px-14 py-6 md:py-8 overflow-hidden"
            style={{
              opacity: 0,
              border: "2px solid hsl(0 0% 0%)",
              borderRadius: "20px",
              background: "hsl(0 0% 100%)",
            }}
          >
            {[0, 1, 2].map((reelIdx) => (
              <div
                key={reelIdx}
                ref={(el) => { if (el) reelRefs.current[reelIdx] = el; }}
                className={`overflow-hidden ${reelIdx < 2 ? "reel-divider" : ""}`}
                style={{
                  height: "calc(var(--digit-h) * 1.15)",
                  width: "calc(var(--digit-h) * 0.75)",
                  borderRight: reelIdx < 2 ? "1px solid hsl(0 0% 85%)" : "none",
                }}
              >
                <div className="reel-inner" style={{ willChange: "transform" }}>
                  {REEL_DIGITS.map((d, dIdx) => (
                    <div
                      key={dIdx}
                      className="reel-digit flex items-center justify-center font-bold select-none"
                      style={{
                        height: "calc(var(--digit-h) * 1.15)",
                        fontSize: "calc(var(--digit-h) * 0.75)",
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "hsl(0 0% 0%)",
                        lineHeight: 1,
                      }}
                    >
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Lever wrapper */}
          <div
            ref={leverWrapRef}
            className="relative flex items-center justify-center"
            style={{ opacity: 0, width: "calc(var(--digit-h) * 0.5)", height: "calc(var(--digit-h) * 1.15)" }}
          >
            {/* Lever */}
            <div
              ref={leverArmRef}
              className="absolute inset-0 flex flex-col items-center"
            >
              <div
                className="w-[3px] md:w-[4px]"
                style={{
                  height: "calc(var(--digit-h) * 1.1)",
                  background: "hsl(0 0% 0%)",
                }}
              />
              <div
                ref={leverKnobRef}
                className="absolute top-0 left-1/2 cursor-grab active:cursor-grabbing"
                style={{ willChange: "transform" }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleStart(e.clientY);
                }}
                onTouchStart={(e) => handleStart(e.touches[0].clientY)}
              >
                <div
                  className="rounded-full"
                  style={{
                    width: "calc(var(--digit-h) * 0.26)",
                    height: "calc(var(--digit-h) * 0.26)",
                    background: "hsl(0 0% 0%)",
                  }}
                />
              </div>
              <div
                className="rounded-full mt-1"
                style={{
                  width: "calc(var(--digit-h) * 0.14)",
                  height: "calc(var(--digit-h) * 0.14)",
                  background: "hsl(0 0% 0%)",
                }}
              />
            </div>

            {/* % symbol */}
            <span
              ref={percentRef}
              className="absolute font-bold select-none"
              style={{
                fontSize: "calc(var(--digit-h) * 0.6)",
                fontFamily: "'Space Grotesk', sans-serif",
                color: "hsl(0 0% 0%)",
                opacity: 0,
              }}
            >
              %
            </span>

            {/* Interactive hint - Desktop */}
            <div
              ref={hintRef}
              className="absolute left-[110%] top-[-35px] hidden md:flex flex-col items-center gap-2 pointer-events-none select-none"
              style={{ opacity: 0, willChange: "opacity, transform" }}
            >
              <span
                className="text-xs uppercase tracking-widest font-bold text-center whitespace-nowrap animate-pulse"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "hsl(0 0% 0%)",
                }}
              >
                Drag the lever
              </span>
              <svg
                width="160"
                height="80"
                viewBox="0 0 160 80"
                fill="none"
                className="overflow-visible"
                style={{ color: "hsl(0 0% 0%)" }}
              >
                <path
                  d="M 140,15 C 90,8 40,12 -18,26"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M -2,14 L -18,26 L 0,35"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Interactive hint - Mobile */}
            <div
              ref={mobileHintRef}
              className="absolute right-[10px] bottom-[140%] flex md:hidden flex-col items-center gap-2 pointer-events-none select-none"
              style={{ opacity: 0, willChange: "opacity, transform" }}
            >
              <span
                className="text-xs uppercase tracking-widest font-bold text-center whitespace-nowrap animate-pulse"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "hsl(0 0% 0%)",
                }}
              >
                Drag the lever
              </span>
              <svg
                width="150"
                height="75"
                viewBox="0 0 150 75"
                fill="none"
                className="overflow-visible"
                style={{ color: "hsl(0 0% 0%)" }}
              >
                <path
                  d="M 20,8 C 50,8 90,12 137,23"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 118,29 L 137,23 L 122,9"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Skip Button */}
      <button
        ref={skipBtnRef}
        onClick={() => {
          if (isTriggered.current) return;
          isTriggered.current = true;
          onComplete();
          setTimeout(() => ScrollTrigger.refresh(), 100);
        }}
        className="absolute bottom-8 right-8 z-[110] pointer-events-auto px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-bold border-2 border-black text-black hover:bg-black hover:text-white cursor-pointer rounded-full transition-all duration-300"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          opacity: 0,
        }}
      >
        Skip Intro
      </button>
    </div>
  );
};

export default IntroLoader;
