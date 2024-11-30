import { Calendar } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';

export function Footer() {
  return (
    <footer className="py-12 px-8 text-center">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">Let's Connect!</h3>
          <AnimatedButton 
            href="https://calendly.com/blackbeltjje/30min" 
            external
            variant="default"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Schedule a Meeting
          </AnimatedButton>
        </div>
        
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Joshua Edwards. All rights reserved.
        </p>
      </div>
    </footer>
  );
}