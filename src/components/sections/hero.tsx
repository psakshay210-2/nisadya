import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section
      className="relative w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="container relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
        <h1 className="font-headline text-5xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">
          Nisadya
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80 md:text-xl">
          Where Technology, Culture, and Innovation Collide.
          <br />
          Join us for three days of non-stop excitement and learning.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <a href="#events">
              Explore Events <ArrowRight className="ml-2 h-4 w-4" />
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
