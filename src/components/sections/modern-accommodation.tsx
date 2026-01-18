'use client';

import { Bed, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccommodationForm } from "@/components/accommodation-form";
import Image from "next/image";

// Reusing the Accommodation Form but wrapping it in a modern card
// Checking previous imports, src/components/sections/accommodation.tsx used Accommodation component.
// Let's check what Accommodation exports. It likely exports a component that renders the form.
// I'll make a nice split card: Image/Info on left, Form on right (or condensed button).

export function ModernAccommodation({ condensed }: { condensed?: boolean }) {
    return (
        <div className="w-full flex items-center justify-center p-2 sm:p-4">
            <div className="w-full max-w-4xl bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl group hover:border-primary/30 transition-colors duration-500">

                {/* Visual Side */}
                <div className="relative w-full md:w-2/5 h-56 md:h-auto overflow-hidden">
                    <Image
                        src="/placeholder-event.jpg"
                        alt="Accommodation"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/20 text-primary mb-3">
                            <Bed className="w-4 h-4" />
                            <span className="font-bold tracking-wide text-xs uppercase">Nisadya Stay</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">On-Campus Housing</h3>
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>JNNCE Hostels</span>
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center bg-transparent relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />

                    <p className="text-gray-300 text-sm sm:text-lg leading-relaxed mb-8 relative z-10">
                        Experience the fest to the fullest. Secure, affordable, and safe accommodation right on campus grounds.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                            <span className="block text-2xl sm:text-3xl font-bold text-white mb-1">24/7</span>
                            <span className="text-xs sm:text-sm text-gray-400 font-medium">Security & Water</span>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                            <span className="block text-2xl sm:text-3xl font-bold text-white mb-1">₹150</span>
                            <span className="text-xs sm:text-sm text-gray-400 font-medium">Per Day / Person</span>
                        </div>
                    </div>

                    <Button className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all bg-primary text-primary-foreground rounded-xl">
                        Reserve Your Spot
                        <Navigation className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
