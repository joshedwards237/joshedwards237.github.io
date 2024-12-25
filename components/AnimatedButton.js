import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
export function AnimatedButton({ children, href, external = false, variant = "outline", className = "" }) {
    return (_jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, transition: { type: "spring", stiffness: 400, damping: 17 }, children: _jsx(Button, { variant: variant, size: "lg", className: `bg-white/50 backdrop-blur-sm hover:bg-white/80 dark:bg-white/10 ${className}`, asChild: true, children: _jsx("a", { href: href, target: external ? "_blank" : undefined, rel: external ? "noopener noreferrer" : undefined, children: children }) }) }));
}
