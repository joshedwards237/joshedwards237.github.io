import { Brain, CodeXml, Star, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

export default function Skills() {
  return (
    <section className="py-20 px-8">
      <ScrollAnimationWrapper>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <CodeXml className="w-8 h-8" />
            Skills
          </h2>

          {/* Featured skill */}
          <div className="mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25" />
              <Card className="relative p-6 bg-white dark:bg-gray-900">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-center">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                      <Brain className="w-6 h-6" />
                      Rapid Learning &amp; Adaptation
                    </h3>
                    <p className="text-base text-muted-foreground">Core Skill</p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-muted-foreground leading-relaxed">
                      Demonstrated exceptional ability to rapidly master new
                      technologies and frameworks. Recently self-taught
                      TypeScript and React to build this portfolio, quickly
                      adopted AWS services for systems development, and
                      consistently expand my technical toolkit with emerging
                      technologies. This adaptability allows me to tackle
                      diverse challenges and stay at the forefront of
                      technological advancement.
                      <br />
                      <br />
                      This is a core part of what drives me, and I'm always
                      excited for new ways to learn and grow! If I am given a
                      talk that requires a skill I don't currently possess, I
                      will jump right in and learn it.
                      <br />
                      <br />
                      "An investment in knowledge pays the best interest." —
                      Benjamin Franklin
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm">
                        Self-Taught React/TypeScript
                      </span>
                      <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm">
                        {"Learned AWS Systems in < 1 year"}
                      </span>
                      <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm">
                        New skill: API Development
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Skill categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-white/5">
              <h3 className="font-bold mb-3 text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <CodeXml className="w-5 h-5" />
                Languages
              </h3>
              <p className="text-muted-foreground">
                Python, Java, HTML/CSS, JavaScript, TypeScript, C#, C++, C, SQL,
                Bash, Assembly
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-white/5">
              <h3 className="font-bold mb-3 text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Frameworks &amp; Tools
              </h3>
              <p className="text-muted-foreground">
                Django, React, Node.js, AWS, Git, GitHub, Unity, Microsoft 365,
                Azure, Airtable, Replit
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-white/5">
              <h3 className="font-bold mb-3 text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Expertise
              </h3>
              <p className="text-muted-foreground">
                Full Stack Development, Systems Integration, Cloud Computing,
                Agile Methodology, Version Control, API Development, AI, UI/UX
                Design, and more
              </p>
            </Card>
          </div>
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
}
