
'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '../ui/card';
import { AccommodationForm } from '../accommodation-form';
import React, { useEffect, useRef, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import Autoplay from "embla-carousel-autoplay";

export function Accommodation() {
  const [isMounted, setIsMounted] = useState(false);
  const roomImages = PlaceHolderImages.filter(p => p.id.startsWith('room-'));
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
        <section id="accommodation" className="py-16 md:py-24 bg-background/50 backdrop-blur-sm border-y">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-6 w-1/2 mt-4" />
                </div>
                <div>
                    <Card>
                        <CardContent className="p-6">
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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
  }

  const bgImage = roomImages[0];

  return (
    <section 
      id="accommodation" 
      className="py-16 md:py-0 border-y relative md:h-screen md:scroll-snap-align-start flex flex-col justify-center"
    >
      {bgImage && (
        <Image 
          src={bgImage.imageUrl} 
          alt={bgImage.description} 
          fill
          className="object-cover"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
            <div className="w-full max-w-md">
                <h2 className="font-headline text-4xl font-bold text-white md:text-5xl drop-shadow-lg">Book Your Stay</h2>
                <p className="mt-4 text-lg text-slate-200 drop-shadow-md">
                  Comfortable and affordable accommodation for all attendees.
                </p>
            </div>
            
            {roomImages.length > 0 && (
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full max-w-sm"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                    {roomImages.map((image) => (
                        <CarouselItem key={image.id}>
                        <div className="p-1">
                            <Card className='overflow-hidden'>
                                <CardContent className="flex aspect-video items-center justify-center p-0">
                                    <Image 
                                        src={image.imageUrl}
                                        alt={image.description}
                                        width={1280}
                                        height={720}
                                        className='object-cover w-full h-full'
                                        data-ai-hint={image.imageHint}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            )}

            <p className="w-full max-w-md text-sm text-slate-300 drop-shadow-md">
                We offer on-campus hostel rooms on a shared basis.<br/>Fill out the form and we'll contact you with booking details.
            </p>
        </div>
        <div className='w-full max-w-md mx-auto'>
            <Card className='bg-slate-950/50 backdrop-blur-md border-slate-700 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20'>
                <CardContent className="p-6">
                    <AccommodationForm />
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
