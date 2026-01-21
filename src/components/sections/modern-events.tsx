'use client';

import { useState, useEffect } from 'react';
import { events } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Calendar, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { fetchEventsFromGoogleSheet } from '@/lib/google-sheets';
import type { Event } from '@/lib/types';

// TODO: Replace this empty string with your "Published to Web" CSV link
const GOOGLE_SHEET_EVENTS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRUq7acmGE8gLOKh2pz8RKltgw1sGxFXS0Hg9uJfpA_0OZvqqHt_QkN8DTND6JyfwXsHKMgeH4r6RUM/pub?gid=0&single=true&output=csv";

export function ModernEvents({ condensed }: { condensed?: boolean }) {
    const [dynamicEvents, setDynamicEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadEvents() {
            if (!GOOGLE_SHEET_EVENTS_URL) {
                setLoading(false);
                return;
            }
            try {
                const fetched = await fetchEventsFromGoogleSheet(GOOGLE_SHEET_EVENTS_URL);
                if (fetched.length > 0) {
                    setDynamicEvents(fetched);
                }
            } catch (error) {
                console.error("Failed to load events from sheet", error);
            } finally {
                setLoading(false);
            }
        }
        loadEvents();
    }, []);

    // Use dynamic events if available, otherwise fallback to static data
    const sourceData = dynamicEvents.length > 0 ? dynamicEvents : events;
    const displayEvents = condensed ? sourceData.slice(0, 5) : sourceData;

    if (loading && GOOGLE_SHEET_EVENTS_URL) {
        return (
            <div className="w-full h-[360px] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-sm text-white/50 animate-pulse">Loading events...</p>
            </div>
        );
    }

    return (
        <div className="w-full flex items-center justify-center">
            <div className="flex gap-4 sm:gap-6 overflow-x-auto px-4 pb-6 w-full snap-x snap-mandatory no-scrollbar pt-6">
                {displayEvents.map((event) => (
                    <ModernEventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}

function ModernEventCard({ event }: { event: Event }) {
    const placeholder = PlaceHolderImages.find(p => p.id === event.imageId) || PlaceHolderImages[0];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="group relative flex-shrink-0 w-[250px] sm:w-[280px] h-[320px] sm:h-[360px] rounded-2xl overflow-hidden cursor-pointer snap-center transition-all duration-500 sm:hover:w-[320px] hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 ring-1 ring-white/10 hover:ring-white/30">
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-gray-900">
                        <Image
                            src={event.imageUrl || placeholder.imageUrl}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
                        {/* Top Badge */}
                        <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <Badge className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-none">
                                View Details <ArrowRight className="ml-1 w-3 h-3" />
                            </Badge>
                        </div>

                        {/* Date & Location */}
                        <div className="flex items-center gap-3 text-white/80 text-xs mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                            <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                                <Calendar className="w-3 h-3" />
                                <span>
                                    {event.startDate && !isNaN(new Date(event.startDate).getTime())
                                        ? new Date(event.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                                        : 'TBA'}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                                <MapPin className="w-3 h-3" />
                                <span>{event.location}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
                            {event.title}
                        </h3>

                        {/* Description (truncated) */}
                        <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 delay-100">
                            {event.description}
                        </p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] w-full sm:max-w-[500px] p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-white/10 rounded-2xl">
                <div className="relative h-48 w-full">
                    <Image
                        src={event.imageUrl || placeholder.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                        <h2 className="text-2xl font-bold text-white">{event.title}</h2>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex flex-wrap justify-between items-start gap-4 text-sm text-muted-foreground">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-white/90">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span>
                                    {event.startDate}
                                    {event.endDate ? ` - ${event.endDate}` : ''}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-white/90">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>{event.location}</span>
                            </div>
                        </div>

                        {(event.coordinator || event.contact) && (
                            <div className="text-right space-y-1">
                                {event.coordinator && (
                                    <div className="text-xs text-gray-400">
                                        Coordinator: <span className="text-white">{event.coordinator}</span>
                                    </div>
                                )}
                                {event.contact && (
                                    <div className="text-xs text-gray-400">
                                        Contact: <span className="text-white">{event.contact}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-white/80 uppercase tracking-wider">About Event</h4>
                        <p className="text-sm leading-relaxed text-gray-300">{event.description}</p>
                    </div>

                    <div className="pt-4 flex justify-end">
                        {event.registrationLink ? (
                            <Button className="w-full sm:w-auto" asChild>
                                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                                    Register on Unstop <ArrowRight className="ml-2 w-4 h-4" />
                                </a>
                            </Button>
                        ) : (
                            <Button className="w-full sm:w-auto" disabled>
                                Registration Closed
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
