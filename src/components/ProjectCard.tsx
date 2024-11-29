import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { AnimatedButton } from './AnimatedButton';
import { ProjectImage } from './ProjectImage';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}

export function ProjectCard({ title, description, imageUrl, projectUrl }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Card 
        className="p-8 transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-white/5 group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400 group-hover:text-indigo-500 transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4">
          {description}
        </p>
        <AnimatedButton href={projectUrl} external variant="outline">
          View Project
        </AnimatedButton>
      </Card>
      <ProjectImage
        src={imageUrl}
        alt={title}
        isVisible={isHovered}
      />
    </>
  );
}