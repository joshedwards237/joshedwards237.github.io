import { User } from 'lucide-react';
import { AnimatedSection } from '../AnimatedSection';
import { Card } from '../ui/card';
import profileImage from '../../josh.jpg';

export function About() {
  return (
    <section className="py-20 px-8">
      <AnimatedSection>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-12 flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
                <User className="w-8 h-8" />
                <h2 className="text-3xl font-bold">About Me</h2>
              </div>
              <Card className="p-8 bg-white/50 backdrop-blur-sm dark:bg-white/5">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I'm a college senior, business owner, and aspiring computer scientist based in Colorado Springs. Currently, I work as a Systems Developer at Colorado Homeschool Enrichment, where I develop scalable, automated systems using AWS, Airtable, and Python. I am passionate about learning, problem-solving, and advancing in the tech industry, particularly in software development, AI, and aerospace.
                </p>
              </Card>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <img
                  src={profileImage}
                  alt="Joshua Edwards"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}