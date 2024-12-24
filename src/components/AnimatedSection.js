import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
export function AnimatedSection({ children, className = '' }) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    return (_jsx(motion.div, { ref: ref, initial: { opacity: 0, y: 50 }, animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }, transition: { duration: 0.6, ease: 'easeOut' }, className: className, children: children }));
}
