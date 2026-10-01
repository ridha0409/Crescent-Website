// 




import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AnnouncementMarquee from "./components/AnnouncementMarquee";
import ChatBot from "./components/ChatBot";

/*
 * Route-level code splitting.
 * ---------------------------------------------------------------------------
 * Only the shell (Layout, Navbar, Footer) and the home page are in the first
 * bundle. Every other page is fetched the moment it is navigated to, which
 * keeps the initial download small — a visitor reading the home page never
 * downloads the UGC document tables or the faculty directory.
 */
const About = lazy(() => import("./pages/About"));
const VisionMission = lazy(() => import("./pages/VisionMission"));
const VisionaryTeam = lazy(() => import("./pages/VisionaryTeam.jsx"));
const ExecutionTeam = lazy(() => import("./pages/ExecutionTeam.jsx"));
const CDOETeam = lazy(() => import("./pages/CDOETeam.jsx"));
const FacilitiesPage = lazy(() => import("./pages/FacilitiesPage.jsx"));
const FacultyProfile = lazy(() => import("./pages/FacultyProfile.jsx"));
const MBA = lazy(() => import("./pages/MBA"));
const MCA = lazy(() => import("./pages/MCA"));
const BAIslamicStudies = lazy(() => import("./pages/BAIslamicStudies"));
const BAPublicPolicy = lazy(() => import("./pages/BAPublicPolicy"));
const BAEnglish = lazy(() => import("./pages/BAEnglish"));
const MAIslamicStudies = lazy(() => import("./pages/MAIslamicStudies"));
const ProgrammeDetail = lazy(() => import("./pages/ProgrammeDetail"));
const ProgrammesOffered = lazy(() => import("./pages/ProgrammesOffered"));
const UGProgrammes = lazy(() => import("./pages/UGProgrammes"));
const PGProgrammes = lazy(() => import("./pages/PGProgrammes"));
const HowToApply = lazy(() => import("./pages/HowToApply"));
const AdmissionNotification = lazy(() => import("./pages/AdmissionNotification"));
const Project = lazy(() => import("./pages/Project"));
const StudentAffairs = lazy(() => import("./pages/StudentAffairs"));
const ComplaintForm = lazy(() => import("./pages/ComplaintForm"));
const UGCCorner = lazy(() => import("./pages/UGCCorner"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQPage = lazy(() => import("./pages/FAQPage"));

/** Shown for the moment a lazily-loaded page is being fetched. */
function RouteFallback() {
  return (
    <div className="container-xl py-24 flex justify-center" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <span className="w-8 h-8 rounded-full border-2 border-navy-200 border-t-navy-800 animate-spin" />
    </div>
  );
}

export default function App() {
  return (
     <div className="min-h-screen relative">
      {/* SVG filter that gives the glass real optical refraction/distortion */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <filter id="lg-distort" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Ambient colour orbs — the light source the glass refracts */}
       <div className="lg-orbs" aria-hidden="true">
        <span className="lg-orb lg-orb1" />
        <span className="lg-orb lg-orb2" />
        <span className="lg-orb lg-orb3" />
        <span className="lg-orb lg-orb4" />
       </div>

    <AnnouncementMarquee />
    <ChatBot />

    <div className="min-h-screen relative">
      <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/vision-mission" element={<VisionMission />} />
          <Route path="/about/visionary-team" element={<VisionaryTeam />} />
          <Route path="/about/execution-team" element={<ExecutionTeam />} />
          <Route path="/about/cdoe-team" element={<CDOETeam />} />
          <Route path="/about/facilities" element={<FacilitiesPage />} />
          <Route path="/about/cdoe-team/:slug" element={<FacultyProfile />} />
          <Route path="/programmes" element={<ProgrammesOffered />} />
          <Route path="/programmes/ug" element={<UGProgrammes />} />
          <Route path="/programmes/pg" element={<PGProgrammes />} />
          <Route path="/programmes/mba" element={<MBA />} />
          <Route path="/programmes/mca" element={<MCA />} />
          <Route
            path="/programmes/ba-islamic-studies"
            element={<BAIslamicStudies />}
          />
          <Route
            path="/programmes/ba-public-policy"
            element={<BAPublicPolicy />}
          />
          <Route
            path="/programmes/ba-english"
            element={<BAEnglish />}
          />
          <Route
            path="/programmes/ma-islamic-studies"
            element={<MAIslamicStudies />}
          />
          <Route
            path="/programmes/:id"
            element={<ProgrammeDetail />}
          />
          {/* Admission — mirrors the Admission dropdown. New Registration and
              Applicant Login are external portals, so they have no route. */}
          <Route path="/admission" element={<HowToApply />} />
          <Route path="/admission/how-to-apply" element={<HowToApply />} />
          <Route path="/admission/notification" element={<AdmissionNotification />} />

          {/* Project — mirrors the Project dropdown (MBA / MCA). */}
          <Route path="/project" element={<Project />} />
          <Route path="/project/:section" element={<Project />} />

          {/* Students Corner — LMS Login is an external portal, so no route. */}
          <Route path="/students" element={<StudentAffairs />} />
          <Route path="/students/affairs" element={<StudentAffairs />} />
          <Route path="/students/complaint-form" element={<ComplaintForm />} />

          {/* UGC Corner — one data-driven page serves every section. */}
          <Route path="/ugc-corner" element={<UGCCorner />} />
          <Route path="/ugc-corner/:section" element={<UGCCorner />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQPage />} />

          {/* Catch-all. Without this an unknown URL matched no route and the
              app rendered an empty shell between the header and footer. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      </Suspense>
    </div>
    </div>
  );
}
