import { Footer } from '@/components/layout/footer';
import { HeroTabs } from '@/components/sections/hero-tabs';
import { InstagramFeed } from '@/components/sections/instagram-feed';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col relative w-full overflow-x-hidden text-neutral-200 selection:bg-cyan-500/30">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="/bg-optimized.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      <div className="flex flex-col flex-1">
        <main className="flex-1 flex flex-col">
          {/* Hero Section as a Playing Card */}
          <section className="flex-grow flex items-center justify-center p-4 md:p-8 min-h-[70vh]">
            <div
              className="
                group relative
                w-full max-w-[320px] aspect-[9/14]
                md:max-w-4xl md:aspect-video
                bg-black/30 backdrop-blur-xl
                border border-white/10
                rounded-2xl md:rounded-3xl
                shadow-2xl shadow-black/50
                flex items-center justify-center
                transition-all duration-300 ease-in-out
                hover:scale-[1.02] hover:shadow-primary/20 hover:border-primary/20
                hover:shadow-2xl
              "
            >
              {/* Card Content */}
              <div className="relative w-4/5 md:w-3/5">
                <Image
                  src="/logo_white.png"
                  alt="Nisadya Logo"
                  width={1600}
                  height={800}
                  className="
                    w-full h-auto
                    drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                  priority
                />
              </div>
              
              {/* Decorative Corner Elements */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 text-center text-white w-10 md:w-12 font-headline text-2xl md:text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
                N
              </div>
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-center text-white w-10 md:w-12 font-headline text-2xl md:text-3xl opacity-50 group-hover:opacity-100 transition-opacity transform rotate-180">
                N
              </div>
            </div>
          </section>
          
          <section className="py-12 md:py-20 lg:py-24">
            <div className="container">
              <HeroTabs />
            </div>
          </section>

          <InstagramFeed />
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
