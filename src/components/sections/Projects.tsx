import { BookOpen } from 'lucide-react';
import { AnimatedSection } from '../AnimatedSection';
import { ProjectCard } from '../ProjectCard';

export function Projects() {
  const projects = [
    {
      title: "Django Web Application",
      description: "Developed a full-stack Django web app with SQL database integration, advanced login functionality, and role-based permissions",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=600",
      projectUrl: "https://github.com/joshedwards237"
    },
    {
      title: "Matrix Calculator",
      description: "Created a Python-based matrix calculator with advanced mathematical operations including multiplication and vector products",
      imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800&h=600",
      projectUrl: "https://github.com"
    }
  ];

  return (
    <section className="py-20 px-8">
      <AnimatedSection>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-8 h-8" />
            Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                {...project}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}