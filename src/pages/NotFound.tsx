import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Magnetic from "@/components/Magnetic";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-[#f5f5f5] px-6 select-none">
      <Helmet>
        <title>404 Page Not Found | Praveen S Portfolio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="w-12 h-12 rounded-xl bg-[#FFCD00]/10 border border-[#FFCD00]/30 text-[#FFCD00] flex items-center justify-center font-bold text-xl mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        P.
      </div>

      <div className="text-center max-w-md">
        <h1
          className="text-7xl md:text-9xl font-extrabold tracking-tighter mb-4 text-[#FFCD00]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          404
        </h1>
        <p
          className="text-lg md:text-xl font-medium text-white/70 mb-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          The page you are looking for doesn't exist or has moved.
        </p>

        <Magnetic strength={20} className="inline-block">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#FFCD00] bg-[#FFCD00]/10 text-[#FFCD00] font-mono font-bold text-sm uppercase hover:bg-[#FFCD00] hover:text-black transition-all duration-300 shadow-lg"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </Link>
        </Magnetic>
      </div>
    </div>
  );
};

export default NotFound;
