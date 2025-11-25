'use client';

import { instagramPosts } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Instagram } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const InstagramPost = ({ url, imageId }: { url: string, imageId: string }) => {
    const placeholder = PlaceHolderImages.find((p) => p.id === imageId);

    return (
        <Card className="w-full max-w-[320px] mx-auto overflow-hidden group">
            <a href={url} target="_blank" rel="noopener noreferrer">
                <div className="aspect-square relative">
                    {placeholder && (
                        <Image
                        src={placeholder.imageUrl}
                        alt={placeholder.description}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={placeholder.imageHint}
                        />
                    )}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Instagram className="h-12 w-12 text-white" />
                    </div>
                </div>
            </a>
        </Card>
    )
}

export function InstagramFeed() {
  return (
    <section id="instagram" className="py-16 md:py-24 border-y">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold md:text-5xl flex items-center justify-center gap-2">
            <Instagram className="h-10 w-10" />
            On the Gram
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Follow our journey and catch the latest updates.
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {instagramPosts.map((post) => (
              <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
                <div className="w-[320px]">
                  <InstagramPost url={post.url} imageId={post.imageId} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
