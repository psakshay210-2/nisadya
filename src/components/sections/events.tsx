'use client'

import { EventCard } from "../event-card";
import { events } from "@/lib/data";
import { cn } from "@/lib/utils";

type EventsProps = {
  condensed?: boolean;
}

export function Events({ condensed = false }: EventsProps) {
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
        <div className={cn("grid gap-6", condensed ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3")}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
