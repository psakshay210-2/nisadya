'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        // Target date: March 15, 2026
        const targetDate = new Date('2026-03-15T09:00:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const timeUnits = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds }
    ];

    const handleScrollToEvents = () => {
        const element = document.getElementById('events');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
        >
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                {/* Background Image */}
                <div className="absolute inset-0 z-[-1]">
                    <Image
                        src="/bg.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-80 dark:opacity-70"
                        priority
                    />
                </div>

                {/* Vignette & Color Tint */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(255,253,245,0.8)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_20%,#020617_100%)]" />
                <div className="absolute inset-0 bg-gradient-to-br from-cream/30 to-primary/10 dark:from-slate-950/40 dark:to-slate-900/40 mix-blend-overlay" />
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 dark:opacity-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/30 blur-[100px] animate-float" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/30 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-accent/20 blur-[100px] animate-float" style={{ animationDelay: '4s' }} />
                </div>
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                {/* Bottom Fade - Scroll Triggered & Enhanced Blend */}
                <motion.div
                    style={{ opacity: useTransform(scrollY, [0, 400], [0, 1]) }}
                    className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background via-background/80 to-transparent z-10"
                />
            </div>

            <div className="container-custom relative z-10 px-4">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6 relative"
                    >
                        {/* Decorative floating element */}
                        <motion.div style={{ y: y2 }} className="absolute -top-10 -right-10 md:-right-20 w-20 h-20 md:w-32 md:h-32 z-0 opacity-60 pointer-events-none select-none">
                            <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-accent blur-xl animate-pulse" />
                        </motion.div>

                        <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] text-secondary dark:text-secondary-light mb-4 uppercase">
                            The Ultimate College Fest
                        </h2>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-6 relative z-10">
                            <span className="gradient-text drop-shadow-sm">NISADYA</span>
                            <span className="block text-4xl md:text-6xl lg:text-7xl mt-2 text-foreground/90 dark:text-white/90 font-heading">
                                2026
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
                    >
                        Unleash your potential at the biggest cultural and technical extravaganza of the year. Join us for 3 days of innovation, creativity, and fun.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 w-full max-w-4xl"
                    >
                        {timeUnits.map((unit, index) => (
                            <div
                                key={unit.label}
                                className="glass group hover:bg-white/90 dark:hover:bg-slate-800/90 p-4 md:p-6 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-2 border-t border-white/40 dark:border-white/10"
                            >
                                <span className="text-3xl md:text-5xl lg:text-6xl font-black text-primary dark:text-primary-light mb-2 font-mono">
                                    {String(unit.value).padStart(2, '0')}
                                </span>
                                <span className="text-xs md:text-sm uppercase tracking-wider font-semibold text-secondary/80 dark:text-secondary-light/80">
                                    {unit.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto"
                    >
                        <button className="btn-primary text-lg px-10 py-4 shadow-xl shadow-primary/20 hover:shadow-primary/40 relative overflow-hidden group">
                            <span className="relative z-10">Register Now</span>
                            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        </button>
                        <button
                            onClick={handleScrollToEvents}
                            className="btn-outline text-lg px-10 py-4 glass hover:bg-primary/5 dark:hover:bg-white/5 border-primary/50"
                        >
                            Explore Events
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs font-medium text-muted-foreground/60 uppercase tracking-[0.2em]">scroll</span>
                <div className="w-5 h-9 border-2 border-muted-foreground/30 rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 h-1 bg-primary rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
