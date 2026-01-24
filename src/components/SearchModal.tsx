'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Papa from 'papaparse';
import { useRouter } from 'next/navigation';
import { locations } from './Maps';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface SearchResult {
    id: string;
    type: 'event' | 'section' | 'location';
    title: string;
    subtitle?: string;
    link?: string; // For sections or external
    action?: () => void; // For custom actions like scrolling
}

// Reuse parsing logic or just simple fetch for now
const fetchEventData = async (): Promise<SearchResult[]> => {
    try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vT7vRAeLIaAsM9SJYgjA8F0wb40RsDp712u8QRhRqB9oUVdfxh8kpkoAZ1RNsFQgwaBex_HcnkoUBEn/pub?output=csv');
        const text = await response.text();
        return new Promise((resolve) => {
            Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const events = results.data.map((row: any, index: number) => ({
                        id: `event-${index}`,
                        type: 'event' as const,
                        title: row['Event name'] || 'Untitled Event',
                        subtitle: row['Description'] ? row['Description'].substring(0, 60) + '...' : 'Event',
                        action: () => {
                            const eventsSection = document.getElementById('events');
                            if (eventsSection) {
                                eventsSection.scrollIntoView({ behavior: 'smooth' });
                                // Optional: Dispatch a custom event to open specific card if needed
                            }
                        }
                    })).filter(e => e.title !== 'Untitled Event');
                    resolve(events);
                },
                error: () => resolve([])
            });
        });
    } catch (e) {
        return [];
    }
};

const staticSections: SearchResult[] = [
    { id: 'home', type: 'section', title: 'Home', subtitle: 'Back to top', action: () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'about', type: 'section', title: 'About Us', subtitle: 'Legacy of Nisadya', action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'events', type: 'section', title: 'Events', subtitle: 'Browse competitions', action: () => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'schedule', type: 'section', title: 'Schedule', subtitle: 'Timeline of events', action: () => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'location', type: 'section', title: 'Map & Location', subtitle: 'Navigating NIT Trichy', action: () => document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' }) },
];

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [allData, setAllData] = useState<SearchResult[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Initial Data Load
    useEffect(() => {
        const loadData = async () => {
            const eventResults = await fetchEventData();

            // Rewrite event actions to dispatch custom event
            // Note: fetchEventData creates duplicate objects, let's just override here or refactor fetchEventData
            // Actually, simplest is to map the results again
            const enhancedEventResults = eventResults.map(e => ({
                ...e,
                action: () => {
                    // Dispatch custom event
                    window.dispatchEvent(new CustomEvent('nisadya:open-event', { detail: e.title }));
                }
            }));

            // Map Locations
            const locationResults = locations.map(loc => ({
                id: `loc-${loc.id}`,
                type: 'location' as const,
                title: loc.name,
                subtitle: loc.desc,
                action: () => {
                    // Dispatch highlight event
                    window.dispatchEvent(new CustomEvent('nisadya:highlight-location', { detail: loc.id }));
                }
            }));

            setAllData([...staticSections, ...locationResults, ...enhancedEventResults]);
        };
        loadData();
    }, []);

    // Filter Logic
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = allData.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            (item.subtitle && item.subtitle.toLowerCase().includes(lowerQuery))
        ).slice(0, 10); // Limit to 10 results

        setResults(filtered);
    }, [query, allData]);

    // Focus Input on Open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            setQuery(''); // Reset query on close
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    // Keyboard Navigation (Esc)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            // Cmd+K to toggle handled in parent usually, or we can prevent default here if open
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-4 top-[10%] max-w-2xl mx-auto z-[101] bg-background/90 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[60vh] md:max-h-[500px]"
                    >
                        {/* Search Input Header */}
                        <div className="flex items-center border-b border-white/10 p-4">
                            <svg className="w-5 h-5 text-muted-foreground mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search events, locations, or sections..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground"
                            />
                            <div className="hidden md:flex gap-2">
                                <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-muted/20 border border-white/10 text-xs text-muted-foreground font-mono">ESC</kbd>
                            </div>
                        </div>

                        {/* Results List */}
                        <div className="overflow-y-auto custom-scrollbar p-2">
                            {query && results.length === 0 ? (
                                <div className="p-8 text-center text-muted-foreground">
                                    No results found for "{query}"
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {results.map((result) => (
                                        <button
                                            key={result.id}
                                            onClick={() => {
                                                if (result.action) result.action();
                                                onClose();
                                            }}
                                            className="w-full flex items-center p-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors text-left group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
                                                {result.type === 'event' && '🎯'}
                                                {result.type === 'section' && '📑'}
                                                {result.type === 'location' && '📍'}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {result.title}
                                                </div>
                                                {result.subtitle && (
                                                    <div className="text-xs text-muted-foreground line-clamp-1">
                                                        {result.subtitle}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </button>
                                    ))}
                                    {!query && (
                                        <div className="p-4">
                                            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Suggested</div>
                                            {staticSections.slice(0, 3).map((result) => (
                                                <button
                                                    key={result.id}
                                                    onClick={() => {
                                                        if (result.action) result.action();
                                                        onClose();
                                                    }}
                                                    className="w-full flex items-center p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors text-left text-sm"
                                                >
                                                    <span className="mr-3">👉</span>
                                                    {result.title}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;
