'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { HeroTabs } from './hero-tabs';
import Image from 'next/image';

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
        <div className="relative z-10 flex h-screen flex-col items-center justify-center gap-8 pt-12 pb-8">
          <div
            className={cn(
              'flex flex-col items-center text-center transition-opacity duration-500 delay-[1500ms] w-full',
              loading ? 'opacity-0' : 'opacity-100'
            )}
          >
            <div
              className={cn(
                'relative cursor-pointer transition-all duration-700 ease-in-out',
                'w-48'
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
                'flex flex-col items-center transition-all duration-500 ease-in-out w-full mt-4',
                showInfo ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none h-0'
              )}
            >
              <div className="max-w-3xl rounded-lg bg-black/20 p-4 backdrop-blur-sm">
                <p className="text-base text-white/90 md:text-lg drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
                  Nisadya is the Management fest of DoMS, NIT Trichy. It is a parley
                  of cultural and managerial events, fun and happiness, competition
                  and cooperation. We provide an open platform to all the talented
                  young budding managers to put forth their skills and talents to
                  take up the flames of test.
                </p>
              </div>
            </div>
          </div>
          <div
            className={cn(
              'w-full max-w-6xl flex-1 transition-opacity duration-500 delay-[1700ms]',
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
