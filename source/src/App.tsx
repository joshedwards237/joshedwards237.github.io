import { useRef } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function App() {
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
      <Skills />
      <Education />
      <Contact />
    </div>
  );
}
