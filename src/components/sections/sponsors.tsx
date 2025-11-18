import { sponsors } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';

export function Sponsors() {
  return (
    <section id="sponsors" className="py-16 md:py-24 bg-transparent">
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
                className="flex items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100"
              >
                <Image
                  src={placeholder.imageUrl}
                  alt={sponsor.name}
                  width={200}
                  height={100}
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
