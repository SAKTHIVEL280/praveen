import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    category: "Programming Languages",
    skills: ["Python", "SQL", "Java"],
  },
  {
    category: "AI / ML Technologies",
    skills: ["Artificial Intelligence", "Machine Learning", "Generative AI"],
  },
  {
    category: "Backend & APIs",
    skills: ["FastAPI", "SQLAlchemy", "JWT", "REST APIs"],
  },
  {
    category: "DevOps & Cloud Deployment",
    skills: ["Microsoft Azure", "Azure AI Services", "CI/CD", "GitHub Actions", "DigitalOcean", "Nginx"],
  },
  {
    category: "Databases",
    skills: ["MySQL", "PostgreSQL"],
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "GitHub", "Prometheus", "Grafana", "Docker", "Linux", "PuTTY", "WinSCP"],
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wavePath1 = useRef<SVGPathElement>(null);
  const wavePath2 = useRef<SVGPathElement>(null);
  const wavePath3 = useRef<SVGPathElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (wavePath1.current) {
        gsap.fromTo(
          wavePath1.current,
          { attr: { d: "M0,120 C180,20 360,220 540,80 C720,-40 900,200 1080,60 C1260,-20 1380,180 1440,100 L1440,320 L0,320 Z" } },
          {
            attr: { d: "M0,300 C180,305 360,298 540,302 C720,300 900,304 1080,300 C1260,302 1380,300 1440,300 L1440,320 L0,320 Z" },
            ease: "power1.inOut",
            scrollTrigger: { trigger: sectionRef.current, start: "top 100%", end: "top 20%", scrub: 0.5 },
          }
        );
      }
      if (wavePath2.current) {
        gsap.fromTo(
          wavePath2.current,
          { attr: { d: "M0,160 C200,60 400,260 600,100 C800,0 1000,240 1200,120 C1350,40 1400,200 1440,140 L1440,320 L0,320 Z" } },
          {
            attr: { d: "M0,304 C200,300 400,306 600,302 C800,304 1000,300 1200,304 C1350,302 1400,304 1440,302 L1440,320 L0,320 Z" },
            ease: "power1.inOut",
            scrollTrigger: { trigger: sectionRef.current, start: "top 95%", end: "top 15%", scrub: 0.8 },
          }
        );
      }
      if (wavePath3.current) {
        gsap.fromTo(
          wavePath3.current,
          { attr: { d: "M0,200 C240,100 480,280 720,150 C960,60 1200,260 1440,180 L1440,320 L0,320 Z" } },
          {
            attr: { d: "M0,308 C240,306 480,310 720,306 C960,308 1200,306 1440,308 L1440,320 L0,320 Z" },
            ease: "power1.inOut",
            scrollTrigger: { trigger: sectionRef.current, start: "top 90%", end: "top 10%", scrub: 1.2 },
          }
        );
      }
      if (cardsRef.current) {
        const items = cardsRef.current.querySelectorAll(".skill-card");
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative">
      {/* SVG Morphing Curves */}
      <div className="relative w-full overflow-hidden" style={{ marginTop: "-1px" }}>
        <svg viewBox="0 0 1440 320" className="w-full block" preserveAspectRatio="none" style={{ height: "clamp(160px, 25vw, 400px)" }}>
          <path ref={wavePath1} d="M0,120 C180,20 360,220 540,80 C720,-40 900,200 1080,60 C1260,-20 1380,180 1440,100 L1440,320 L0,320 Z" fill="rgba(255, 205, 0, 0.4)" />
          <path ref={wavePath2} d="M0,160 C200,60 400,260 600,100 C800,0 1000,240 1200,120 C1350,40 1400,200 1440,140 L1440,320 L0,320 Z" fill="rgba(255, 205, 0, 0.7)" />
          <path ref={wavePath3} d="M0,200 C240,100 480,280 720,150 C960,60 1200,260 1440,180 L1440,320 L0,320 Z" fill="#FFCD00" />
        </svg>
      </div>

      {/* Main Content (Caterpillar Yellow Background) */}
      <div className="w-full" style={{ background: "#FFCD00", color: "#0d0d0d" }}>
        <div className="px-8 md:px-16 lg:px-24 pb-32 pt-8">
          {/* Header */}
          <div className="mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-mono font-bold" style={{ color: "rgba(13, 13, 13, 0.7)" }}>
              Technical Skills Matrix
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-[#0d0d0d]">
              Technical<br />Skills
            </h2>
          </div>

          {/* Skill Groups — 6 Exact Resume Categories */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {skillCategories.map((group, idx) => (
              <div key={idx} className="space-y-4">
                <h3
                  className="text-xs font-mono tracking-[0.2em] uppercase pb-3 text-[#0d0d0d] font-bold flex items-center justify-between"
                  style={{ borderBottom: "2px solid rgba(13, 13, 13, 0.25)" }}
                >
                  <span>{group.category}</span>
                  <span className="text-[10px] text-black/50 font-mono">[{group.skills.length} MODULES]</span>
                </h3>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {group.skills.map((skill) => (
                    <div
                      key={skill}
                      className="skill-card group relative px-5 py-2.5 rounded-full cursor-default transition-all duration-300 bg-[#0d0d0d] text-[#FFCD00] hover:bg-white hover:text-[#0d0d0d] shadow-sm"
                    >
                      <span className="relative z-10 text-xs md:text-sm font-bold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom statement */}
          <div className="mt-20 max-w-2xl border-t-2 border-black/20 pt-8">
            <p className="text-xl md:text-2xl font-bold leading-relaxed text-[#0d0d0d]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Technical skill set extracted directly from verified project delivery, cloud server provisioning, and machine learning research.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
