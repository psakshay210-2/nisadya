import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  const heroImageUrl = "https://storage.googleapis.com/aai-web-samples/nextjs/nisadya/background.png";

  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="container relative z-20 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
        <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-7xl lg:text-8xl">
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Nisadya
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white md:text-xl">
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
}
