'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { HeroTabs } from './hero-tabs';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col">
      <Image
        src="/background.png"
        alt="Nisadya background"
        fill
        className="object-cover -z-10"
        priority
      />

      <div className="container flex flex-col items-center justify-center flex-grow pt-12 pb-8">
        <div className="relative mb-8">
          <Image
            src="/logo.png"
            alt="Nisadya Logo"
            width={256}
            height={128}
            className={'invert drop-shadow-[0_4px_10px_rgba(0,0,0,1)] w-full h-auto'}
            priority
          />
        </div>

        <div className="w-full max-w-6xl flex-1 flex flex-col">
          <HeroTabs />
        </div>
      </div>
    </section>
  );
}
