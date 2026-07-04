import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

export default function Education() {
  return (
    <section className="py-20 px-8">
      <ScrollAnimationWrapper>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <GraduationCap className="w-8 h-8" />
            Education
          </h2>
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25" />
              <Card className="relative p-8 transition-all duration-300 bg-white dark:bg-gray-900">
                <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">
                  University of Colorado Colorado Springs
                </h3>
                <p className="text-muted-foreground mb-4">
                  Bachelor of Science in Computer Science • August 2023 –
                  December 2025
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Graduated December 2025 with a 3.9 GPA</li>
                  <li>ABET-accredited Computer Science program</li>
                  <li>
                    Advanced coursework in software and algorithm design,
                    calculus, linear algebra, physics, and computer science
                  </li>
                </ul>
              </Card>
            </div>
            <Card className="p-8 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-white/5">
              <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">
                Pikes Peak State College
              </h3>
              <p className="text-muted-foreground mb-4">
                Associate's Degree in Computer Science • August 2020 - May 2023
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Graduated with 4.0 GPA</li>
                <li>
                  Completed while simultaneously enrolled at The Classical
                  Academy high school
                </li>
                <li>Earned degree and Certificate of Programming by age 18</li>
              </ul>
            </Card>
          </div>
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
}
