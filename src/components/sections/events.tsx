'use client'

import React, { useState, useEffect } from 'react';
import { EventCard } from "../event-card";
import { fetchEvents } from "@/lib/events-loader";
import type { Event } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "../ui/carousel";
import { Skeleton } from '../ui/skeleton';
import { Frown } from 'lucide-react';

type EventsProps = {
  condensed?: boolean;
  setApi?: (api: CarouselApi) => void;
}

export function Events({ condensed = false, setApi }: EventsProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
      setLoading(false);
    };
    loadEvents();
  }, []);

  const eventSkeletons = Array.from({ length: condensed ? 3 : 6 });

  if (loading) {
    if (condensed) {
      return (
        <div className="w-full flex space-x-2 xs:space-x-3 sm:space-x-4">
          {eventSkeletons.map((_, index) => (
            <div key={index} className="p-1 h-full min-w-0 shrink-0 grow-0 basis-full xs:basis-4/5 sm:basis-3/4 md:basis-1/2 lg:basis-1/3">
              <Skeleton className="w-full aspect-[3/4] rounded-lg" />
            </div>
          ))}
        </div>
      );
    }
    return (
      <section id="events" className="py-12 sm:py-16 md:py-24 bg-transparent">
        <div className="container">
          <div className="mb-8 sm:mb-10 md:mb-12 text-center">
            <h2 className="font-headline text-fluid-4xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Featured Events
            </h2>
            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-fluid-base text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Explore the highlights of Nisadya.
            </p>
          </div>
          <div className="grid gap-4 xs:gap-6 sm:gap-8 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
            {eventSkeletons.map((_, index) => (
              <Skeleton key={index} className="w-full h-96 rounded-lg" />
            ))}
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

  if (condensed) {
    return (
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="pr-4">
          {events.map((event) => (
            <CarouselItem key={event.id} className="basis-full xs:basis-4/5 sm:basis-3/4 md:basis-1/2 lg:basis-1/3">
              <div className="h-full flex justify-center py-2">
                <EventCard event={event} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    )
  }

  return (
    <section id="events" className={cn("py-10 xs:py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-transparent", condensed && "p-0 py-0 md:py-0")}>
      <div className={cn("container", condensed && "px-0")}>
        {!condensed && (
          <div className="mb-6 xs:mb-7 sm:mb-8 md:mb-10 lg:mb-12 text-center">
            <h2 className="font-headline text-fluid-4xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Featured Events
            </h2>
            <p className="mx-auto mt-2 xs:mt-2.5 sm:mt-3 md:mt-4 max-w-2xl text-fluid-base text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Explore the highlights of Nisadya.
            </p>
          </div>
        )}
        <div className="grid gap-4 xs:gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
