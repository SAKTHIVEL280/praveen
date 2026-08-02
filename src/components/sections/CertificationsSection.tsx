import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/Magnetic";

import azureAiBadge from "@/assets/badges/azure_ai_ms.svg";
import azureDsBadge from "@/assets/badges/azure_ai_ms.svg"; // Associate level badge
import azureFundBadge from "@/assets/badges/azure_fund_ms.svg";
import oracleGenAiBadge from "@/assets/badges/oracle_genai.png";
import claudeColorBadge from "@/assets/badges/claude-color.png";

gsap.registerPlugin(ScrollTrigger);

interface Credential {
  number: string;
  issuer: string;
  title: string;
  description: string;
  badgeImg?: string;
  verifyUrl?: string;
}

const credentials: Credential[] = [
  {
    number: "01",
    issuer: "Microsoft",
    title: "Azure AI Engineer (AI-102)",
    description: "Designing, integrating, and deploying cloud-native AI solutions, computer vision models, and natural language processing pipelines on Microsoft Azure.",
    badgeImg: azureAiBadge,
    verifyUrl: "https://learn.microsoft.com/api/credentials/share/en-us/PRAVEENS-6853/D97F799317DCC32E?sharingId=E7C7E321CEB68D34",
  },
  {
    number: "02",
    issuer: "Microsoft",
    title: "Azure Data Scientist (DP-100)",
    description: "Engineering end-to-end machine learning workflows, feature engineering datasets, model training, cross-validation, and operationalizing MLOps pipelines.",
    badgeImg: azureDsBadge,
    verifyUrl: "https://learn.microsoft.com/api/credentials/share/en-us/PRAVEENS-6853/2352ED20E86608D2?sharingId=E7C7E321CEB68D34",
  },
  {
    number: "03",
    issuer: "Microsoft",
    title: "Azure Fundamentals (AZ-900)",
    description: "Foundational mastery of cloud computing, Azure core architectural components, identity management, security compliance, and cloud governance.",
    badgeImg: azureFundBadge,
    verifyUrl: "https://learn.microsoft.com/api/credentials/share/en-us/PRAVEENS-6853/1143C96A73A7947C?sharingId=E7C7E321CEB68D34",
  },
  {
    number: "04",
    issuer: "Oracle Corporation",
    title: "Generative AI Professional",
    description: "Building production Generative AI architectures, large language model fine-tuning, prompt engineering, and Retrieval-Augmented Generation (RAG) workflows.",
    badgeImg: oracleGenAiBadge,
    verifyUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=4911B13A2616C89D311C7BD17DEC08A99F7A689B0BEFC8B164365D8BA8C7E71B",
  },
  {
    number: "05",
    issuer: "Anthropic",
    title: "Claude Certified Architect – Foundations",
    description: "Architecting frontier AI systems with Claude API, context engineering, tool use integration, autonomous agent workflows, and AI safety protocols.",
    badgeImg: claudeColorBadge,
    verifyUrl: "http://verify.skilljar.com/c/hbkadj74fg69",
  },
  {
    number: "06",
    issuer: "Professional Diploma",
    title: "Advanced Diploma in Python Programming",
    description: "Advanced Python system architecture, object-oriented programming, data structures, backend automation, and data science computation.",
  },
];

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const lineRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sticky Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Editorial Items animation (matches PhilosophySection style)
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        const line = lineRefs.current[i];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        if (line) {
          tl.fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
            0
          );
        }

        tl.fromTo(
          item.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          0.2
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-24 md:py-32"
      style={{ background: "#0a0a0a" }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Sticky Left Heading (Matches PhilosophySection editorial style) */}
        <div className="md:w-1/2 md:h-screen md:sticky md:top-0 flex items-center px-8 md:px-16 py-12 md:py-0">
          <div ref={headingRef} className="opacity-0">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4 font-mono text-[#FFCD00]"
            >
              Verified Credentials
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#f5f5f5" }}
            >
              Global<br />
              <span className="text-gray-400">Certifications.</span>
            </h2>
            <p
              className="mt-6 text-base text-gray-400 max-w-sm font-sans leading-relaxed"
            >
              Industry-validated credentials by Microsoft, Oracle, and Anthropic.
            </p>
          </div>
        </div>

        {/* Right Scrolling Editorial List with Official Badges */}
        <div className="md:w-1/2 flex flex-col px-8 md:px-16 pb-16">
          {credentials.map((cred, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) itemRefs.current[i] = el;
              }}
              className="py-12 md:py-16 group"
            >
              {/* Divider Line */}
              <div
                ref={(el) => {
                  if (el) lineRefs.current[i] = el;
                }}
                className="h-px w-full mb-8 origin-left"
                style={{ background: "rgba(255, 255, 255, 0.12)", transform: "scaleX(0)" }}
              />

              <div className="flex items-start justify-between gap-6">
                {/* Text Content */}
                <div className="flex-1">
                  {/* Number & Issuer */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono tracking-widest text-[#FFCD00]">
                      {cred.number} / {cred.issuer.toUpperCase()}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-[#FFCD00] transition-colors duration-300"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {cred.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm md:text-base leading-relaxed text-gray-400 mb-6 font-sans"
                  >
                    {cred.description}
                  </p>

                  {/* Clean Human Link */}
                  {cred.verifyUrl && (
                    <Magnetic strength={10} className="inline-block">
                      <a
                        href={cred.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-[#FFCD00] transition-colors duration-300 border-b border-white/30 hover:border-[#FFCD00] pb-1"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        Verify Credential
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </Magnetic>
                  )}
                </div>

                {/* Authentic Official Badge Image Display */}
                {cred.badgeImg && cred.verifyUrl && (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 relative group-hover:scale-105 transition-transform duration-300 p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#FFCD00]/40 flex items-center justify-center">
                    <img
                      src={cred.badgeImg}
                      alt={`${cred.title} Official Badge`}
                      className="max-w-full max-h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,205,0,0.2)]"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
