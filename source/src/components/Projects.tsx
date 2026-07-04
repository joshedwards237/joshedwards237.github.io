import { BookOpen } from "lucide-react";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  isPrimary?: boolean;
  inProgress?: boolean;
}

export default function Projects() {
  const featuredProject: Project = {
    title: "Teacher Attendance Portal",
    description:
      "Developed a streamlined web portal that revolutionizes how teachers record attendance. Built with Python and HTML/CSS, integrated with Airtable and AWS, features real-time updates, intuitive class management, automated reporting, and all wrapped in a sleek UI. The system significantly reduces the time spent on attendance, allowing teachers to focus more on instruction.",
    imageUrl:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800&h=600",
    projectUrl: "https://github.com/joshedwards237",
    isPrimary: true,
  };

  const inProgressProject: Project = {
    title: "NeoPad - Live Performance Pad Software",
    description:
      "Currently developing a Windows-based application that serves as an intuitive pad software for musicians during live performances. Built with modern UI/UX principles, it bridges the gap between beginner and professional needs with features like customizable pad layouts, real-time effects processing, and seamless audio routing. The focus is on creating a clear, easy-to-use interface while maintaining powerful functionality for live music enhancement.",
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800&h=600",
    projectUrl: "https://github.com/joshedwards237/NeoPad",
    inProgress: true,
  };

  const otherProjects: Project[] = [
    {
      title: "Django Web Application",
      description:
        "Developed a full-stack Django web app with SQL database integration, advanced login functionality, and role-based permissions",
      imageUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=600",
      projectUrl: "https://github.com/joshedwards237",
    },
    {
      title: "Matrix Calculator",
      description:
        "Created a Python-based matrix calculator with advanced mathematical operations including multiplication and vector products",
      imageUrl:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800&h=600",
      projectUrl: "https://github.com",
    },
  ];

  return (
    <section className="py-20 px-8">
      <ScrollAnimationWrapper>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-8 h-8" />
            Projects
          </h2>
          <div className="space-y-12">
            {/* Featured project */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000" />
              <div className="relative bg-white dark:bg-gray-900 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {featuredProject.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {featuredProject.description}
                    </p>
                    <a
                      href={featuredProject.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
                    >
                      View Project
                    </a>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={featuredProject.imageUrl}
                      alt={featuredProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* In-development project */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg blur opacity-30 group-hover:opacity-80 transition duration-1000" />
              <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 border border-yellow-400/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 flex items-center gap-2">
                      {inProgressProject.title}
                    </h3>
                    <div className="inline-block px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-700 dark:text-yellow-400 text-sm font-medium">
                      In Development
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {inProgressProject.description}
                    </p>
                    <a
                      href={inProgressProject.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
                    >
                      View Progress
                    </a>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden opacity-90">
                    <img
                      src={inProgressProject.imageUrl}
                      alt={inProgressProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Other projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((project) => (
                <div className="relative group" key={project.title}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-60 transition duration-1000" />
                  <div className="relative bg-white dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 space-y-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {project.title}
                        </h3>
                        <div className="block sm:hidden w-full h-32 rounded-lg overflow-hidden">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {project.description}
                        </p>
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                          View Project
                        </a>
                      </div>
                      <div className="hidden sm:block w-40 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
}
