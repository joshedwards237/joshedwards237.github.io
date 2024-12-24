import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export function FloatingElement({ children, className = '', delay = 0 }) {
    return (_jsx(motion.div, { className: className, animate: {
            y: [0, -10, 0],
            rotate: [-1, 1, -1]
        }, transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay
        }, children: children }));
}
