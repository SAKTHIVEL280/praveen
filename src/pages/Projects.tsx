import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";
import Magnetic from "@/components/Magnetic";
import { Helmet } from "react-helmet-async";

import redactifyImg from "@/assets/redactify.webp";
import mecandriaErpImg from "@/assets/mecandria_erp.webp";
import complaintOsImg from "@/assets/complaint_os.webp";
import enviroscanImg from "@/assets/enviroscan.webp";
import hmsCloudImg from "@/assets/hms_cloud.webp";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  domains: string[];
  image: string;
  description: string;
  year: string;
  link: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    title: "Mecandria ERP",
    domains: ["ERP SaaS", "GST Engine"],
    image: mecandriaErpImg,
    year: "2026",
    link: "http://139.59.62.156:8080/",
    description: "Multi-tenant ERP SaaS covering procure-to-pay, order-to-cash, inventory, and GST-compliant statutory billing (GSTR-1/2/3B) with automated CI/CD and crash recovery.",
    highlights: ["FastAPI + PostgreSQL + SQLAlchemy", "GST-compliant statutory returns", "Automated deployment & recovery"],
  },
  {
    title: "Complaint Priority OS",
    domains: ["Multi-Agent AI", "Groq Systems"],
    image: complaintOsImg,
    year: "2026",
    link: "https://complaint-os.codewithpraveen.dev/",
    description: "AI-driven complaint routing platform replacing manual dispatching. Automates 100% of ticket routing via multi-agent AI pipeline with JWT RBAC.",
    highlights: ["Multi-agent AI routing", "Automated P1-P4 priority assignment", "JWT-based Role Access Control"],
  },
  {
    title: "EnviroScan AI Platform",
    domains: ["Geospatial Analytics", "XGBoost ML"],
    image: enviroscanImg,
    year: "2026",
    link: "https://github.com/PRAVEEN1000-7",
    description: "End-to-end AI platform analyzing 106K+ environmental records from 49 Indian locations. 13-feature geospatial dataset with XGBoost model (92.26% accuracy).",
    highlights: ["OpenAQ & OpenStreetMap APIs", "92.26% accuracy / 92.29% F1-score", "Automated alerts & PDF reporting"],
  },
  {
    title: "HMS Cloud Infrastructure",
    domains: ["DevOps", "Cloud Security"],
    image: hmsCloudImg,
    year: "2026",
    link: "https://github.com/PRAVEEN1000-7",
    description: "Provisioned and managed 3 Linux cloud servers on DigitalOcean with Nginx, domain mapping, SSL/TLS, GitHub Actions CI/CD, Prometheus & Grafana monitoring over Tailscale.",
    highlights: ["3 DigitalOcean Linux servers", "GitHub Actions CI/CD automation", "Prometheus + Grafana monitoring"],
  },
];

const Projects = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const upcomingHeadingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  // Professional scroll management — force to top on every mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      // Fire native scroll reset immediately
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      // Also dispatch Lenis-aware scroll-to-top event
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event("lenis-scroll-top"));
        ScrollTrigger.refresh();
      });
    }
  }, []);

  // Handle micro-animations for highlights when a project becomes active
  useEffect(() => {
    if (activeProject !== null) {
      const highlights = document.querySelectorAll(`.highlights-${activeProject} > div`);
      gsap.fromTo(
        highlights,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    }
  }, [activeProject]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
        );
      }

      // Cards stagger with mask reveal
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const imgWrapper = card.querySelector(".project-image-clip");

        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (imgWrapper) {
          gsap.fromTo(
            imgWrapper,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.2,
              delay: 0.3,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <Helmet>
        <title>Projects &amp; Systems | Praveen S Portfolio</title>
        <meta
          name="description"
          content="Explore cloud AI systems, multi-tenant ERP SaaS, and multi-agent platforms shipped by Praveen S: Mecandria ERP, Complaint Priority OS, EnviroScan AI, and HMS Cloud Infra."
        />
        <meta
          name="keywords"
          content="Praveen S projects, Praveen S software, Mecandria ERP, Complaint OS, EnviroScan, PRAVEEN1000-7"
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta property="og:title" content="Projects &amp; Systems | Praveen S Portfolio" />
        <meta
          property="og:description"
          content="A collection of cloud AI systems, multi-tenant ERP SaaS, and multi-agent platforms shipped by Praveen S."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sakthivel.daeq.in/projects" />
        <meta property="og:site_name" content="Sakthivel E Portfolio" />
        <meta property="og:image" content="https://sakthivel.daeq.in/og-image.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SAKTHIVEL_E_" />
        <meta name="twitter:creator" content="@SAKTHIVEL_E_" />
        <meta name="twitter:title" content="Projects &amp; Systems | Sakthivel E Portfolio" />
        <meta name="twitter:description" content="A collection of AI-native products and software systems shipped by Sakthivel E." />
        <meta name="twitter:image" content="https://sakthivel.daeq.in/og-image.svg" />
      </Helmet>

      <div
        ref={pageRef}
        className="min-h-screen"
        style={{ background: "hsl(var(--section-dark))" }}
      >
        {/* Header */}
        <div className="px-8 md:px-16 pt-12 pb-4 flex items-center justify-between">
          <Magnetic strength={15} className="inline-block">
            <Link
              to="/#selected-works-bottom"
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase transition-opacity duration-300 hover:opacity-60"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Magnetic>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-white font-mono font-bold text-xs uppercase hover:bg-white hover:text-black transition-all duration-300"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Resume (PDF)
          </a>
        </div>

        <div className="px-8 md:px-16 pb-24 md:pb-32">
          <h1
            ref={headingRef}
            className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-20 md:mb-28"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "hsl(var(--foreground))",
              opacity: 0,
            }}
          >
            All Works
          </h1>

          {/* Section 1: Main Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-32">
            {projects.slice(0, 4).map((project, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) cardRefs.current[i] = el;
                }}
                className="project-card group relative flex flex-col cursor-pointer"
                style={{ opacity: 0 }}
                onMouseEnter={() => setActiveProject(i)}
                onMouseLeave={() => setActiveProject(null)}
                onFocus={() => setActiveProject(i)}
                onBlur={() => setActiveProject(null)}
                tabIndex={0}
              >
                {/* Floating Image Container */}
                <div
                  className="project-image-mask relative overflow-hidden w-full group"
                  style={{
                    aspectRatio: "16 / 10",
                    borderRadius: "16px",
                    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    willChange: "transform",
                  }}
                >
                  {/* Inner clip-path target */}
                  <div
                    className="project-image-clip w-full h-full"
                    style={{ clipPath: "inset(100% 0 0 0)" }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      style={{
                        filter: activeProject === i ? "brightness(0.6) saturate(1.2)" : "brightness(1) saturate(1)",
                        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  </div>

                  {/* Premium Glass Panel Description */}
                  <div
                    className="absolute bottom-6 left-6 right-6 p-6 md:p-8 pointer-events-none hidden md:block"
                    style={{
                      opacity: activeProject === i ? 1 : 0,
                      transform: activeProject === i ? "translateY(0px)" : "translateY(20px)",
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      background: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    <p
                      className="text-xs md:text-sm leading-relaxed mb-4 font-normal"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: "rgba(255, 255, 255, 0.8)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {project.description}
                    </p>

                    <div className={`flex flex-col gap-1.5 mb-6 highlights-${i}`}>
                      {project.highlights.map((h, k) => (
                        <div key={k} className="flex items-center gap-2.5 opacity-0">
                          <div
                            className="w-1 h-[1px]"
                            style={{ background: "rgba(255, 255, 255, 0.4)" }}
                          />
                          <span
                            className="text-[10px] tracking-widest uppercase font-medium"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                              color: "rgba(255, 255, 255, 0.5)",
                            }}
                          >
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto inline-flex items-center gap-3 transition-colors duration-300 hover:text-white"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                      }}
                    >
                      Explore Project
                      <Magnetic strength={10}>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-colors duration-300 group-hover:border-white/40">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </Magnetic>
                    </a>
                  </div>
                </div>

                {/* Title & Metadata - Detached and Refined */}
                <div className="flex items-end justify-between mt-8 mb-2">
                  <div className="flex flex-col gap-1">
                    <span 
                       className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-1"
                       style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {project.domains[0]}
                    </span>
                    <h3
                      className="text-3xl md:text-4xl font-light tracking-tight"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "hsl(var(--foreground))",
                        transition: "opacity 0.3s ease",
                        opacity: activeProject === i ? 0.6 : 1,
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase opacity-40"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Year
                    </span>
                    <span
                      className="text-sm font-medium opacity-60"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Mobile description & highlights - Flowed layout (hidden on desktop) */}
                <div className="block md:hidden mt-4">
                  <p
                    className="text-sm leading-relaxed mb-4 font-normal"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: "hsl(var(--muted-foreground))",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-col gap-2 mb-4">
                    {project.highlights.map((h, k) => (
                      <div key={k} className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-[1px]"
                          style={{ background: "hsl(var(--muted-foreground) / 0.4)" }}
                        />
                        <span
                          className="text-[10px] tracking-widest uppercase font-medium"
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            color: "hsl(var(--muted-foreground))",
                          }}
                        >
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase font-semibold border-b border-foreground pb-1"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    Explore Project
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
};

export default Projects;
