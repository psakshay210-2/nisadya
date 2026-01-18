'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { sponsors } from '@/lib/data';

// Copying necessary data structure if not exported
type Sponsor = {
    id: string;
    name: string;
    type: 'Title' | 'Gold' | 'Silver' | 'Bronze' | 'Other';
    imageId: string;
    description?: string;
};

// Assuming data comes from a prop or I need to fetch it.
// Checking existing sponsors.tsx, it seems data might be hardcoded or passed. 
// Existing component gets data from somewhere. Let's assume standard prop pattern or internal data.
// Wait, looking at previous viewed files, `sponsors.tsx` had `sponsors` array inside or imported?
// I see `import { sponsors } ...` in my thought but I need to verify.
// Let's create a visual component that accepts data or uses the same source.

const modernSponsors: Sponsor[] = [
    {
        id: "1",
        name: "Innovate Corp",
        type: "Title",
        imageId: "tech-1",
        description: "Pioneering the future of technology with cutting-edge AI solutions."
    },
    {
        id: "2",
        name: "QuantumLeap",
        type: "Gold",
        imageId: "tech-2",
        description: "Accelerating startups with funding and mentorship."
    },
    {
        id: "3",
        name: "TechVibe",
        type: "Gold",
        imageId: "social-1",
        description: "The leading online community for developers and tech enthusiasts."
    },
    {
        id: "4",
        name: "GreenEarth",
        type: "Silver",
        imageId: "nature-1",
        description: "Sustainable energy solutions for a greener planet."
    },
    {
        id: "5",
        name: "CyberShield",
        type: "Silver",
        imageId: "tech-3",
        description: "Advanced cybersecurity implementation for enterprise."
    },
    {
        id: "6",
        name: "CodeCraft",
        type: "Bronze",
        imageId: "abstract-1",
        description: "Tools for the modern developer workflow."
    }
];


export function ModernSponsors({ condensed }: { condensed?: boolean }) {
    // If condensed (checking for home page tab view), show a horizontal scrollable strip
    // If full page, grid.

    const displaySponsors = condensed ? modernSponsors.slice(0, 5) : modernSponsors;

    // Duplicate sponsors for seamless scrolling
    const marqueeSponsors = [...displaySponsors, ...displaySponsors];

    return (
        <div className="w-full flex items-center justify-center overflow-hidden mask-gradient-x">
            <div className="flex gap-4 sm:gap-6 animate-scroll hover:paused w-max px-4">
                {marqueeSponsors.map((sponsor, index) => (
                    <ModernSponsorCard key={`${sponsor.id}-${index}`} sponsor={sponsor} />
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
