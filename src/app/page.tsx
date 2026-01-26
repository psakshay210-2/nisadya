import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Events from '@/components/Events';
import Schedule from '@/components/Schedule';
// import Sponsors from '@/components/Sponsors';
import Instagram from '@/components/Instagram';
// import Stay from '@/components/Stay';
import Maps from '@/components/Maps';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import { getServerData } from '@/lib/server-data';

export const revalidate = 30; // Revalidate every 30 seconds

export default async function Home() {
    // Fetch all data on the server
    const serverData = await getServerData();

    return (
        <main className="relative">
            <ScrollProgress />
            <Navbar config={serverData.config} />
            <Hero config={serverData.config} />
            <About config={serverData.config} />
            <Events initialEvents={serverData.events} />
            <Schedule initialSchedule={serverData.schedule} />
            {/* <Sponsors /> */}
            <Instagram initialPosts={serverData.instagram} />
            {/* <Stay /> */}
            <Maps />
            <Footer config={serverData.config} />
            <BackToTop />
        </main>
    );
}
