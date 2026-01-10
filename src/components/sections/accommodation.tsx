'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '../ui/card';
import { AccommodationForm } from '../accommodation-form';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

export function Accommodation() {
  const [isMounted, setIsMounted] = useState(false);
  const bgImage = PlaceHolderImages.find((p) => p.id === 'room-1');

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <section 
      id="accommodation" 
      className="relative py-16 md:py-24 bg-cover bg-center border-y"
      style={{ backgroundImage: bgImage ? `url(${bgImage.imageUrl})` : 'none' }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="container relative flex flex-col items-center gap-12">
        <div className="w-full max-w-4xl space-y-6">
            <div className="text-center">
                <h2 className="font-headline text-4xl font-bold md:text-5xl text-white drop-shadow-md">Book Your Stay</h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-200 drop-shadow-sm">
                    Comfortable and affordable accommodation for attendees.
                </p>
            </div>
            
            <p className="text-slate-300 text-center drop-shadow-sm">
                We offer convenient on-campus hostel accommodation for participants. Rooms are available on a shared basis. Fill out the form to send us your booking request and we will get back to you with confirmation and payment details.
            </p>
        </div>
        <div className='w-full max-w-4xl'>
            <Card className='bg-slate-950/50 backdrop-blur-md border-slate-700'>
                <CardContent className="p-6">
                    {!isMounted ? (
                      <div className="space-y-4">
                        <Skeleton className="h-10 w-full bg-slate-700/50" />
                        <div className="grid grid-cols-2 gap-4">
                          <Skeleton className="h-10 w-full bg-slate-700/50" />
                          <Skeleton className="h-10 w-full bg-slate-700/50" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Skeleton className="h-10 w-full bg-slate-700/50" />
                          <Skeleton className="h-10 w-full bg-slate-700/50" />
                        </div>
                        <Skeleton className="h-10 w-full bg-slate-700/50" />
                        <Skeleton className="h-10 w-full bg-slate-700/50" />
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
