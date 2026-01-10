'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '../ui/card';
import { AccommodationForm } from '../accommodation-form';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

export function Accommodation() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <section id="accommodation" className="py-16 md:py-24 bg-slate-950/50 backdrop-blur-sm border-y">
      <div className="container flex flex-col items-center gap-12">
        <div className="w-full max-w-4xl space-y-6">
            <div className="text-center">
                <h2 className="font-headline text-4xl font-bold md:text-5xl">Book Your Stay</h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                    Comfortable and affordable accommodation for attendees.
                </p>
            </div>
            
            <p className="text-muted-foreground text-center">
                We offer convenient on-campus hostel accommodation for participants. Rooms are available on a shared basis. Fill out the form to send us your booking request and we will get back to you with confirmation and payment details.
            </p>
        </div>
        <div className='w-full max-w-4xl'>
            <Card className='bg-slate-950/50'>
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
