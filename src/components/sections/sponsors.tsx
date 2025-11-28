import { sponsors } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

type SponsorsProps = {
  condensed?: boolean;
}

export function Sponsors({ condensed = false }: SponsorsProps) {
  if (condensed) {
    return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className='-ml-8'>
          {sponsors.map((sponsor) => {
            const placeholder = PlaceHolderImages.find(
              (p) => p.id === sponsor.imageId
            );
            if (!placeholder) return null;
            return (
              <CarouselItem key={sponsor.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-8">
                <Link
                  href="#"
                  className="flex aspect-video items-center justify-center p-6 opacity-60 transition-opacity duration-300 hover:opacity-100"
                >
                  <Image
                    src={placeholder.imageUrl}
                    alt={sponsor.name}
                    width={150}
                    height={75}
                    className="object-contain"
                    data-ai-hint={placeholder.imageHint}
                  />
                </Link>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  }

  return (
    <section id="sponsors" className="py-16 md:py-24 bg-transparent w-full">
      <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-4xl font-bold md:text-5xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Our Sponsors
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Powering innovation and making this event possible.
            </p>
          </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {sponsors.map((sponsor) => {
            const placeholder = PlaceHolderImages.find(
              (p) => p.id === sponsor.imageId
            );
            if (!placeholder) return null;
            return (
              <Link
                href="#"
                key={sponsor.id}
                className="flex items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100 shrink-0"
              >
                <Image
                  src={placeholder.imageUrl}
                  alt={sponsor.name}
                  width={150}
                  height={75}
                  className="object-contain"
                  data-ai-hint={placeholder.imageHint}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
