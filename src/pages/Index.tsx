import { useState, useCallback, useRef, useEffect } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import ProfessionalIntroLoader from "@/components/ProfessionalIntroLoader";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import SkillsSection from "@/components/sections/SkillsSection";
import FooterSection from "@/components/sections/FooterSection";
import gsap from "gsap";
import { Helmet } from "react-helmet-async";
import { FileText } from "lucide-react";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("prof_intro_seen") === "true";
    }
    return false;
  });

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      sessionStorage.setItem("experience", "professional");
    }
  }, []);

  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [introComplete]);

  useEffect(() => {
    if (introComplete && window.location.hash) {
      const id = window.location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", window.location.pathname);
        }, 100);
      }
    }
  }, [introComplete]);

  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    if (justCompleted && mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out", 
          onComplete: () => {
            if (window.location.hash) {
              const id = window.location.hash.slice(1);
              const element = document.getElementById(id);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                window.history.replaceState(null, "", window.location.pathname);
              }
            }
          } 
        }
      );
    }
  }, [justCompleted]);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem("prof_intro_seen", "true");
    sessionStorage.setItem("intro_seen", "true");
    setIntroComplete(true);
    setJustCompleted(true);
  }, []);

  return (
    <SmoothScroll>
      <Helmet>
        <title>Praveen S Portfolio | Cloud AI Engineer &amp; Systems Architect</title>
        <meta
          name="description"
          content="Official portfolio of Praveen S (PRAVEEN1000-7), a Cloud AI Engineer &amp; B.E. AIML Student at KSRCT (9.2 CGPA) specializing in Azure AI, resilient backends, multi-agent AI pipelines, and cloud DevOps."
        />
        <meta
          name="keywords"
          content="Praveen S, Praveen S portfolio, PRAVEEN1000-7, Praveen AI Engineer, Azure AI Engineer, FastAPI, Mecandria ERP, Complaint Priority OS, EnviroScan AI"
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta property="og:title" content="Praveen S | Cloud AI Engineer &amp; Systems Architect" />
        <meta
          property="og:description"
          content="I design and build cloud-native AI systems and enterprise backends which scale."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Praveen S Portfolio" />
      </Helmet>

      {/* Floating Resume Button */}
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="fixed top-6 right-6 z-[60] cursor-pointer flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFCD00]/50 bg-black/80 backdrop-blur-xl text-[#FFCD00] hover:bg-[#FFCD00] hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 select-none shadow-lg"
        aria-label="View Praveen S Resume (PDF)"
        title="View &amp; Download Praveen S's Resume (PDF)"
      >
        <FileText className="w-3.5 h-3.5" />
        <span
          className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-bold"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Resume (PDF)
        </span>
      </a>

      {!introComplete && (
        <ProfessionalIntroLoader onComplete={handleIntroComplete} />
      )}

      <main ref={mainRef} style={{ opacity: introComplete ? undefined : 0 }}>
        <HeroSection />
        <ManifestoSection />
        <CertificationsSection />
        <ProjectsSection />
        <PhilosophySection />
        <SkillsSection />
        <FooterSection />
      </main>
    </SmoothScroll>
  );
};

export default Index;


