'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { HeroTabs } from './hero-tabs';
import Image from 'next/image';
import { Button } from '../ui/button';

export function Hero() {
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'auto';
    }, 1500); // Animation duration
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <section className="relative w-full">
      <div
        className={cn(
          'fixed inset-0 z-[100] flex items-center justify-center bg-background/50 backdrop-blur-sm transition-opacity duration-1000',
          loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <Image
          src="/logo.png"
          alt="Nisadya Logo"
          width={512}
          height={256}
          className={cn(
            'invert drop-shadow-[0_8px_20px_rgba(0,0,0,1)] transition-transform duration-1000 ease-in-out animate-pulse-grow',
            loading ? 'scale-100' : 'scale-0'
          )}
          priority
        />
      </div>

      <div className="container">
        <div className="relative z-10 grid h-screen items-center gap-8 lg:grid-cols-3 pt-24 lg:pt-0">
          <div
            className={cn(
              'flex flex-col items-center text-center lg:items-start lg:text-left transition-opacity duration-500 delay-[1500ms] lg:col-span-2',
              loading ? 'opacity-0' : 'opacity-100'
            )}
          >
            <div
              className={cn(
                'fixed top-8 left-1/2 -translate-x-1/2 z-50 cursor-pointer transition-all duration-700 ease-in-out',
                showInfo ? 'w-48' : 'w-64'
              )}
              onClick={() => setShowInfo(!showInfo)}
            >
              <Image
                src="/logo.png"
                alt="Nisadya Logo"
                width={256}
                height={128}
                className={cn('invert drop-shadow-[0_4px_10px_rgba(0,0,0,1)] w-full h-auto')}
                priority
              />
            </div>

            <div
              className={cn(
                'flex flex-col items-center lg:items-start transition-all duration-500 ease-in-out w-full mt-24',
                showInfo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
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
                <Button size="lg" variant="secondary" asChild className="lg:hidden">
                    <a href="#schedule">View Schedule</a>
                </Button>
                <Button size="lg" asChild className="lg:hidden">
                    <a href="#accommodation">Book Stay</a>
                </Button>
              </div>
            </div>
          </div>
          <div
            className={cn(
              'hidden lg:block transition-opacity duration-500 delay-[1700ms] mr-4',
              loading ? 'opacity-0' : 'opacity-100 animate-fade-in-up'
            )}
          >
            <HeroTabs />
          </div>
        </div>
      </div>
    </section>
  );
}
