import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface AnimatedButtonProps {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  variant?: "default" | "outline";
  className?: string;
}

export function AnimatedButton({ 
  children, 
  href, 
  external = false,
  variant = "outline",
  className = ""
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button 
        variant={variant} 
        size="lg" 
        className={`bg-white/50 backdrop-blur-sm hover:bg-white/80 dark:bg-white/10 ${className}`}
        asChild
      >
        <a 
          href={href} 
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      </Button>
    </motion.div>
  );
}