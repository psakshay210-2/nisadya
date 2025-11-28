import { schedule } from '@/lib/data';
import { cn } from '@/lib/utils';

type TimelineProps = {
  condensed?: boolean;
};

export function Timeline({ condensed = false }: TimelineProps) {
  if (condensed) {
    return (
      <div className="flex w-max p-4 gap-4">
        {schedule.map((item, index) => (
          <div key={index} className="w-64 h-full rounded-lg border bg-card/50 p-4 shadow-lg backdrop-blur-sm group shrink-0 flex flex-col">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card ring-2 ring-primary shrink-0">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">{item.title}</p>
                <p className="font-mono text-xs text-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">{item.time}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] mt-2 flex-grow">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    )
  }
  
  return (
    <section id="schedule" className={cn("py-16 md:py-24 bg-transparent", condensed && "py-0 md:py-0")}>
      <div className="container">
        {!condensed && (
            <div className="mb-12 text-center">
            <h2 className="font-headline text-4xl font-bold md:text-5xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
                Fest Schedule
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
                Plan your days and don't miss out on any of the action.
            </p>
            </div>
        )}

        <div className={cn("relative mx-auto max-w-4xl", condensed && "max-w-none")}>
          <div className={cn("absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border/50", condensed && "left-6")}></div>
          {schedule.map((item, index) => {
            
            const timelineCard = (
                <div className="w-full rounded-lg border bg-card/50 p-4 shadow-lg backdrop-blur-sm group">
                    <div className="flex justify-between items-center">
                        <p className="font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">{item.title}</p>
                        <p className={cn("font-mono text-xs text-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] shrink-0 ml-2", !condensed && "hidden")}>{item.time}</p>
                    </div>
                    <p className={cn("text-sm text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]", condensed ? "text-xs mt-1" : "text-sm")}>
                      {item.description}
                    </p>
                  </div>
            )

            return (
                <div
                key={index}
                className={cn("relative mb-8 flex w-full items-center", condensed && "mb-4")}
                >
                <div
                    className={cn(`flex w-1/2 items-center ${
                    index % 2 === 0 ? 'justify-end pr-12' : 'justify-start pl-12'
                    }`, condensed && `w-full ${index % 2 === 0 ? 'justify-start pl-16' : 'justify-start pl-16'}`)}
                >
                    {(!condensed && index % 2 !== 0) && timelineCard}
                    {(condensed) && timelineCard}
                </div>

                <div className={cn("absolute left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm", condensed && "left-6 h-10 w-10")}>
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-card ring-2 ring-primary", condensed && "h-8 w-8")}>
                    <item.icon className={cn("h-5 w-5 text-primary", condensed && "h-4 w-4")} />
                    </div>
                </div>

                <div
                    className={cn(`flex w-1/2 items-center ${
                    index % 2 === 0 ? 'justify-start pl-12' : 'justify-end pr-12'
                    }`, condensed && 'hidden')}
                >
                    {index % 2 === 0 ? timelineCard : (
                        <p className="w-full text-right font-mono text-sm text-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">{item.time}</p>
                    )}
                </div>
                {(!condensed && index % 2 === 0) && <p className="absolute right-[calc(50%+3rem)] w-1/2 text-left font-mono text-sm text-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">{item.time}</p>}
                </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
