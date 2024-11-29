import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface InertialScrollContainerProps {
  children: React.ReactNode;
}

export const InertialScrollContainer: React.FC<InertialScrollContainerProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll progress with spring physics
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Normalize wheel behavior
    const handleWheel = (e: WheelEvent) => {
      // Allow natural scrolling while adding some inertia
      container.scrollBy({
        top: e.deltaY,
        behavior: 'smooth'
      });
    };

    // Add wheel event listener
    container.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div 
      ref={scrollRef} 
      className="relative min-h-screen overflow-y-scroll"
      style={{ 
        overscrollBehavior: 'none',
        scrollBehavior: 'smooth'
      }}
    >
      {/* Progress Bar */}
      <motion.div 
        style={{ 
          scaleX: smoothScrollProgress, 
          transformOrigin: '0%' 
        }} 
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 z-50 origin-left"
      />

      {/* Background Motion */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950 dark:via-neutral-900 dark:to-purple-950 -z-10"
        style={{ 
          y: useTransform(smoothScrollProgress, [0, 1], ['0%', '20%']),
          opacity: useTransform(smoothScrollProgress, [0, 0.5, 1], [1, 0.8, 0.6])
        }}
      />

      {/* Render children */}
      {children}
    </div>
  );
};