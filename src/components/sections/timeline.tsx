import { schedule } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../ui/carousel';

type TimelineProps = {
  condensed?: boolean;
  setApi?: (api: CarouselApi) => void;
};

export function Timeline({ condensed = false, setApi }: TimelineProps) {
  if (condensed) {
    return (
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1.5 xs:-ml-2 sm:-ml-3 md:-ml-4">
          {schedule.map((item, index) => (
            <CarouselItem key={index} className="pl-1.5 xs:pl-2 sm:pl-3 md:pl-4 basis-full sm:basis-1/2">
              <div className="h-full">
                <div key={index} className="h-full rounded-lg border bg-card/80 p-3 xs:p-3.5 sm:p-4 shadow-lg group flex flex-col">
                  <div className="flex items-start gap-2.5 xs:gap-3 sm:gap-4">
                    <div className="flex h-9 w-9 xs:h-10 xs:w-10 items-center justify-center rounded-full bg-card ring-2 ring-primary shrink-0">
                      <item.icon className="h-4 w-4 xs:h-4.5 xs:w-4.5 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-sm xs:text-base">{item.title}</p>
                      <p className="font-mono text-xs text-primary">{item.time}</p>
                    </div>
                  </div>
                  <p className="text-xs xs:text-sm text-muted-foreground mt-2 flex-grow">
                    {item.description}
                  </p>
                </div>
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
    <section id="schedule" className={cn("py-12 sm:py-16 md:py-24 bg-transparent", condensed && "py-0 md:py-0")}>
      <div className="container">
        {!condensed && (
          <div className="mb-8 sm:mb-10 md:mb-12 text-center">
            <h2 className="font-headline text-fluid-4xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Fest Schedule
            </h2>
            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-fluid-base text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Plan your days and don't miss out on any of the action.
            </p>
          </div>
        )}

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-6 top-0 h-full w-0.5 -translate-x-1/2 bg-border/50 md:left-1/2"></div>
          {schedule.map((item, index) => {

            const timelineCard = (
              <div className="w-full rounded-lg border bg-card/50 p-4 shadow-lg backdrop-blur-sm group">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <p className="font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">{item.title}</p>
                  <p className="font-mono text-xs text-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] shrink-0 sm:ml-2 mt-1 sm:mt-0">{item.time}</p>
                </div>
                <p className="text-sm text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] mt-1">
                  {item.description}
                </p>
              </div>
            )

            return (
              <div
                key={index}
                className="relative mb-8 flex w-full items-center md:justify-normal"
              >
                <div
                  className={cn(`flex w-full items-center md:w-1/2`,
                    index % 2 === 0 ? 'md:justify-start md:pl-12' : 'md:justify-end md:pr-12'
                  )}
                >
                  {index % 2 !== 0 ? (
                    <div className='hidden md:block w-full'>{timelineCard}</div>
                  ) : <div className="hidden md:block"></div>}
                  <div className='block md:hidden w-full pl-12'>{timelineCard}</div>
                </div>

                <div className="absolute left-6 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm md:left-1/2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card ring-2 ring-primary">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>

                <div
                  className={cn(`flex w-full items-center md:w-1/2`,
                    index % 2 === 0 ? 'md:justify-start md:pl-12' : 'md:justify-end md:pr-12'
                  )}
                >
                  {index % 2 === 0 ? (
                    <div className='hidden md:block w-full'>{timelineCard}</div>
                  ) : <div className="hidden md:block"></div>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
