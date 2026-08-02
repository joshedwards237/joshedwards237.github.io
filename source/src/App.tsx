import { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Home from "@/components/Home";
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

  // Entering the timeline starts at the top. Returning home (#lab-notes) is
  // handled inside Home itself, so don't force-scroll here.
  useEffect(() => {
    if (hash === "#/timeline") window.scrollTo(0, 0);
  }, [hash]);

  return hash;
}

export default function App() {
  const route = useHashRoute();
  const page = route === "#/timeline" ? "timeline" : "home";

  return (
    // reducedMotion="user": the route cross-fade is the only motion here.
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {page === "timeline" ? <TimelinePage /> : <Home />}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
