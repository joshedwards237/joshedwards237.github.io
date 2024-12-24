import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { AnimatedButton } from './AnimatedButton';
import { ProjectImage } from './ProjectImage';
export function ProjectCard({ title, description, imageUrl, projectUrl }) {
    const [isHovered, setIsHovered] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { className: "p-8 transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-white/5 group cursor-pointer", onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsx("h3", { className: "text-xl font-bold mb-4 text-purple-600 dark:text-purple-400 group-hover:text-indigo-500 transition-colors", children: title }), _jsx("p", { className: "text-muted-foreground mb-4", children: description }), _jsx(AnimatedButton, { href: projectUrl, external: true, variant: "outline", children: "View Project" })] }), _jsx(ProjectImage, { src: imageUrl, alt: title, isVisible: isHovered })] }));
}
