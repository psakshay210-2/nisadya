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

// As we can't use the 'react-instagram-embed' package due to compatibility issues,
// we will simulate the embed with a simple card that links to the post.
// You would need a more robust solution for full embeds, possibly using an official API
// or a different, up-to-date library.

const InstagramPost = ({ url }: { url: string }) => {
  const postId = url.split('/').filter(Boolean).pop();
  return (
    <Card className="w-full max-w-[320px] mx-auto">
      <CardContent className="p-4">
        <div className="aspect-square bg-muted flex items-center justify-center rounded-md">
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-center">
                <Instagram className="h-16 w-16 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground mt-2">View on Instagram</p>
                <p className="text-xs text-muted-foreground/80 mt-1">Post ID: {postId}</p>
            </a>
        </div>
      </CardContent>
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
                  <InstagramPost url={post.url} />
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
