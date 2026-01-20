'use client';

import { useEffect, useRef } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { sponsors } from '@/lib/data';

// Copying necessary data structure if not exported
import type { Sponsor } from '@/lib/types';

export function ModernSponsors({ condensed }: { condensed?: boolean }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const displaySponsors = condensed ? sponsors.slice(0, 5) : sponsors;

    // Triple duplicate for seamless infinite scroll
    const marqueeSponsors = [...displaySponsors, ...displaySponsors, ...displaySponsors];

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationId: number;
        let isUserInteracting = false;

        // Calculate the width of one set of sponsors
        const calculateSetWidth = () => {
            if (!scrollContainer) return 0;
            return scrollContainer.scrollWidth / 3;
        };

        // Auto-scroll function
        const autoScroll = () => {
            if (!isUserInteracting && scrollContainer) {
                scrollContainer.scrollLeft += 1; // Scroll speed

                const singleSetWidth = calculateSetWidth();

                // When we've scrolled past the second set (middle), reset to start of second set
                // This keeps us in the "infinite middle" zone
                if (scrollContainer.scrollLeft >= singleSetWidth * 2) {
                    scrollContainer.scrollLeft = singleSetWidth;
                }
            }
            animationId = requestAnimationFrame(autoScroll);
        };

        // Handle manual scroll to create infinite loop
        const handleScroll = () => {
            if (!scrollContainer) return;

            const singleSetWidth = calculateSetWidth();
            const scrollLeft = scrollContainer.scrollLeft;
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

            // If user scrolls to the end, loop back to the middle set
            if (scrollLeft >= maxScroll - 10) {
                scrollContainer.scrollLeft = singleSetWidth;
            }
            // If user scrolls to the beginning, loop to the middle set
            else if (scrollLeft <= 10) {
                scrollContainer.scrollLeft = singleSetWidth;
            }
        };

        // Pause on user interaction
        const handleInteractionStart = () => {
            isUserInteracting = true;
        };

        const handleInteractionEnd = () => {
            setTimeout(() => {
                isUserInteracting = false;
            }, 1000); // Resume after 1 second
        };

        // Add event listeners
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        scrollContainer.addEventListener('touchstart', handleInteractionStart, { passive: true });
        scrollContainer.addEventListener('touchend', handleInteractionEnd);
        scrollContainer.addEventListener('mouseenter', handleInteractionStart);
        scrollContainer.addEventListener('mouseleave', handleInteractionEnd);
        scrollContainer.addEventListener('wheel', handleInteractionStart, { passive: true });

        // Set initial scroll position to middle set
        scrollContainer.scrollLeft = calculateSetWidth();

        // Start auto-scroll
        animationId = requestAnimationFrame(autoScroll);

        return () => {
            cancelAnimationFrame(animationId);
            scrollContainer.removeEventListener('scroll', handleScroll);
            scrollContainer.removeEventListener('touchstart', handleInteractionStart);
            scrollContainer.removeEventListener('touchend', handleInteractionEnd);
            scrollContainer.removeEventListener('mouseenter', handleInteractionStart);
            scrollContainer.removeEventListener('mouseleave', handleInteractionEnd);
            scrollContainer.removeEventListener('wheel', handleInteractionStart);
        };
    }, [displaySponsors]);

    return (
        <div className="w-full relative overflow-hidden mask-gradient-x">
            <div
                ref={scrollRef}
                className="flex gap-4 sm:gap-6 overflow-x-scroll scrollbar-hide"
                style={{
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            >
                {marqueeSponsors.map((sponsor, index) => (
                    <div key={`${sponsor.id}-${index}`} className="flex-shrink-0">
                        <ModernSponsorCard sponsor={sponsor} />
                    </div>
                ))}
            </div>
        </div>
    );
}

function ModernSponsorCard({ sponsor }: { sponsor: Sponsor }) {
    const placeholder = PlaceHolderImages.find(p => p.id === sponsor.imageId);

    return (
        <div className="group relative flex-shrink-0 w-[260px] h-[320px] rounded-2xl overflow-hidden cursor-pointer snap-center transition-all duration-500 hover:w-[320px]">
            {/* Background Image / Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0" />
            {placeholder && (
                <Image
                    src={placeholder.imageUrl}
                    alt={sponsor.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                />
            )}

            {/* Glass Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />

            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="w-12 h-12 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {/* Logo placeholder or icon */}
                    <span className="text-xl font-bold text-white">{sponsor.name.charAt(0)}</span>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-white leading-tight">{sponsor.name}</h3>
                        <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/10 backdrop-blur-sm">
                            {sponsor.type}
                        </Badge>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 delay-75">
                        {sponsor.description}
                    </p>
                </div>
            </div>

            {/* Hover Border Effect */}
            <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-2xl transition-colors duration-300 pointer-events-none" />
        </div>
    )
}
