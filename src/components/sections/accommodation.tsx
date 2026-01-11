'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '../ui/card';
import { AccommodationForm } from '../accommodation-form';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

export function Accommodation() {
  const [isMounted, setIsMounted] = useState(false);
  const roomImages = PlaceHolderImages.filter(p => p.id.startsWith('room-'));
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )
  
  if (!isMounted) {
    return (
        <section id="accommodation" className="py-16 md:py-24 bg-background/50 backdrop-blur-sm border-y">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="text-center md:text-left">
                        <h2 className="font-headline text-4xl font-bold md:text-5xl">Book Your Stay</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                            Comfortable and affordable accommodation for attendees.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="rounded-lg object-cover aspect-[4/3]" />
                        <Skeleton className="rounded-lg object-cover aspect-[4/3]" />
                    </div>
                    <Skeleton className="h-12 w-full" />
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

  return (
    <section 
      id="accommodation" 
      className="py-16 md:py-24 border-y"
    >
      <div className="container flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
            <h2 className="font-headline text-4xl font-bold md:text-5xl drop-shadow-md">Book Your Stay</h2>
            <p className="text-lg text-muted-foreground drop-shadow-sm">
              Comfortable and affordable accommodation for attendees. We offer shared on-campus hostel rooms for participants. 
              Fill out the form to request your booking, and we'll contact you with the details.
            </p>
            <div className='pt-4'>
              <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-md mx-auto lg:max-w-none"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent>
                  {roomImages.map((image) => (
                    <CarouselItem key={image.id}>
                      <div className="overflow-hidden rounded-lg aspect-video">
                        <Image 
                          src={image.imageUrl} 
                          alt={image.description} 
                          width={1280}
                          height={720}
                          className="object-cover w-full h-full"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
        </div>
        <div className='w-full lg:w-1/2 max-w-md'>
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
