import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Events } from '@/components/sections/events';
import { Hero } from '@/components/sections/hero';
import { Sponsors } from '@/components/sections/sponsors';
import { Timeline } from '@/components/sections/timeline';

export default function Home() {
  return (
    <div
      className="flex min-h-screen flex-col bg-cover bg-bottom bg-fixed"
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      <Header />
      <main className="flex-1">
        <Hero />
        <div>
          <Events />
          <Timeline />
          <Sponsors />
        </div>
      </main>
      <Footer />
    </div>
  );
}
