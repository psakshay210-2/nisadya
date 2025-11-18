import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  return (
    <section
      className="relative w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to top, hsl(var(--background)) 5%, transparent 50%), url('/background.png')",
      }}
    >
      <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center pt-16 text-center">
        <div className="animate-fade-in-up">
          <Image
            src="/logo.png"
            alt="Nisadya Logo"
            width={600}
            height={300}
            className="h-auto w-80 md:w-[32rem]"
            style={{ filter: 'invert(1)' }}
          />
        </div>
        <p className="mx-auto mt-4 max-w-2xl animate-fade-in-up text-lg text-white/80 [animation-delay:200ms] md:text-xl">
          Where Technology, Culture, and Innovation Collide.
          <br />
          Join us for three days of non-stop excitement and learning.
        </p>
        <div className="mt-8 flex animate-fade-in-up flex-wrap justify-center gap-4 [animation-delay:400ms]">
          <Button size="lg" asChild>
            <a href="#events">
              Explore Events{' '}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="#schedule">View Schedule</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
