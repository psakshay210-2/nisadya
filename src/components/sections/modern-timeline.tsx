'use client';

import { schedule } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

// Assuming schedule data is imported from @/lib/data

export function ModernTimeline({ condensed }: { condensed?: boolean }) {
    const displaySchedule = condensed ? schedule.slice(0, 6) : schedule;

    return (
        <div className="w-full flex items-center justify-center">
            <div className="flex gap-4 sm:gap-6 overflow-x-auto px-4 pb-6 w-full snap-x snap-mandatory no-scrollbar pt-6">
                {displaySchedule.map((item, index) => (
                    <ModernTimelineCard key={index} item={item} index={index} />
                ))}
            </div>
        </div>
    );
}

function ModernTimelineCard({ item, index }: { item: any, index: number }) {
    const Icon = item.icon;

    // Generate a pseudo-random gradient based on index
    const gradients = [
        "from-blue-500/20 to-purple-500/20",
        "from-emerald-500/20 to-teal-500/20",
        "from-orange-500/20 to-red-500/20",
        "from-pink-500/20 to-rose-500/20",
    ];
    const gradient = gradients[index % gradients.length];

    return (
        <div className="group relative flex-shrink-0 w-[240px] h-[320px] rounded-2xl overflow-hidden cursor-default snap-center transition-all duration-500 hover:w-[280px] bg-black/40 backdrop-blur-md border border-white/5 hover:border-white/10">
            {/* Background Gradient */}
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-70 transition-opacity duration-500", gradient)} />

            {/* Content */}
            <div className="relative h-full p-6 flex flex-col">
                {/* Time Badge */}
                <div className="inline-flex self-start py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-white/90 mb-4">
                    {item.time}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 mb-auto rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white/80" />
                </div>

                {/* Text Content */}
                <div className="space-y-2 mt-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300 transition-colors">
                        {item.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
