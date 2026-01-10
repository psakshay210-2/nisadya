import { Footer } from '@/components/layout/footer';
import { Accommodation } from '@/components/sections/accommodation';
import { HeroTabs } from '@/components/sections/hero-tabs';
import { InstagramFeed } from '@/components/sections/instagram-feed';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="flex h-screen flex-col overflow-hidden">
          <div className="flex h-[30vh] items-center justify-center">
            <Image
              src="/logo.png"
              alt="Nisadya Logo"
              width={1600}
              height={800}
              className={'invert drop-shadow-[0_4px_10px_rgba(0,0,0,1)] h-auto max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl'}
              priority
            />
          </div>
          <div className="flex h-[70vh] items-start justify-center">
            <div className="container flex w-full max-w-6xl flex-1 flex-col items-center justify-center">
              <HeroTabs />
            </div>
          </div>
        </section>
        <InstagramFeed />
        <Accommodation />
      </main>
      <Footer />
    </div>
  );
}
