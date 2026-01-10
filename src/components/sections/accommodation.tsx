'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '../ui/card';
import { AccommodationForm } from '../accommodation-form';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

export function Accommodation() {
  const roomImage1 = PlaceHolderImages.find((p) => p.id === 'room-1');
  const roomImage2 = PlaceHolderImages.find((p) => p.id === 'room-2');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <section id="accommodation" className="py-16 md:py-24 bg-background/50 backdrop-blur-sm border-y">
      <div className="container flex flex-col items-center gap-12">
        <div className="space-y-6 max-w-4xl w-full">
            <div className="text-center">
                <h2 className="font-headline text-4xl font-bold md:text-5xl">Book Your Stay</h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                    Comfortable and affordable accommodation for attendees.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {roomImage1 && (
                <Image
                    src={roomImage1.imageUrl}
                    alt={roomImage1.description}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover aspect-[4/3]"
                    data-ai-hint={roomImage1.imageHint}
                />
                )}
                {roomImage2 && (
                <Image
                    src={roomImage2.imageUrl}
                    alt={roomImage2.description}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover aspect-[4/3]"
                    data-ai-hint={roomImage2.imageHint}
                />
                )}
            </div>
            <p className="text-muted-foreground text-center md:text-left">
                We offer convenient on-campus hostel accommodation for participants. Rooms are available on a shared basis. Fill out the form to send us your booking request and we will get back to you with confirmation and payment details.
            </p>
        </div>
        <div className="max-w-4xl w-full">
            <Card>
                <CardContent className="p-6">
                    {!isMounted ? (
                      <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <div className="grid grid-cols-2 gap-4">
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ) : (
                      <AccommodationForm />
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
