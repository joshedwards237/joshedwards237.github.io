import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
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

  // Entering the timeline starts at the top. Returning home is handled by
  // HomePage itself (it restores focus to the Lab Notes section when the
  // hash is #lab-notes), so don't force-scroll here.
  useEffect(() => {
    if (hash === "#/timeline") window.scrollTo(0, 0);
  }, [hash]);

  return hash;
}

function HomePage() {
  const experienceRef = useRef<HTMLElement>(null);

  // Returning from the timeline via its Back link (#lab-notes): land focused
  // on the Lab Notes carousel instead of the top of the page. Runs on mount,
  // after the route transition has swapped the page in.
  useEffect(() => {
    if (window.location.hash === "#lab-notes") {
      document.getElementById("lab-notes")?.scrollIntoView({ block: "start" });
    }
  }, []);

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

  const page = route === "#/timeline" ? "timeline" : "home";

  return (
    // reducedMotion="user" is safe here: every entrance animation keeps
    // initial opacity 1, so content renders even when animations are skipped.
    <MotionConfig reducedMotion="user">
      {/* Route cross-fade. AnimatePresence initial={false} keeps the hard
          invariant intact on first paint (no animation, content visible);
          the fade only runs on user-triggered route changes. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {page === "timeline" ? <TimelinePage /> : <HomePage />}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
