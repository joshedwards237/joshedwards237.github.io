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
                  I lead the tech team at Colorado Homeschool Enrichment, where
                  the last year has meant full-stack development, DevOps,
                  security work, and running our PostgreSQL/RDS data platform
                  &mdash; while mentoring the engineers building alongside me. I
                  earned my B.S. in Computer Science from UCCS in December 2025,
                  carrying a 3.9 while doing all of the above.
                  <br />
                  <br />
                  I&rsquo;ve been leading teams since before I could drive: at 14
                  I started a yard-work business that grew to 50 households and
                  two employees. That same bias for ownership shows up in
                  everything I ship &mdash; from the attendance system my school
                  runs on to a glucose-aware running coach. Off the clock: black
                  belt, pad controllers and live music, and Colorado trails.
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
