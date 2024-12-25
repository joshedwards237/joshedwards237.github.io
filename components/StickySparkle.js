import { jsx as _jsx } from "react/jsx-runtime";
import { Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
export function StickySparkle() {
    const { scrollY } = useScroll();
    const [isSticky, setIsSticky] = useState(false);
    // Transform the opacity based on scroll position
    const opacity = useTransform(scrollY, [0, 100], [0, 1]);
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    if (!isSticky)
        return null;
    return (_jsx(motion.div, { className: "fixed top-4 left-4 z-50", initial: { scale: 0 }, animate: { scale: 1 }, style: { opacity }, children: _jsx(Sparkles, { className: "w-8 h-8 text-indigo-500" }) }));
}
