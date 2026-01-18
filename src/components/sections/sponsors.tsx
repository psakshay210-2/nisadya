
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
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="pr-4">
          {sponsors.map((sponsor) => (
            <CarouselItem key={sponsor.id} className="basis-full xs:basis-4/5 sm:basis-3/4 md:basis-1/2 lg:basis-1/3">
              <div className="h-full flex justify-center py-2">
                <SponsorCard sponsor={sponsor} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    )
  }

  return (
    <section id="sponsors" className={cn("py-10 xs:py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-transparent w-full", condensed ? "p-0 py-0 md:py-0" : "md:scroll-snap-align-start")}>
      <div className={cn("container", condensed && "px-0")}>
        {!condensed && (
          <div className="mb-6 xs:mb-7 sm:mb-8 md:mb-10 lg:mb-12 text-center">
            <h2 className="font-headline text-fluid-4xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Our Sponsors
            </h2>
            <p className="mx-auto mt-2 xs:mt-2.5 sm:mt-3 md:mt-4 max-w-2xl text-fluid-base text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Powering innovation and making this event possible.
            </p>
          </div>
        )}
        <div className="grid gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 justify-items-center">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="h-full w-full max-w-sm">
              <SponsorCard sponsor={sponsor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
