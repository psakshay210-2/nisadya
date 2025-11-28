'use client';

import React from 'react';
import { HeroTabs } from './hero-tabs';

export function Hero() {
  return (
    <section className="w-full flex flex-col pt-12 pb-8">
      <div className="container flex flex-col items-center justify-center flex-grow">
        <div className="w-full max-w-6xl flex-1 flex flex-col">
          <HeroTabs />
        </div>
      </div>
    </section>
  );
}
