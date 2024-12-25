import { Github, Mail, Linkedin, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedButton } from '../AnimatedButton';

interface HeroProps {
  onScrollToExperience: () => void;
}

export function Hero({ onScrollToExperience }: HeroProps) {
  return (
    <header className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Joshua Edwards
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">Software Developer</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <AnimatedButton href="https://github.com/joshedwards237" external>
            <Github className="mr-2 h-5 w-5" />
            GitHub
          </AnimatedButton>
          <AnimatedButton href="mailto:joshua.edwards237@gmail.com">
            <Mail className="mr-2 h-5 w-5" />
            Email
          </AnimatedButton>
          <AnimatedButton href="https://www.linkedin.com/in/joshua-edwards-0a399325a/" external>
            <Linkedin className="mr-2 h-5 w-5" />
            LinkedIn
          </AnimatedButton>
        </div>
      </motion.div>

      <motion.button
        onClick={onScrollToExperience}
        className="absolute bottom-8 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown className="w-8 h-8 animate-bounce text-indigo-500" />
      </motion.button>
    </header>
  );
}