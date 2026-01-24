import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Events from '@/components/Events';
import Schedule from '@/components/Schedule';
import Sponsors from '@/components/Sponsors';
import Stay from '@/components/Stay';
import Maps from '@/components/Maps';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';

export default function Home() {
    return (
        <main className="relative">
            <ScrollProgress />
            <Navbar />
            <Hero />
            <About />
            <Events />
            <Schedule />
            <Sponsors />
            <Stay />
            <Maps />
            <Footer />
            <BackToTop />
        </main>
    );
}
