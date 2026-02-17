import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Events from '@/components/Events';
import Schedule from '@/components/Schedule';
// import Sponsors from '@/components/Sponsors';
import Instagram from '@/components/Instagram';
import Stay from '@/components/Stay';
import Maps from '@/components/Maps';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import { getServerData } from '@/lib/server-data';
// Removed: export const revalidate = 30; 
// Removed: export const dynamic = 'force-dynamic'; 
// This allows the page to be statically generated at build time.

export default async function Home() {
    // Fetch all data on the server
    const serverData = await getServerData();

    return (
        <main className="relative">
            <ScrollProgress />
            <Navbar config={serverData.config} />
            <Hero config={serverData.config} />
            <About config={serverData.config} />
            <Suspense fallback={
                <section className="relative py-24 sm:py-32 bg-background">
                    <div className="flex justify-center items-center py-20">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                </section>
            }>
                <Events initialEvents={serverData.events} />
            </Suspense>
            <Schedule initialSchedule={serverData.schedule} />
            {/* <Sponsors /> */}
            <Instagram initialPosts={serverData.instagram} />
            <Stay config={serverData.config} />
            <Maps taxiContacts={serverData.config.taxi_contacts} />
            <Footer config={serverData.config} />
            <BackToTop />
        </main>
    );
}
