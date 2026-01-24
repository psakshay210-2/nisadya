'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Sponsors = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const allSponsors = [
        { name: 'Tech Corp', tier: 'title' },
        { name: 'Innovation Labs', tier: 'title' },
        { name: 'Digital Solutions', tier: 'platinum' },
        { name: 'Cloud Services', tier: 'platinum' },
        { name: 'Smart Systems', tier: 'platinum' },
        { name: 'Media House', tier: 'gold' },
        { name: 'Creative Studio', tier: 'gold' },
        { name: 'Marketing Hub', tier: 'gold' },
        { name: 'Design Co', tier: 'gold' },
    ];

    // Duplicate for seamless loop
    const duplicatedSponsors = [...allSponsors, ...allSponsors];

    const getTierColor = (tier: string) => {
        switch (tier) {
            case 'title': return 'from-primary to-primary/60';
            case 'platinum': return 'from-secondary to-secondary/60';
            case 'gold': return 'from-accent to-accent/60';
            default: return 'from-primary to-primary/60';
        }
    };

    const getTierSize = (tier: string) => {
        switch (tier) {
            case 'title': return 'w-32 h-32 text-3xl';
            case 'platinum': return 'w-28 h-28 text-2xl';
            case 'gold': return 'w-24 h-24 text-xl';
            default: return 'w-28 h-28 text-2xl';
        }
    };

    return (
        <section id="sponsors" className="relative py-24 sm:py-32 bg-gradient-to-b from-background via-background to-background overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:96px_96px]" />

            <div className="container-custom relative z-10 px-4">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20 max-w-3xl mx-auto"
                >
                    <motion.span
                        initial={{ scale: 0.9 }}
                        animate={inView ? { scale: 1 } : {}}
                        className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 text-primary text-sm font-bold tracking-wider uppercase mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Our Partners
                    </motion.span>
                    <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                        Powered by <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Excellence</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Industry leaders and visionaries who make Nisadya possible
                    </p>
                </motion.div>

                {/* Infinite Marquee Scroll */}
                <div className="relative mb-24">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

                    <div className="overflow-hidden py-8">
                        <motion.div
                            animate={{ x: [0, -50 + '%'] }}
                            transition={{
                                duration: 40,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="flex gap-8"
                        >
                            {duplicatedSponsors.map((sponsor, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 group"
                                >
                                    <div className={`
                                        ${getTierSize(sponsor.tier)}
                                        rounded-3xl bg-gradient-to-br ${getTierColor(sponsor.tier)}
                                        flex items-center justify-center font-black text-white
                                        shadow-xl transition-all duration-300
                                        group-hover:scale-110 group-hover:shadow-2xl
                                        relative overflow-hidden
                                    `}>
                                        {/* Shimmer effect */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="relative z-10">{sponsor.name.charAt(0)}</span>
                                    </div>
                                    <p className="text-center mt-4 text-sm font-semibold text-foreground/70 group-hover:text-foreground transition-colors">
                                        {sponsor.name}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Sponsor Tiers - Clean Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="mb-24"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {/* Title Tier */}
                        <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 backdrop-blur-sm">
                            <div className="w-3 h-3 rounded-full bg-primary mx-auto mb-4" />
                            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Title</h3>
                            <p className="text-2xl font-black text-foreground">{allSponsors.filter(s => s.tier === 'title').length}</p>
                            <p className="text-xs text-muted-foreground mt-1">Partners</p>
                        </div>

                        {/* Platinum Tier */}
                        <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-secondary/5 to-transparent border border-secondary/20 backdrop-blur-sm">
                            <div className="w-3 h-3 rounded-full bg-secondary mx-auto mb-4" />
                            <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-2">Platinum</h3>
                            <p className="text-2xl font-black text-foreground">{allSponsors.filter(s => s.tier === 'platinum').length}</p>
                            <p className="text-xs text-muted-foreground mt-1">Partners</p>
                        </div>

                        {/* Gold Tier */}
                        <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-accent/5 to-transparent border border-accent/20 backdrop-blur-sm">
                            <div className="w-3 h-3 rounded-full bg-accent mx-auto mb-4" />
                            <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-2">Gold</h3>
                            <p className="text-2xl font-black text-foreground">{allSponsors.filter(s => s.tier === 'gold').length}</p>
                            <p className="text-xs text-muted-foreground mt-1">Partners</p>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="relative max-w-4xl mx-auto"
                >
                    <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-slate-900/60 dark:via-slate-900/40 dark:to-transparent backdrop-blur-xl border-2 border-white/20 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl p-12 text-center">
                        {/* Decorative gradient */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Partner with Nisadya
                            </h3>
                            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                                Join us in creating an unforgettable experience. Connect with thousands of talented students and showcase your brand.
                            </p>
                            <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all hover:-translate-y-1 active:scale-95">
                                Download Sponsorship Brochure
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Sponsors;
