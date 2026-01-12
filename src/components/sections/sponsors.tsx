
import { sponsors } from '@/lib/data';
import { SponsorCard } from '../sponsor-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../ui/carousel';
import { cn } from '@/lib/utils';

type SponsorsProps = {
  condensed?: boolean;
  setApi?: (api: CarouselApi) => void;
}

export function Sponsors({ condensed = false, setApi }: SponsorsProps) {
  if (condensed) {
    return (
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {sponsors.map((sponsor) => (
            <CarouselItem key={sponsor.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <SponsorCard sponsor={sponsor} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  }

  return (
    <section id="sponsors" className={cn("py-16 md:py-24 bg-transparent w-full", condensed ? "p-0 py-0 md:py-0" : "md:scroll-snap-align-start")}>
      <div className={cn("container", condensed && "px-0")}>
          {!condensed && (
            <div className="mb-12 text-center">
              <h2 className="font-headline text-4xl font-bold md:text-5xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
                Our Sponsors
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
                Powering innovation and making this event possible.
              </p>
            </div>
          )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="h-full">
              <SponsorCard sponsor={sponsor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
