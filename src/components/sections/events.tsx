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
        <div className="w-full flex space-x-4">
          {eventSkeletons.map((_, index) => (
            <div key={index} className="p-1 h-full min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3">
              <Skeleton className="w-full aspect-[3/4] rounded-lg" />
            </div>
          ))}
        </div>
      );
    }
    return (
      <section id="events" className="py-16 md:py-24 bg-transparent">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-4xl font-bold md:text-5xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Featured Events
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Explore the highlights of Nisadya.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {eventSkeletons.map((_, index) => (
              <Skeleton key={index} className="w-full aspect-[3/4] rounded-lg" />
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
        }}
        className="w-full"
      >
        <CarouselContent>
          {events.map((event) => (
            <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <EventCard event={event} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  }
  
  return (
    <section id="events" className={cn("py-16 md:py-24 bg-transparent", condensed && "p-0 py-0 md:py-0")}>
      <div className={cn("container", condensed && "px-0")}>
        {!condensed && (
          <div className="mb-12 text-center">
            <h2 className="font-headline text-4xl font-bold md:text-5xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Featured Events
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Explore the highlights of Nisadya.
            </p>
          </div>
        )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="aspect-[3/4]">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
