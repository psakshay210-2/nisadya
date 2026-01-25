'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { fetchSheetData, GIDS } from '@/lib/gsheet';

interface ScheduleEvent {
    time: string;
    title: string;
    venue: string;
    category: string;
}

interface ScheduleDay {
    day: string;
    date: string;
    events: ScheduleEvent[];
}

interface RawScheduleRow {
    day: string;
    date: string;
    time: string;
    title: string;
    venue: string;
    category: string;
}

const Schedule = () => {
    const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
    const [loading, setLoading] = useState(true);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        const loadSchedule = async () => {
            setLoading(true);
            const rawData = await fetchSheetData(GIDS.SCHEDULE, (headers, row) => {
                const item: RawScheduleRow = {
                    day: row[headers.indexOf('day')] || '',
                    date: row[headers.indexOf('date')] || '',
                    time: row[headers.indexOf('time')] || '',
                    title: row[headers.indexOf('event name')] || '',
                    venue: row[headers.indexOf('venue')] || '',
                    category: row[headers.indexOf('category')] || ''
                };
                if (!item.day || !item.title) return null;
                return item;
            });

            // Group raw data by day
            const groupedByDay = (rawData as RawScheduleRow[]).reduce((acc, current) => {
                if (!current.day) return acc;

                const dayKey = `Day ${current.day}`;
                if (!acc[dayKey]) {
                    acc[dayKey] = {
                        day: dayKey,
                        date: current.date, // Will be empty if 'date' column doesn't exist
                        events: [],
                    };
                }
                acc[dayKey].events.push({
                    time: current.time,
                    title: current.title,
                    venue: current.venue,
                    category: current.category,
                });
                return acc;
            }, {} as Record<string, ScheduleDay>);

            const finalSchedule = Object.values(groupedByDay).sort((a, b) => a.day.localeCompare(b.day, undefined, { numeric: true }));
            setSchedule(finalSchedule);
            setLoading(false);
        };

        loadSchedule();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <section id="schedule" className="relative section-padding bg-background overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
            </div>

            <div className="container-custom relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-secondary text-sm font-semibold tracking-wider uppercase mb-4">
                        Plan your Days
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        Event <span className="gradient-text">Schedule</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Don't miss a beat. Check out the timeline for all the exciting events lined up for you.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <motion.div
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={containerVariants}
                        className="flex flex-wrap justify-center gap-8"
                    >
                        {schedule.map((day, dayIndex) => (
                            <motion.div
                                key={dayIndex}
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                                }}
                                className="relative group w-full max-w-md mx-4 sm:mx-0"
                            >
                                <div className="h-full glass p-4 sm:p-5 md:p-8 rounded-2xl sm:rounded-3xl border-t border-white/50 dark:border-white/10 relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                    <div className="absolute -right-2 -top-2 sm:-right-4 sm:-top-4 text-7xl sm:text-8xl md:text-9xl font-black text-foreground/[0.04] sm:text-foreground/5 select-none pointer-events-none">
                                        {String(dayIndex + 1).padStart(2, '0')}
                                    </div>

                                    <div className="relative z-10 mb-4 sm:mb-6 md:mb-8">
                                        <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-primary">{day.day}</h3>
                                        <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm">{day.date}</p>
                                    </div>

                                    <div className="relative space-y-5 sm:space-y-6 md:space-y-8 pl-4 sm:pl-6 border-l-2 border-primary/20">
                                        {day.events.map((event, eventIndex) => (
                                            <div key={eventIndex} className="relative group/event">
                                                <span className="absolute -left-[21px] sm:-left-[29px] top-1.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-4 border-background bg-primary transition-all duration-300 group-hover/event:scale-125" />

                                                <div className="transform transition-transform duration-300 group-hover/event:translate-x-2">
                                                    <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-1 block">
                                                        {event.time}
                                                    </span>
                                                    <h4 className="text-base sm:text-lg font-bold text-foreground mb-1 group-hover/event:text-primary transition-colors">
                                                        {event.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                        </svg>
                                                        <span>{event.venue}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Schedule;
