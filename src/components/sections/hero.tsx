'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Timeline } from './timeline';

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
      <div className="container">
        <div className="relative z-10 grid h-screen items-center gap-8 lg:grid-cols-3">
          <div
            className={cn(
              'flex flex-col items-center text-center lg:items-start lg:text-left transition-opacity duration-500 delay-[1500ms] lg:col-span-2 pt-24',
              loading ? 'opacity-0' : 'opacity-100 animate-fade-in-up'
            )}
          >
            <p className="max-w-3xl text-4xl font-bold text-white md:text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
              "In the waves of chance we find a new beginning"
            </p>
            <div className="mx-auto mt-6 max-w-3xl rounded-lg bg-black/20 p-6 backdrop-blur-sm lg:mx-0">
              <p className="text-lg text-white/90 md:text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
                Nisadya is the Management fest of DoMS, NIT Trichy. It is a parley
                of cultural and managerial events, fun and happiness, competition
                and cooperation. We provide an open platform to all the talented
                young budding managers to put forth their skills and talents to
                take up the flames of test.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button size="lg" asChild>
                <a href="#events">
                  Explore Events{' '}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="secondary" asChild className="lg:hidden">
                <a href="#schedule">View Schedule</a>
              </Button>
            </div>
          </div>
          <div className={cn(
            'hidden lg:block transition-opacity duration-500 delay-[1700ms] mr-4',
            loading ? 'opacity-0' : 'opacity-100 animate-fade-in-up'
          )}>
            <div className="h-[80vh] overflow-y-auto rounded-lg bg-card/50 p-4 backdrop-blur-sm">
              <Timeline condensed />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
