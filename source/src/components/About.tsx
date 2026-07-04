import { User } from "lucide-react";
import { Card } from "@/components/ui/card";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import joshPhoto from "@/assets/josh.jpg";

export default function About() {
  return (
    <section className="py-20 px-8">
      <ScrollAnimationWrapper>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-12 flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
                <User className="w-8 h-8" />
                <h2 className="text-3xl font-bold">About Me</h2>
              </div>
              <Card className="p-8 bg-white/50 backdrop-blur-sm dark:bg-white/5">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  As a college senior, entrepreneur, and computer scientist based
                  in Colorado Springs, I bring a unique combination of technical
                  expertise and innovative thinking. In my current role as a
                  Systems Developer at Colorado Homeschool Enrichment, I design
                  and implement scalable, automated systems using AWS, Airtable,
                  and Python to streamline operations and drive efficiency.
                  <br />
                  <br />
                  My passion for learning and problem-solving means I’m always
                  looking for new ways to create value, and I’m deeply motivated
                  to contribute to cutting-edge advancements in software
                  development, AI, and aerospace. If your team is looking for
                  someone who can tackle complex challenges, think strategically,
                  and deliver impactful solutions, I’d love to help you reach
                  your next milestone.
                </p>
              </Card>
            </div>
            <div className="relative group w-[70%] mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000" />
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <img
                  src={joshPhoto}
                  alt="Joshua Edwards"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
}
