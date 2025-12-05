import { Footer } from '@/components/layout/footer';
import { Accommodation } from '@/components/sections/accommodation';
import { Hero } from '@/components/sections/hero';
import { InstagramFeed } from '@/components/sections/instagram-feed';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="flex flex-col items-center text-center">
          <div className="relative animate-fade-in-up -mb-16">
            <Image
              src="/logo.png"
              alt="Nisadya Logo"
              width={2400}
              height={1200}
              className={'invert drop-shadow-[0_4px_10px_rgba(0,0,0,1)] h-auto'}
              priority
            />
          </div>
          <Hero />
        </section>
        <Accommodation />
        <InstagramFeed />
      </main>
      <Footer />
    </div>
  );
}
