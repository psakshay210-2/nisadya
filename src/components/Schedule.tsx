'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Schedule = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const schedule = [
        {
            day: 'Day 01',
            date: 'March 15, 2026',
            events: [
                { time: '09:00 AM', title: 'Inauguration Ceremony', venue: 'Main Auditorium', category: 'General' },
                { time: '11:00 AM', title: 'Cultural Performances', venue: 'Open Air Theatre', category: 'Cultural' },
                { time: '02:00 PM', title: 'Hackathon Kickoff', venue: 'Computer Labs', category: 'Technical' },
                { time: '05:00 PM', title: 'Art Exhibition', venue: 'Exhibition Hall', category: 'Art' },
                { time: '07:00 PM', title: 'EDM Night', venue: 'Main Stage', category: 'Entertainment' },
            ],
        },
        {
            day: 'Day 02',
            date: 'March 16, 2026',
            events: [
                { time: '09:00 AM', title: 'Sports Tournaments', venue: 'Sports Complex', category: 'Sports' },
                { time: '11:00 AM', title: 'RoboWars', venue: 'Tech Park', category: 'Technical' },
                { time: '02:00 PM', title: 'Literary Debate', venue: 'Seminar Hall', category: 'Literary' },
                { time: '05:00 PM', title: 'Fashion Show', venue: 'Main Auditorium', category: 'Cultural' },
                { time: '08:00 PM', title: 'Star Night', venue: 'Open Grounds', category: 'Entertainment' },
            ],
        },
        {
            day: 'Day 03',
            date: 'March 17, 2026',
            events: [
                { time: '09:00 AM', title: 'Finals & Shutdown', venue: 'Various Venues', category: 'General' },
                { time: '02:00 PM', title: 'Battle of Bands', venue: 'Main Stage', category: 'Cultural' },
                { time: '05:00 PM', title: 'Prize Distribution', venue: 'Main Auditorium', category: 'General' },
                { time: '07:00 PM', title: 'Grand Finale', venue: 'Main Auditorium', category: 'Entertainment' },
            ],
        },
    ];

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
            {/* Background Gradients */}
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

                <motion.div
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {schedule.map((day, dayIndex) => (
                        <motion.div
                            key={dayIndex}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                            }}
                            className="relative group"
                        >
                            <div className="h-full glass p-8 rounded-3xl border-t border-white/50 dark:border-white/10 relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                {/* Decorative Number */}
                                <div className="absolute -right-4 -top-4 text-9xl font-black text-foreground/5 select-none pointer-events-none">
                                    {String(dayIndex + 1).padStart(2, '0')}
                                </div>

                                <div className="relative z-10 mb-8">
                                    <h3 className="text-3xl font-bold mb-2 text-primary">{day.day}</h3>
                                    <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm">{day.date}</p>
                                </div>

                                <div className="relative space-y-8 pl-6 border-l-2 border-primary/20">
                                    {day.events.map((event, eventIndex) => (
                                        <div key={eventIndex} className="relative group/event">
                                            {/* Timeline Dot */}
                                            <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-4 border-background bg-primary transition-all duration-300 group-hover/event:scale-125" />

                                            <div className="transform transition-transform duration-300 group-hover/event:translate-x-2">
                                                <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-1 block">
                                                    {event.time}
                                                </span>
                                                <h4 className="text-lg font-bold text-foreground mb-1 group-hover/event:text-primary transition-colors">
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
            </div>
        </section>
    );
};

export default Schedule;
