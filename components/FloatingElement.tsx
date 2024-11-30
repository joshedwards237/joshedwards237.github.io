import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingElement({ children, className = '', delay = 0 }: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{ 
        y: [0, -10, 0],
        rotate: [-1, 1, -1]
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay 
      }}
    >
      {children}
    </motion.div>
  );
}