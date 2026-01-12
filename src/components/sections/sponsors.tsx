import { sponsors } from '@/lib/data';
import { SponsorCard } from '../sponsor-card';

export function Sponsors() {
  return (
    <section id="sponsors" className="py-16 md:py-24 bg-transparent w-full md:scroll-snap-align-start">
      <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-4xl font-bold md:text-5xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Our Sponsors
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              Powering innovation and making this event possible.
            </p>
          </div>
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
