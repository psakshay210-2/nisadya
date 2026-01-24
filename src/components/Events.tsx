'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef, MouseEvent, useEffect, useState } from 'react';
import Image from 'next/image';

interface EventData {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    unstopLink: string;
    imageLink: string;
    coordinator: string;
    contact: string;
}

const parseCSV = (text: string) => {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentCell = '';
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (insideQuotes && nextChar === '"') {
                currentCell += '"';
                i++;
            } else {
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            currentRow.push(currentCell.trim());
            currentCell = '';
        } else if ((char === '\r' || char === '\n') && !insideQuotes) {
            if (char === '\r' && nextChar === '\n') i++;
            currentRow.push(currentCell.trim());
            if (currentRow.length > 1) rows.push(currentRow);
            currentRow = [];
            currentCell = '';
        } else {
            currentCell += char;
        }
    }
    if (currentCell) currentRow.push(currentCell.trim());
    if (currentRow.length > 1) rows.push(currentRow);
    return rows;
};

const getDriveImage = (link: string) => {
    const match = link.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? `https://lh3.googleusercontent.com/d/${match[1]}` : link;
};

const Events = () => {
    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vT7vRAeLIaAsM9SJYgjA8F0wb40RsDp712u8QRhRqB9oUVdfxh8kpkoAZ1RNsFQgwaBex_HcnkoUBEn/pub?output=csv');
                const text = await response.text();
                const parsedData = parseCSV(text);

                // Remove header row and map to object
                const headers = parsedData[0];
                const data = parsedData.slice(1).map(row => ({
                    name: row[0],
                    description: row[1],
                    startDate: row[2],
                    endDate: row[3],
                    unstopLink: row[4],
                    imageLink: row[5],
                    coordinator: row[6],
                    contact: row[7]
                })).filter(event => event.name && event.name.trim() !== ''); // Filter empty rows

                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        if (selectedId !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedId]);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedId(null);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <section id="events" className="relative py-24 sm:py-32 overflow-hidden bg-background">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
            </div>

            <div className="container-custom relative z-10 px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase mb-4">
                        Discover & Compete
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground tracking-tight">
                        Our <span className="gradient-text">Events</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Explore our lineup of competitions and register to showcase your skills. Click on any event to see more details.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                        {events.map((event, index) => (
                            <motion.div
                                layoutId={`card-${index}`}
                                key={index}
                                onClick={() => setSelectedId(index)}
                                className="cursor-pointer group h-full"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <motion.div
                                    className="relative h-full bg-white/5 dark:bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-2"
                                >
                                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                                        {event.imageLink ? (
                                            <Image
                                                src={getDriveImage(event.imageLink)}
                                                alt={event.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                                <svg className="w-16 h-16 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                            {event.startDate}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-foreground dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                            {event.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {event.description}
                                        </p>
                                        <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                            View Details →
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedId !== null && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Expanded Card Modal */}
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
                            <motion.div
                                layoutId={`card-${selectedId}`}
                                className="w-full max-w-2xl bg-background dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative pointer-events-auto flex flex-col max-h-[90vh]"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedId(null);
                                    }}
                                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center transition-colors"
                                >
                                    ✕
                                </button>

                                {/* Image Header */}
                                <div className="relative w-full h-64 sm:h-80 flex-shrink-0">
                                    {events[selectedId].imageLink ? (
                                        <Image
                                            src={getDriveImage(events[selectedId].imageLink)}
                                            alt={events[selectedId].name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                                    <div className="absolute bottom-6 left-6 right-6">
                                        <motion.h3
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-3xl sm:text-4xl font-black text-foreground dark:text-white mb-2"
                                        >
                                            {events[selectedId].name}
                                        </motion.h3>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="flex flex-wrap gap-3"
                                        >
                                            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-bold border border-primary/20">
                                                {events[selectedId].startDate}
                                                {events[selectedId].endDate && ` - ${events[selectedId].endDate}`}
                                            </span>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Content Scrollable Area */}
                                <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="space-y-8"
                                    >
                                        <div>
                                            <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                                                <span className="w-1 h-6 bg-primary rounded-full"></span>
                                                About the Event
                                            </h4>
                                            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                                {events[selectedId].description}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-secondary/5 p-6 rounded-2xl border border-secondary/10">
                                            <div>
                                                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Coordinator</div>
                                                <div className="font-semibold text-foreground">{events[selectedId].coordinator}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Contact</div>
                                                <div className="font-semibold text-foreground">{events[selectedId].contact}</div>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <a
                                                href={events[selectedId].unstopLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block w-full bg-primary hover:bg-primary/90 text-white text-center font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all hover:-translate-y-1 active:scale-95"
                                            >
                                                Register on Unstop
                                            </a>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Events;
