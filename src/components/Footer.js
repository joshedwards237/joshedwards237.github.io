import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';
export function Footer() {
    return (_jsx("footer", { className: "py-12 px-8 text-center", children: _jsxs("div", { className: "max-w-5xl mx-auto space-y-8", children: [_jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("h3", { className: "text-2xl font-semibold text-indigo-600 dark:text-indigo-400", children: "Let's Connect!" }), _jsxs(AnimatedButton, { href: "https://calendly.com/blackbeltjje/30min", external: true, variant: "default", className: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white", children: [_jsx(Calendar, { className: "mr-2 h-5 w-5" }), "Schedule a Meeting"] })] }), _jsxs("p", { className: "text-muted-foreground", children: ["\u00A9 ", new Date().getFullYear(), " Joshua Edwards. All rights reserved."] })] }) }));
}
