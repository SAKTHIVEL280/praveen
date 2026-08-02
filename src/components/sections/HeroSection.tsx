import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/hero.webp";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef      = useRef<HTMLElement>(null);
  const bgRef           = useRef<HTMLDivElement>(null);
  const contentRef      = useRef<HTMLDivElement>(null);
  const nameRef         = useRef<HTMLDivElement>(null);
  const bgBannerRef     = useRef<HTMLDivElement>(null);
  const nameTextRef     = useRef<HTMLHeadingElement>(null);
  const taglineRef      = useRef<HTMLDivElement>(null);
  const descriptionRef  = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const alreadySeen =
      sessionStorage.getItem("prof_intro_seen") === "true" ||
      sessionStorage.getItem("intro_seen") === "true";
      
    // Professional Intro loader takes ~2.4s.
    const introDelay = 2.4;
    const delay = alreadySeen ? 0.05 : introDelay;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay, defaults: { ease: "power3.out" } });

      // 1 — Background fade in
      tl.fromTo(
        bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        0
      );

      // 2A — Solid 100% Black banner slides in from left to right FIRST
      tl.fromTo(
        bgBannerRef.current,
        { x: -160, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0 },
        0.2
      );

      // 2B — Name text "Sakthivel E" slides in from left to right SECOND
      tl.fromTo(
        nameTextRef.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0 },
        0.45
      );

      // 3 — Tagline slides up from bottom to top
      tl.fromTo(
        taglineRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.7
      );

      // 4 — Description fades in
      tl.fromTo(
        descriptionRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.95
      );

      // ── Scroll effect: Background fades out and parallax ────
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "60% top",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          if (bgRef.current) {
            bgRef.current.style.opacity = `${Math.max(0, 1 - p * 3.1)}`;
            bgRef.current.style.transform = `translateY(${p * 92}px)`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "#0a0a0a" }}
    >
      {/* Background image with fade animation */}
      <div
        ref={bgRef}
        data-testid="hero-bg"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed pointer-events-none will-change-[opacity,transform]"
        style={{
          backgroundImage: `url(${heroImg})`,
          opacity: 0,
          zIndex: 0,
        }}
      />

      {/* Overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(10,10,10,0) 0%, rgba(10,10,10,0.4) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "clamp(80px, 16vh, 180px)",
          background: "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.78) 72%, rgba(10,10,10,0.96) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex items-center justify-start px-6"
        style={{
          willChange: "opacity",
          padding: "clamp(32px, 5vw, 72px) clamp(24px, 6vw, 96px)",
        }}
      >
        <div
          className="grid w-full max-w-[1400px] grid-cols-1 items-end gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] md:gap-16 min-h-[clamp(460px,76vh,760px)] md:min-h-[clamp(420px,72vh,760px)]"
        >
          <div
            data-testid="hero-left-block"
            className="flex flex-col items-start justify-center text-left translate-x-0 -translate-y-[48px] md:-translate-y-[96px] lg:-translate-y-[140px] xl:-translate-y-[140px] 2xl:-translate-y-[162px] w-full max-w-full"
          >
            <div
              ref={nameRef}
              className="relative inline-block mb-[clamp(16px,2.4vw,34px)]"
            >
              {/* Full-bleed left-extended solid black 100% opacity background banner */}
              <div
                ref={bgBannerRef}
                className="absolute top-0 bottom-0 -left-[2000px] right-0 pointer-events-none opacity-0"
                style={{
                  background: "#000000",
                  borderTop: "1px solid rgba(255, 205, 0, 0.4)",
                  borderBottom: "1px solid rgba(255, 205, 0, 0.4)",
                  borderRight: "2px solid #FFCD00",
                  borderRadius: "0px",
                }}
              />
              <h1
                ref={nameTextRef}
                className="relative z-10 text-[clamp(52px,11vw,92px)] sm:text-[clamp(72px,11vw,136px)] md:text-[clamp(90px,10vw,180px)] lg:text-[clamp(110px,10vw,220px)] xl:text-[clamp(120px,10vw,240px)] 2xl:text-[clamp(140px,10vw,260px)] whitespace-nowrap text-left opacity-0"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#f5f5f5",
                  letterSpacing: "-0.05em",
                  lineHeight: 0.88,
                  fontWeight: 800,
                  margin: 0,
                  padding: "0.12em 0.35em",
                }}
              >
                Praveen S
              </h1>
              <h2 className="sr-only">Praveen S Portfolio | AI Engineer &amp; Cloud Backend Architect</h2>
            </div>

            <div
              ref={taglineRef}
              data-testid="hero-tagline"
              className="relative inline-flex items-start ml-0 md:ml-[40px] lg:ml-[100px] 2xl:ml-[160px] px-3 py-2 md:px-4 md:py-2.5 opacity-0"
            >
              {/* Full-bleed bottom-extended background pillar matching ManifestoSection color #0a0a0a */}
              <div
                className="absolute top-0 -bottom-[2000px] left-0 right-0 pointer-events-none"
                style={{
                  background: "#0a0a0a",
                  borderLeft: "2px solid #FFCD00",
                  borderRight: "1px solid rgba(255, 205, 0, 0.3)",
                  borderTop: "1px solid rgba(255, 205, 0, 0.3)",
                  borderBottom: "none",
                  borderRadius: "0px",
                }}
              />
              <span
                className="relative z-10 block text-[clamp(16px,4.3vw,22px)] md:text-[clamp(20px,1.9vw,30px)]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#ffffff",
                  letterSpacing: "0.01em",
                  lineHeight: 1.2,
                  fontWeight: 500,
                  margin: 0,
                  padding: "0px",
                }}
              >
                I build cloud-native AI systems
                <br />
                &amp; enterprise backends
              </span>
            </div>
          </div>

          <div className="flex items-end justify-start md:justify-end">
            <p
              ref={descriptionRef}
              className="leading-[1.55] md:leading-[1.7] max-w-[340px] md:max-w-[420px]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(13px, 3.3vw, 16px)",
                color: "rgba(242, 242, 242, 0.76)",
                letterSpacing: "0.01em",
                margin: 0,
                opacity: 0,
                textAlign: "left",
              }}
            >
              Cloud AI Developer &amp; Systems Practitioner (9.2 CGPA) building resilient cloud backends, multi-agent AI orchestration pipelines, PostgreSQL databases, and automated CI/CD infrastructure.
            </p>
          </div>
        </div>
      </div>

      <div
        className="absolute left-[clamp(24px,6vw,96px)] right-[clamp(24px,6vw,96px)] bottom-[clamp(16px,3vh,28px)] md:bottom-[clamp(28px,5vh,52px)] z-[25]"
        style={{ zIndex: 25 }}
      >
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(255, 205, 0, 0.3)",
            marginBottom: "14px",
          }}
        />

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-5 align-stretch"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://linkedin.com/in/praveen-s57"
              aria-label="Visit LinkedIn profile"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] md:text-xs px-3 py-2 rounded-md hover:bg-[#FFCD00]/20 hover:text-[#FFCD00] transition-colors"
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(242, 242, 242, 0.78)",
                textDecoration: "none",
              }}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/PRAVEEN1000-7"
              aria-label="Visit GitHub profile"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] md:text-xs px-3 py-2 rounded-md hover:bg-[#FFCD00]/20 hover:text-[#FFCD00] transition-colors"
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(242, 242, 242, 0.78)",
                textDecoration: "none",
              }}
            >
              GitHub
            </a>
            <a
              href="mailto:saravananpraveen1157@gmail.com"
              aria-label="Send email"
              className="text-[11px] md:text-xs px-3 py-2 rounded-md hover:bg-[#FFCD00]/20 hover:text-[#FFCD00] transition-colors"
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(242, 242, 242, 0.78)",
                textDecoration: "none",
              }}
            >
              Email
            </a>
            <a
              href="/resume.pdf"
              aria-label="View Praveen S Resume (PDF)"
              title="View & Download Praveen S's Resume (PDF)"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] md:text-xs px-3.5 py-1.5 rounded-full border border-[#FFCD00] bg-[#FFCD00]/10 text-[#FFCD00] font-mono font-bold hover:bg-[#FFCD00] hover:text-black transition-all duration-300 ml-1"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Resume (PDF)
            </a>
          </div>

          <div
            className="flex items-center gap-2.5 self-end md:self-auto"
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(242, 242, 242, 0.76)",
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: "24px",
                height: "1px",
                background: "rgba(242, 242, 242, 0.76)",
              }}
            />
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
