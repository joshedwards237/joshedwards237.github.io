import { Briefcase } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { AnimatedSection } from '../AnimatedSection';

interface ExperienceProps {
  experienceRef: React.RefObject<HTMLDivElement>;
}

export function Experience({ experienceRef }: ExperienceProps) {
  return (
    <section className="py-20 px-8" ref={experienceRef}>
      <AnimatedSection>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <Briefcase className="w-8 h-8" />
            Experience
          </h2>

          <div className="space-y-12">
            <Card className="p-8 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-white/5">
              <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">Systems Developer</h3>
              <p className="text-muted-foreground mb-4">Colorado Homeschool Enrichment • April 2024 - Present</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Designed and implemented scalable solutions using AWS, Airtable, Python scripts, and webhooks</li>
                <li>Developed and maintained critical websites and automation processes</li>
                <li>Integrated cloud-based systems and optimized data workflows with custom Python scripts</li>
                <li>Enhanced system reliability and performance through AWS services</li>
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-white/5">
              <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">IT Service Desk Technician</h3>
              <p className="text-muted-foreground mb-4">Rooted Software • Feb 2023 - August 2023</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Troubleshot and resolved technical issues in Microsoft 365, Azure, and Google Admin environments</li>
                <li>Managed client communication and support, including in-person and telephone assistance</li>
                <li>Addressed security breaches and maintained network and hardware infrastructures</li>
                <li>Worked with Active Directory and networking systems</li>
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-white/5">
              <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">Owner & Manager</h3>
              <p className="text-muted-foreground mb-4">Odd Job Bros • July 2018 - Present</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Founded and grew a yard work and house maintenance business at age 14</li>
                <li>Expanded business to serve over 50 households with two employees</li>
                <li>Developed strong customer relations, time management, and problem-solving skills</li>
              </ul>
            </Card>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}