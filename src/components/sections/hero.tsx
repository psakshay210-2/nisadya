'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Hero() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="relative w-full bg-cover bg-bottom"
      style={{
        backgroundImage:
          "linear-gradient(to top, hsl(var(--background)) 5%, transparent 40%), url('/background.png')",
      }}
    >
      <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center pt-24 text-center">
        <a href="#events" className="animate-fade-in-up block">
          <div style={{ transform: `translateY(${offsetY * 0.5}px)` }}>
            <Image
              src="/logo.png"
              alt="Nisadya Logo"
              width={600}
              height={300}
              className="h-auto w-80 md:w-[32rem]"
              style={{
                filter: 'invert(1) drop-shadow(0 8px 20px rgba(0, 0, 0, 0.8))',
              }}
            />
          </div>
        </a>
        <a href="#events" className="group">
          <p
            className="mx-auto mt-4 max-w-2xl animate-fade-in-up cursor-pointer text-lg text-white/80 transition-colors [animation-delay:200ms] group-hover:text-white md:text-xl"
            style={{ transform: `translateY(${offsetY * 0.4}px)` }}
          >
            Where Technology, Culture, and Innovation Collide.
            <br />
            Join us for three days of non-stop excitement and learning.
          </p>
        </a>
        <div
          className="mt-8 flex animate-fade-in-up flex-wrap justify-center gap-4 [animation-delay:400ms]"
          style={{ transform: `translateY(${offsetY * 0.3}px)` }}
        >
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
