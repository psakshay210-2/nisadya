'use client'

import { EventCard } from "../event-card";
import { events } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

type EventsProps = {
  condensed?: boolean;
}

export function Events({ condensed = false }: EventsProps) {
  if (condensed) {
    return (
      <Carousel
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
