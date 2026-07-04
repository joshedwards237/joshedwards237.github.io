import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button, type ButtonProps } from "@/components/ui/button";

interface SocialButtonProps {
  children: ReactNode;
  href: string;
  external?: boolean;
  variant?: ButtonProps["variant"];
  className?: string;
}

export default function SocialButton({
  children,
  href,
  external = false,
  variant = "outline",
  className = "",
}: SocialButtonProps) {
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
