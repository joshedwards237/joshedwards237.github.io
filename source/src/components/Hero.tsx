import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import SocialButton from "@/components/SocialButton";

interface HeroProps {
  onScrollToExperience: () => void;
}

export default function Hero({ onScrollToExperience }: HeroProps) {
  return (
    <header className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative">
      <motion.div
        // NOTE: opacity stays 1 in every state (deliberate patch) so the hero
        // is visible even if the entrance animation never runs.
        initial={{ opacity: 1, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="flex items-center justify-center gap-8 mb-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Joshua Edwards
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground mb-4">
          Systems Engineer &middot; Tech Team Lead
        </p>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          I build and run the systems a school depends on &mdash; full-stack
          apps, AWS infrastructure, and the team that ships them.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <SocialButton href="https://github.com/joshedwards237" external>
            <Github className="mr-2 h-5 w-5" />
            GitHub
          </SocialButton>
          <SocialButton href="mailto:joshua.edwards237@gmail.com">
            <Mail className="mr-2 h-5 w-5" />
            Email
          </SocialButton>
          <SocialButton
            href="https://www.linkedin.com/in/joshua-edwards-0a399325a/"
            external
          >
            <Linkedin className="mr-2 h-5 w-5" />
            LinkedIn
          </SocialButton>
        </div>
      </motion.div>
      <motion.button
        onClick={onScrollToExperience}
        // NOTE: "center" is not a valid Tailwind class (likely meant
        // "left-1/2") — kept verbatim to match the original bundle.
        className="absolute center -translate-x-1/2 bottom-32 md:bottom-24 cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
        initial={{ opacity: 1, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Explore My Work
        <ArrowDown className="w-5 h-5" />
      </motion.button>
    </header>
  );
}
