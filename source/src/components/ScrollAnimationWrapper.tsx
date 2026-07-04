import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollAnimationWrapper({
  children,
  className = "",
}: ScrollAnimationWrapperProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      // NOTE: opacity stays 1 in every state (deliberate patch) so content is
      // always visible even if the animations never run. Only y animates.
      initial={{ opacity: 1, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
