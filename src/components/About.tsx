'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { fetchSiteConfig, SiteConfig } from '@/lib/gsheet';

const About = () => {
    const [config, setConfig] = useState<SiteConfig | null>(null);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        const loadConfig = async () => {
            const data = await fetchSiteConfig();
            setConfig(data);
        };
        loadConfig();
    }, []);

    return (
        <section id="about" className="relative py-24 sm:py-32 bg-gradient-to-b from-background via-background to-background overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Primary Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px]"
                />

                {/* Mesh Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            <div className="container-custom relative z-10 px-4">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <motion.span
                        initial={{ scale: 0.9 }}
                        animate={inView ? { scale: 1 } : { scale: 0.9 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wider uppercase mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Who We Are
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl font-black mb-4 text-foreground tracking-tight">
                        About <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Us</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Discover the legacy and vision that drives excellence
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
                    {/* DoMS Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="group relative"
                    >
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700" />

                        {/* Card Container */}
                        <div className="relative h-full bg-gradient-to-br from-white/15 via-white/10 to-white/5 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-transparent backdrop-blur-xl border-2 border-white/30 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-1">

                            {/* Decorative Corner Gradient */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-[100px] opacity-50" />

                            {/* Content */}
                            <div className="relative p-8 sm:p-10">
                                {/* Icon & Title */}
                                <div className="flex items-start justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center backdrop-blur-sm"
                                        >
                                            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                            </svg>
                                        </motion.div>
                                        <div>
                                            <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                                                DoMS NITT
                                            </h3>
                                            <p className="text-xs text-primary font-semibold uppercase tracking-wider mt-1">
                                                Since 1978
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-4">
                                    <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
                                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                                        Since its inception in 1978, the Department of Management Studies at NIT Trichy (DoMS-NITT) has been a nexus of innovation and leadership, shaping the future of management professionals in India. As a department, under the Ministry of HRD, DoMS-NITT merges academic excellence with cutting-edge research to contribute to the nation's progress. It is set apart by its vibrant industry ties and an alumni network that continues to fuel growth through mentorship, offering students boundless learning opportunities and a roadmap to career success.
                                    </p>
                                </div>

                                {/* Bottom Decoration */}
                                <div className="mt-8 flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <div className="flex-1 h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
                                    <span className="text-xs text-primary font-bold">Excellence in Education</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Nisadya Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="group relative"
                    >
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-secondary via-accent/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700" />

                        {/* Card Container */}
                        <div className="relative h-full bg-gradient-to-br from-white/15 via-white/10 to-white/5 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-transparent backdrop-blur-xl border-2 border-white/30 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 group-hover:border-secondary/50 group-hover:shadow-2xl group-hover:shadow-secondary/20 group-hover:-translate-y-1">

                            {/* Decorative Corner Gradient */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-secondary/20 to-transparent rounded-bl-[100px] opacity-50" />

                            {/* Content */}
                            <div className="relative p-8 sm:p-10">
                                {/* Icon & Title */}
                                <div className="flex items-start justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/20 flex items-center justify-center backdrop-blur-sm"
                                        >
                                            <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                            </svg>
                                        </motion.div>
                                        <div>
                                            <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                                                {config?.about_title || "Nisadya '26"}
                                            </h3>
                                            <p className="text-xs text-secondary font-semibold uppercase tracking-wider mt-1">
                                                Flagship Business Fest
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-4">
                                    <div className="h-1 w-12 bg-gradient-to-r from-secondary to-transparent rounded-full" />
                                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                                        {config?.about_description || "Nisadya is the annual flagship business fest of the Department of Management Studies, NIT Tiruchirappalli. It is a vibrant convergence of ideas, insights, and entrepreneurial spirit, bringing together aspiring business leaders. Nisadya provides a dynamic platform for participants to compete, create, and collaborate with some of the brightest minds in management. Featuring a diverse range of events spanning multiple management domains, the fest enables tomorrow's managers to showcase their skills, test their strategic thinking, and engage with industry leaders."}
                                    </p>
                                </div>

                                {/* Bottom Decoration */}
                                <div className="mt-8 flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <div className="flex-1 h-px bg-gradient-to-r from-secondary/50 via-secondary/20 to-transparent" />
                                    <span className="text-xs text-secondary font-bold">Compete. Create. Collaborate</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
