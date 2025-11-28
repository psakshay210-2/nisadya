import { Footer } from '@/components/layout/footer';
import { Accommodation } from '@/components/sections/accommodation';
import { Hero } from '@/components/sections/hero';
import { Timeline } from '@/components/sections/timeline';
import { Events } from '@/components/sections/events';
import { InstagramFeed } from '@/components/sections/instagram-feed';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="h-screen flex flex-col items-center justify-center text-center">
            <div className="relative mb-8 animate-fade-in-up">
                <Image
                src="/logo.png"
                alt="Nisadya Logo"
                width={400}
                height={200}
                className={'invert drop-shadow-[0_4px_10px_rgba(0,0,0,1)] w-full h-auto'}
                priority
                />
            </div>
        </section>
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
  );
}
