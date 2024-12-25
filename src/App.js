import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Education } from '@/components/sections/Education';
import { Footer } from '@/components/Footer';
export default function App() {
    const experienceRef = useRef(null);
    const scrollToExperience = () => {
        experienceRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (_jsxs("div", { className: "relative min-h-screen", children: [_jsx(motion.div, { className: "fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950 dark:via-neutral-900 dark:to-purple-950 -z-10" }), _jsx(Hero, { onScrollToExperience: scrollToExperience }), _jsx(About, {}), _jsx(Projects, {}), _jsx(Experience, { experienceRef: experienceRef }), _jsx(Skills, {}), _jsx(Education, {}), _jsx(Footer, {})] }));
}
