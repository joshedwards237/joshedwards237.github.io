import { GraduationCap } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { AnimatedSection } from '../AnimatedSection';

export function Education() {
  return (
    <section className="py-20 px-8">
      <AnimatedSection>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <GraduationCap className="w-8 h-8" />
            Education
          </h2>

          <div className="space-y-8">
            <Card className="p-8 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-white/5">
              <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">University of Colorado Colorado Springs</h3>
              <p className="text-muted-foreground mb-4">Bachelor's in Computer Science • August 2023 - Current</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Pursuing ABET Accredited Computer Science Degree</li>
                <li>Current GPA: 4.0</li>
                <li>Expected Graduation: May 2025</li>
                <li>Advanced coursework in Computer Science, Calculus, Linear Algebra, and Physics</li>
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-white/5">
              <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">Pikes Peak State College</h3>
              <p className="text-muted-foreground mb-4">Associate's in Computer Science • August 2020 - May 2023</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Graduated with 4.0 GPA</li>
                <li>Concurrent enrollment with The Classical Academy high school</li>
                <li>Received Certificate of Programming</li>
              </ul>
            </Card>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}