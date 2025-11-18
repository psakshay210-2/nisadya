'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Hero() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full">
      <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center pt-24 text-center">
        <div
          className={cn(
            'transition-opacity duration-500 delay-[1500ms]',
            loading ? 'opacity-0' : 'opacity-100 animate-fade-in-up'
          )}
        >
          <Link href="#events" className="group">
            <p className="mx-auto mt-4 max-w-2xl cursor-pointer text-lg text-white/80 transition-colors group-hover:text-white md:text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Where Technology, Culture, and Innovation Collide.
              <br />
              Join us for three days of non-stop excitement and learning.
            </p>
          </Link>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
      </div>
    </section>
  );
}
