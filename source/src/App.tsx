import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import TimelinePage from "@/components/TimelinePage";

/**
 * Minimal hash router (no react-router — hash routing survives static
 * hosting like GitHub Pages / Hostinger with zero server config).
 */
function useHashRoute(): string {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Reset scroll on route change so each "page" starts at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hash]);

  return hash;
}

function HomePage() {
  const experienceRef = useRef<HTMLElement>(null);

  const scrollToExperience = () => {
    experienceRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen">
      <motion.div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950 dark:via-neutral-900 dark:to-purple-950 -z-10" />
      <Hero onScrollToExperience={scrollToExperience} />
      <About />
      <Projects />
      <Experience experienceRef={experienceRef} />
      <Timeline />
      <Skills />
      <Education />
      <Contact />
    </div>
  );
}

export default function App() {
  const route = useHashRoute();

  return (
    // reducedMotion="user" is safe here: every entrance animation keeps
    // initial opacity 1, so content renders even when animations are skipped.
    <MotionConfig reducedMotion="user">
      {route === "#/timeline" ? <TimelinePage /> : <HomePage />}
    </MotionConfig>
  );
}
