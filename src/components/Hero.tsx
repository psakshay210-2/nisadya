"use client";
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { SiteConfig, getDriveImage } from '@/lib/gsheet';
import { toast } from 'react-hot-toast';

const Hero = ({ config: initialConfig }: { config?: SiteConfig }) => {
    const [config] = useState<SiteConfig | null>({ ...initialConfig, registration_status: 'PRE_REGISTRATION' });
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
        // Target date: Configured date or Default (Feb 28, 2026)
        let dateStr = config?.hero_date || '2026-02-28';

        // Handle common date formats
        // If DD/MM/YYYY or DD-MM-YYYY
        if (dateStr.match(/^\d{2}[\/-]\d{2}[\/-]\d{4}$/)) {
            const [d, m, y] = dateStr.split(/[\/-]/);
            dateStr = `${y}-${m}-${d}`;
        }

        let targetDate = new Date(`${dateStr}T09:00:00`).getTime();

        // Fallback if date is invalid
        if (isNaN(targetDate)) {
            console.warn('Invalid hero_date format:', dateStr);
            targetDate = new Date('2026-02-28T09:00:00').getTime();
        }

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
    }, [config]);

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

    const getRegistrationState = () => {
        const now = new Date();
        const startDateStr = config?.registration_start_date;
        const endDateStr = config?.registration_end_date;

        // If no dates provided at all
        if (!startDateStr && !endDateStr) {
            return 'NO_DATES';
        }

        // Parse dates
        // Handle common date formats DD/MM/YYYY or DD-MM-YYYY conversions if needed, 
        // but assuming YYYY-MM-DD as per config or handling simpler parsing.
        // Let's make a safe parser helper
        const parseDate = (dateStr: string | undefined) => {
            if (!dateStr) return null;
            // Try standard constructor first
            let date = new Date(dateStr);
            // If invalid, try parsing generic formats
            if (isNaN(date.getTime())) {
                if (dateStr.match(/^\d{2}[\/-]\d{2}[\/-]\d{4}$/)) {
                    const [d, m, y] = dateStr.split(/[\/-]/);
                    date = new Date(`${y}-${m}-${d}`);
                }
            }
            return isNaN(date.getTime()) ? null : date;
        };

        const startDate = parseDate(startDateStr);
        const endDate = parseDate(endDateStr);

        // State: Before Registration Start
        // Case 1: Start date exists and is in future
        if (startDate && now < startDate) {
            return 'BEFORE_START';
        }

        // State: Registration Closed
        // Case 1: End date exists and is in past
        if (endDate && now > endDate) {
            return 'CLOSED';
        }

        // State: Open
        // If we are here, we are either between start and end, or only one boundary was defined and valid
        return 'OPEN';
    };

    // Compute exact state for rendering
    const registrationState = getRegistrationState();

    const handleRegister = () => {
        const state = registrationState;
        const startDateStr = config?.registration_start_date || '';

        if (state === 'NO_DATES') {
            toast.custom((t) => (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{
                        opacity: t.visible ? 1 : 0,
                        y: t.visible ? 0 : 20,
                        scale: t.visible ? 1 : 0.8
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="max-w-md w-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-2xl pointer-events-auto flex items-center p-4 ring-1 ring-black/5 dark:ring-white/10"
                >
                    <div className="flex-shrink-0 text-3xl mr-4 animate-bounce">
                        ⏳
                    </div>
                    <div className="flex-1">
                        <p className="text-base font-bold text-foreground">
                            Coming Soon!
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Registrations will be opening soon. Stay tuned!
                        </p>
                    </div>
                </motion.div>
            ), { position: 'bottom-center', duration: 4000 });
            return;
        }

        if (state === 'BEFORE_START') {
            toast.custom((t) => (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{
                        opacity: t.visible ? 1 : 0,
                        y: t.visible ? 0 : 20,
                        scale: t.visible ? 1 : 0.8
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="max-w-md w-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-2xl pointer-events-auto flex items-center p-4 ring-1 ring-black/5 dark:ring-white/10"
                >
                    <div className="flex-shrink-0 text-3xl mr-4 animate-bounce">
                        📅
                    </div>
                    <div className="flex-1">
                        <p className="text-base font-bold text-foreground">
                            Mark your calendars!
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Values registration starts from {startDateStr}.
                        </p>
                    </div>
                </motion.div>
            ), { position: 'bottom-center', duration: 4000 });
            return;
        }

        if (state === 'CLOSED') {
            toast.error("Registrations have been closed.", { position: 'bottom-center' });
            return;
        }

        // If OPEN
        if (config?.registration_link) {
            window.open(config.registration_link, '_blank');
        } else {
            const element = document.getElementById('events');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                toast.custom((t) => (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{
                            opacity: t.visible ? 1 : 0,
                            y: t.visible ? 0 : 20,
                            scale: t.visible ? 1 : 0.8
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="max-w-md w-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-2xl pointer-events-auto flex items-center p-4 ring-1 ring-black/5 dark:ring-white/10"
                    >
                        <div className="flex-shrink-0 text-3xl mr-4 animate-bounce">
                            🎫
                        </div>
                        <div className="flex-1">
                            <p className="text-base font-bold text-foreground">
                                Ready to Register?
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Select an event to start your registration!
                            </p>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        </div>
                    </motion.div>
                ), { position: 'bottom-center', duration: 4000 });
            }
        }
    };

    const getRegisterButtonText = () => {
        const state = registrationState;
        switch (state) {
            case 'NO_DATES': return 'Notify Me';
            case 'BEFORE_START': return 'Notify Me';
            case 'CLOSED': return 'Registration Closed';
            default: return 'Register Now'; // OPEN
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
                        src={config?.background_image_url ? getDriveImage(config.background_image_url) : "/bg-optimized.jpg"}
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
                            {config?.hero_subtitle || 'The Ultimate College Fest'}
                        </h2>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-6 relative z-10">
                            <span className="gradient-text drop-shadow-sm">NISADYA</span>
                            <span className="block text-4xl md:text-6xl lg:text-7xl mt-2 text-foreground/90 dark:text-white/90 font-heading">
                                {config?.hero_year || '2026'}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 md:mb-12 leading-relaxed"
                    >
                        {config?.hero_description || config?.about_description || 'Unleash your potential at the biggest cultural and technical extravaganza of the year. Join us for 3 days of innovation, creativity, and fun.'}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-16 w-full max-w-4xl"
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
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <button
                            onClick={handleScrollToEvents}
                            className="btn-outline text-lg px-10 py-4 glass hover:bg-primary/5 dark:hover:bg-white/5 border-primary/50"
                        >
                            Explore Events
                        </button>

                        <button
                            onClick={handleRegister}
                            className={`btn-primary text-lg px-10 py-4 shadow-xl shadow-primary/20 hover:shadow-primary/40 relative overflow-hidden group ${registrationState === 'CLOSED' ? 'opacity-80' : ''}`}
                            disabled={registrationState === 'CLOSED'}
                        >
                            <span className="relative z-10">{getRegisterButtonText()}</span>
                            {registrationState !== 'CLOSED' && (
                                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-[150%]" />
                            )}
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="hidden md:block text-xs font-medium text-muted-foreground/60 uppercase tracking-[0.2em]">scroll</span>
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
