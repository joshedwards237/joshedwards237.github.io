import { Code2 } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { AnimatedSection } from '../AnimatedSection';

export function Skills() {
  return (
    <section className="py-20 px-8">
      <AnimatedSection>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <Code2 className="w-8 h-8" />
            Technical Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-white/5">
              <h3 className="font-bold mb-3 text-purple-600 dark:text-purple-400">Languages</h3>
              <p className="text-muted-foreground">Python, C#, C++, C, Java, SQL, Bash, Assembly, HTML/CSS, JavaScript, TypeScript</p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-white/5">
              <h3 className="font-bold mb-3 text-purple-600 dark:text-purple-400">Frameworks & Tools</h3>
              <p className="text-muted-foreground">Django, React, Node.js, AWS, Git, GitHub, Unity, Microsoft 365, Azure, Airtable</p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-white/5">
              <h3 className="font-bold mb-3 text-purple-600 dark:text-purple-400">Expertise</h3>
              <p className="text-muted-foreground">Full Stack Development, Systems Integration, Cloud Computing, Agile Methodology, Version Control</p>
            </Card>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}