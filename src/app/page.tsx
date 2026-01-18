
import { Footer } from '@/components/layout/footer';
import { Accommodation } from '@/components/sections/accommodation';
import { ModernHeroTabs } from '@/components/sections/modern-hero-tabs';
import { InstagramFeed } from '@/components/sections/instagram-feed';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col relative w-full overflow-x-hidden text-neutral-200 selection:bg-cyan-500/30">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="/ceac77654caff7ad2ea74b7b22cccfa5_1768686012.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>
      <div className="md:h-screen md:overflow-y-scroll md:scroll-snap-type-y-mandatory">
        <main className="flex-1">
          <section className="flex min-h-screen md:h-screen md:min-h-[600px] md:max-h-[1200px] flex-col md:overflow-hidden md:scroll-snap-align-start relative">
            <div className="flex h-auto py-8 md:py-0 md:h-[30vh] md:min-h-[150px] md:max-h-[300px] items-center justify-center px-3 xs:px-4 sm:px-6 z-10">
              <Image
                src="/logo_white.png"
                alt="Nisadya Logo"
                width={1600}
                height={800}
                className="drop-shadow-[0_4px_10px_rgba(0,0,0,1)] h-auto w-full max-w-[90vw] xs:max-w-[80vw] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl transition-transform duration-300 ease-in-out hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-1 h-auto md:h-[70vh] md:min-h-[450px] items-start justify-center px-2 xs:px-3 sm:px-4 md:px-6 pb-8 md:pb-0 z-10">
              <div className="container flex w-full max-w-7xl flex-1 flex-col items-center justify-center">
                <ModernHeroTabs />
              </div>
            </div>
          </section>
          <InstagramFeed />
        </main>
      </div>
      <Footer />
    </div>
  );
}
