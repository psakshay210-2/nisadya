import { schedule } from '@/lib/data';

export function Timeline() {
  return (
    <section id="schedule" className="py-16 md:py-24 bg-transparent">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold md:text-5xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Fest Schedule
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Plan your days and don't miss out on any of the action.
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
          {schedule.map((item, index) => (
            <div
              key={index}
              className="relative mb-8 flex w-full items-center"
            >
              <div
                className={`flex w-1/2 items-center ${
                  index % 2 === 0 ? 'justify-end pr-8' : 'justify-start pl-8'
                }`}
              >
                {index % 2 !== 0 && (
                  <div className="w-full">
                    <p className="font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">{item.title}</p>
                    <p className="text-sm text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="absolute left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card ring-2 ring-primary">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div
                className={`flex w-1/2 items-center ${
                  index % 2 === 0 ? 'justify-start pl-8' : 'justify-end pr-8'
                }`}
              >
                {index % 2 === 0 ? (
                  <div className="w-full">
                    <p className="font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">{item.title}</p>

                    <p className="text-sm text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
                      {item.description}
                    </p>
                  </div>
                ) : (
                    <p className="w-full text-right font-mono text-sm text-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">{item.time}</p>
                )}
              </div>
               {index % 2 === 0 && <p className="absolute right-[calc(50%+2rem)] w-1/2 text-left font-mono text-sm text-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">{item.time}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
