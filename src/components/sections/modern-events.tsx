'use client';

import { useEvents } from '@/hooks/use-events';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { EventCard } from '@/components/event-card'; // Reuse the dialog logic/content if possible, or rebuild
// Actually, EventCard has the dialog built-in. I might want to reuse the dialog content but provide a new trigger.
// For now, let's rebuild the card UI but keep the same data.

export function ModernEvents({ condensed }: { condensed?: boolean }) {
    const { events, loading } = useEvents(condensed ? 5 : undefined);

    if (loading) {
        return (
            <div className="flex gap-4 overflow-x-hidden px-4 w-full justify-center">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="w-[280px] h-[360px] rounded-2xl bg-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="w-full flex items-center justify-center">
            <div className="flex gap-4 sm:gap-6 overflow-x-auto px-4 pb-6 w-full snap-x snap-mandatory no-scrollbar pt-6">
                {events.map((event) => (
                    <ModernEventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}

function ModernEventCard({ event }: { event: any }) {
    const placeholder = PlaceHolderImages.find(p => p.id === event.imageId) || PlaceHolderImages[0];

    // We can wrap this in the existing Dialog logic if we want standard behavior, 
    // or just make it purely visual for the 'redesign' request if interactivity isn't specified as 'opening a modal'.
    // User said "interactive", so modal is good. I'll use a simple Trigger wrapper if I can import standard EventCard.
    // Standard EventCard is a bit coupled. I'll implement a fresh card look.

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="group relative flex-shrink-0 w-[280px] h-[360px] rounded-2xl overflow-hidden cursor-pointer snap-center transition-all duration-500 hover:w-[320px] hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 ring-1 ring-white/10 hover:ring-white/30">
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
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
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
                                    {(() => {
                                        if (!event.startDate) return 'Date TBA';
                                        const d = new Date(event.startDate);
                                        return isNaN(d.getTime()) ? event.startDate : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                                    })()}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                                <MapPin className="w-3 h-3" />
                                <span>{event.location}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
                            {event.title}
                        </h3>

                        {/* Description (truncated) */}
                        <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 delay-100">
                            {event.description}
                        </p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-white/10">
                {/* Reusing standard event card content structure essentially, but we can't easily import just the body. 
                     For this demo prototype, I'll put a placeholder content or basic info. 
                     Ideally, I'd extract EventDialogContent from event-card.tsx.
                     
                     Fix: I will just render a simplified view here to avoid duplication complexity for now.
                 */}
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
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                        </div>
                    </div>
                    <p className="text-sm leading-relaxed">{event.description}</p>
                    <div className="pt-4 flex justify-end">
                        <Button className="w-full">Register Now</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
