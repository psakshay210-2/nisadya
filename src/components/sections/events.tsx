'use client';

import React, { useState } from 'react';
import { EventCard } from '@/components/event-card';
import { events, Event as EventType } from '@/lib/data';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const categories = ['All', 'Technical', 'Cultural', 'Informal'] as const;
type Category = (typeof categories)[number];

export function Events() {
  const [filter, setFilter] = useState<Category>('All');

  const filteredEvents =
    filter === 'All'
      ? events
      : events.filter((event) => event.category === filter);

  return (
    <section id="events" className="py-16 md:py-24 bg-transparent">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold md:text-5xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Our Events
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Something for everyone, from coding wizards to creative souls.
          </p>
        </div>

        <Tabs
          value={filter}
          onValueChange={(value) => setFilter(value as Category)}
          className="mb-8 flex justify-center"
        >
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event: EventType) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
