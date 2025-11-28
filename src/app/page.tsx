import { Footer } from '@/components/layout/footer';
import { Accommodation } from '@/components/sections/accommodation';
import { Hero } from '@/components/sections/hero';
import { Timeline } from '@/components/sections/timeline';
import { Events } from '@/components/sections/events';
import { InstagramFeed } from '@/components/sections/instagram-feed';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Image
        src="/background.png"
        alt="Nisadya background"
        fill
        className="object-cover fixed -z-10"
        priority
      />
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <Hero />
          <Accommodation />
          <InstagramFeed />
          <div className="bg-transparent">
            <div className="lg:hidden">
              <Events />
              <Timeline />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
