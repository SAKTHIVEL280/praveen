import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AttentionGrabber from "@/components/AttentionGrabber";

// Lazy-loaded route views
const Index = lazy(() => import("./pages/Index"));
const ProfessionalIndex = lazy(() => import("./pages/ProfessionalIndex"));
const Projects = lazy(() => import("./pages/Projects"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <AttentionGrabber awayTitle="Hey, over here! 👋" />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/professional" element={<ProfessionalIndex />} />
          <Route path="/projects" element={<Projects />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
