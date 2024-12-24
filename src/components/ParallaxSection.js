import { jsx as _jsx } from "react/jsx-runtime";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
export function ParallaxSection({ children, className = '', offset = 50 }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
    return (_jsx(motion.div, { ref: ref, style: { y, opacity }, className: className, children: children }));
}
