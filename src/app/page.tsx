import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Timeline } from '@/components/sections/timeline';
import { Events } from '@/components/sections/events';

export default function Home() {
  return (
    <div
      className="flex min-h-screen flex-col bg-cover bg-bottom bg-fixed"
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      <main className="flex-1">
        <Hero />
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
