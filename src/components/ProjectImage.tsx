import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

interface ProjectImageProps {
  src: string;
  alt: string;
  isVisible: boolean;
}

export function ProjectImage({ src, alt, isVisible }: ProjectImageProps) {
  const { x, y } = useMousePosition();

  return (
    <motion.div
      className="pointer-events-none fixed z-50"
      style={{
        top: 0,
        left: 0,
        width: '240px',
        height: '160px',
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: x + 20, // Offset slightly to the right of cursor
        y: y - 160, // Position above cursor (negative height)
      }}
      transition={{
        opacity: { duration: 0.2 },
        x: { duration: 0.02, ease: "linear" },
        y: { duration: 0.02, ease: "linear" },
      }}
    >
      <div className="w-full h-full rounded-lg overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          draggable="false"
        />
      </div>
    </motion.div>
  );
}