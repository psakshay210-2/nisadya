'use client'

import React, { useState, useEffect } from 'react';
import { EventCard } from "../event-card";
import { fetchEvents } from "@/lib/events-loader";
import type { Event } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Skeleton } from '../ui/skeleton';
import { Frown, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      const fetchedEvents = await fetchEvents();
      // Limiting to 6 for a more visible stack on desktop demo
      setEvents(fetchedEvents.slice(0, 6));
      setLoading(false);
    };
    loadEvents();
  }, []);

  const goNext = () => {
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  const goPrev = () => {
    setActiveIndex((prevIndex) => prevIndex - 1);
  };

  const canGoNext = activeIndex < events.length - 1;
  const canGoPrev = activeIndex > 0;

  if (loading) {
    return (
      <section id="events" className="py-12 sm:py-16 md:py-24 bg-transparent">
        <div className="container text-center">
          <h2 className="font-headline text-fluid-4xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">Featured Events</h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-fluid-base text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">Explore the highlights of Nisadya.</p>
          <div className="relative w-full min-h-[550px] flex items-center justify-center mt-8">
            <Skeleton className="w-[280px] h-[448px] rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full text-muted-foreground p-8 text-center">
        <Frown className="w-12 h-12 mb-4" />
        <h3 className="font-bold text-lg text-foreground">Could Not Load Events</h3>
        <p className="text-sm">There was an issue fetching event data. Please try again later.</p>
      </div>
    )
  }

  return (
    <section id="events" className={cn("py-10 xs:py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-transparent overflow-x-clip")}>
      <div className={cn("container")}>
        <div className="mb-10 xs:mb-12 sm:mb-16 text-center">
          <h2 className="font-headline text-fluid-4xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Featured Events
          </h2>
          <p className="mx-auto mt-2 xs:mt-2.5 sm:mt-3 md:mt-4 max-w-2xl text-fluid-base text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Explore the highlights of Nisadya.
          </p>
        </div>
        
        {/* Card Stack Container */}
        <div className="relative w-full min-h-[550px] md:min-h-[500px] flex items-center justify-center">
          
          {/* Mobile View: Stacked Deck */}
          <div className="md:hidden w-full h-full relative">
            {events.map((event, index) => {
              const offset = index - activeIndex;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              let style: React.CSSProperties = {
                transform: `translateY(${offset * 10}px) scale(${1 - Math.abs(offset) * 0.1})`,
                zIndex: events.length - Math.abs(offset),
                opacity: offset === 0 ? 1 : 0.5,
                pointerEvents: offset === 0 ? 'auto' : 'none',
                transition: 'all 0.4s ease-out',
              };
              
              if (offset < 0) {
                   style.transform = `translateX(-120%) scale(0.8) rotate(-15deg)`;
                   style.opacity = 0;
              }
              
              return (
                  <div key={event.id} className="absolute inset-0 flex items-center justify-center" style={style}>
                      <div className="w-[280px]">
                          <EventCard event={event} />
                      </div>
                  </div>
              );
            })}
          </div>

          {/* Desktop View: Spread */}
          <div className="hidden md:flex relative w-full h-full items-center justify-center">
            {events.map((event, index) => {
              const desktopTransforms = [
                { transform: 'translateX(-40%) rotate(-8deg)', zIndex: 1 },
                { transform: 'translateX(-13%) rotate(-4deg)', zIndex: 2 },
                { transform: 'translateX(13%) rotate(4deg)', zIndex: 3 },
                { transform: 'translateX(40%) rotate(8deg)', zIndex: 4 },
              ];

              let style: React.CSSProperties = {};
              if (index < 4) {
                style = desktopTransforms[index];
              } else {
                style = {
                  ...desktopTransforms[3],
                  transform: `${desktopTransforms[3].transform} translateY(${(index - 3) * 12}px)`,
                  zIndex: 4 - (index - 3),
                };
              }

              return (
                <div 
                  key={event.id} 
                  className="absolute w-[280px] transition-all duration-300 ease-out hover:!z-10 hover:-translate-y-4 hover:scale-105"
                  style={style}
                >
                  <EventCard event={event} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-center gap-4 mt-8">
          <Button onClick={goPrev} disabled={!canGoPrev} variant="outline" size="icon" className="disabled:opacity-30 rounded-full h-12 w-12 bg-black/30 backdrop-blur-sm border-white/20">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button onClick={goNext} disabled={!canGoNext} variant="outline" size="icon" className="disabled:opacity-30 rounded-full h-12 w-12 bg-black/30 backdrop-blur-sm border-white/20">
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}