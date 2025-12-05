import { Footer } from '@/components/layout/footer';
import { Accommodation } from '@/components/sections/accommodation';
import { Hero } from '@/components/sections/hero';
import { InstagramFeed } from '@/components/sections/instagram-feed';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="flex flex-col items-center justify-start text-center overflow-hidden">
          <div className="relative -mt-16 md:-mt-32 lg:-mt-64">
            <Image
              src="/logo.png"
              alt="Nisadya Logo"
              width={1600}
              height={800}
              className={'invert drop-shadow-[0_4px_10px_rgba(0,0,0,1)] h-auto max-w-[24rem] md:max-w-2xl lg:max-w-4xl'}
              priority
            />
            <div className="-mt-16 md:-mt-24 lg:-mt-32">
                <Hero />
            </div>
          </div>
        </section>
        <Accommodation />
        <InstagramFeed />
      </main>
      <Footer />
    </div>
  );
}
