'use client';

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Ticket, Heart, Bed } from "lucide-react";
import { ModernEvents } from "./modern-events";
import { ModernTimeline } from "./modern-timeline";
import { ModernSponsors } from "./modern-sponsors";
import { ModernAccommodation } from "./modern-accommodation";

const tabs = [
    { id: "events", label: "Events", icon: Ticket },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "sponsors", label: "Sponsors", icon: Heart },
    { id: "accommodation", label: "Stay", icon: Bed },
];

export function ModernHeroTabs() {
    const [activeTab, setActiveTab] = useState("events");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="w-full h-[600px] bg-white/5 animate-pulse rounded-3xl" />;
    }

    return (
        <div className="flex flex-col w-full h-auto md:h-full max-w-7xl mx-auto space-y-6">
            {/* Floating Glass Navigation */}
            <div className="grid grid-cols-4 p-2 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full mx-auto w-full max-w-2xl shadow-2xl">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "relative flex items-center justify-center gap-2 py-3 rounded-full transition-all duration-500 ease-out overflow-hidden group",
                                isActive ? "text-white" : "text-white/60 hover:text-white"
                            )}
                        >
                            {isActive && (
                                <span className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-inner" />
                            )}
                            <Icon className={cn("relative z-10 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
                            <span className="relative z-10 text-xs sm:text-sm font-medium hidden xs:inline-block tracking-wide">{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Main Glass Content Container */}
            <div className="relative flex-1 w-full min-h-[500px] bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden group flex flex-col">

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] opacity-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] opacity-20 pointer-events-none" />

                {/* Content Area with Transitions */}
                {/* Content Area with Transitions - Grid Stack for Adaptive Height */}
                <div className="relative w-full flex-1 px-6 sm:px-8 py-6 grid grid-cols-1 items-center">
                    <div className={cn(
                        "col-start-1 row-start-1 w-full transition-all duration-700 ease-in-out transform",
                        activeTab === 'events' ? "opacity-100 translate-x-0 scale-100 z-10" : "opacity-0 translate-x-10 scale-95 pointer-events-none z-0"
                    )}>
                        <div className="flex items-center justify-center">
                            <ModernEvents condensed />
                        </div>
                    </div>

                    <div className={cn(
                        "col-start-1 row-start-1 w-full transition-all duration-700 ease-in-out transform",
                        activeTab === 'schedule' ? "opacity-100 translate-x-0 scale-100 z-10" : "opacity-0 translate-x-10 scale-95 pointer-events-none z-0"
                    )}>
                        <div className="flex items-center justify-center">
                            <ModernTimeline condensed />
                        </div>
                    </div>

                    <div className={cn(
                        "col-start-1 row-start-1 w-full transition-all duration-700 ease-in-out transform",
                        activeTab === 'sponsors' ? "opacity-100 translate-x-0 scale-100 z-10" : "opacity-0 translate-x-10 scale-95 pointer-events-none z-0"
                    )}>
                        <div className="flex items-center justify-center">
                            <ModernSponsors condensed />
                        </div>
                    </div>

                    <div className={cn(
                        "col-start-1 row-start-1 w-full transition-all duration-700 ease-in-out transform",
                        activeTab === 'accommodation' ? "opacity-100 translate-x-0 scale-100 z-10" : "opacity-0 translate-x-10 scale-95 pointer-events-none z-0"
                    )}>
                        <div className="flex items-center justify-center">
                            <ModernAccommodation condensed />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
