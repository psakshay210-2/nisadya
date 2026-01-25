'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

// Dynamically import Leaflet components with ssr: false
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    { ssr: false }
);

// Location Data for NIT Trichy
const LOCATIONS = [
    { name: 'NITT Main Gate', lat: 10.75687, lng: 78.81331, color: '#f59e0b', type: 'Entry', info: 'Main entrance to the campus from NH83.' },
    { name: 'Admin Block', lat: 10.75895, lng: 78.81324, color: '#ffffff', type: 'Admin', info: 'Director\'s office and administrative sections.' },
    { name: 'Barn Hall', lat: 10.75932, lng: 78.81329, color: '#3b82f6', type: 'Venue', info: 'The iconic main venue for major fest events.' },
    { name: 'Orion', lat: 10.75975, lng: 78.81079, color: '#8b5cf6', type: 'Lecture', info: 'Modern lecture hall complex.' },
    { name: 'LHC', lat: 10.76101, lng: 78.81417, color: '#ec4899', type: 'Lecture', info: 'New Lecture Hall Complex for classes.' },
    { name: 'Octagon', lat: 10.76054, lng: 78.81483, color: '#06b6d4', type: 'Comp Lab', info: '24/7 Computer Center & Internet usage.' },
    { name: 'Ojas (EEE)', lat: 10.76116, lng: 78.80891, color: '#10b981', type: 'Dept', info: 'Electrical & Electronics Engineering Dept.' },
    { name: 'Sports Complex', lat: 10.75770, lng: 78.81666, color: '#ef4444', type: 'Sports', info: 'Stadium, indoor stadium, and gym facilities.' },
    { name: 'NITT Hospital', lat: 10.76262, lng: 78.81886, color: '#f43f5e', type: 'Medical', info: '24/7 Campus Hospital.' },
];

const CustomMarker = ({ loc, icon }: { loc: any, icon: any }) => {
    const markerRef = useRef<any>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseOver = (e: any) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        e.target.openPopup();
    };

    const handleMouseOut = (e: any) => {
        timeoutRef.current = setTimeout(() => {
            e.target.closePopup();
        }, 300);
    };

    const handlePopupMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const handlePopupMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            markerRef.current?.closePopup();
        }, 300);
    };

    return (
        <Marker
            ref={markerRef}
            position={[loc.lat, loc.lng]}
            icon={icon}
            eventHandlers={{
                mouseover: handleMouseOver,
                mouseout: handleMouseOut,
                click: (e) => e.target.openPopup(),
            }}
        >
            <Popup>
                <div
                    className="p-1 min-w-[150px]"
                    onMouseEnter={handlePopupMouseEnter}
                    onMouseLeave={handlePopupMouseLeave}
                >
                    <span className="text-[10px] font-bold tracking-wider uppercase opacity-70" style={{ color: loc.color }}>
                        {loc.type}
                    </span>
                    <h3 className="font-bold text-white text-sm my-1">{loc.name}</h3>
                    <div className="h-0.5 w-full bg-gradient-to-r from-white/20 to-transparent my-2" />

                    <div className="flex flex-col gap-2">
                        <p className="text-[10px] text-slate-400 leading-snug">
                            {loc.info}
                        </p>
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-white/10 hover:bg-white/20 text-white py-1.5 px-3 rounded-md text-center transition-colors flex items-center justify-center gap-1.5 font-medium"
                        >
                            <span>📍</span> Get Directions
                        </a>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
};

const Maps = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [L, setL] = useState<any>(null);

    useEffect(() => {
        setIsMounted(true);
        // Import Leaflet implementation only on client
        import('leaflet').then((module) => {
            setL(module.default);
        });
    }, []);

    if (!isMounted || !L) {
        return (
            <section className="relative w-full h-[500px] bg-slate-950 flex items-center justify-center border-y border-white/10">
                <div className="text-white/20 animate-pulse">Loading Map...</div>
            </section>
        );
    }

    // Custom Icon Generator using L which is now available
    const getIcon = (color: string) => L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="
            background-color: ${color};
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 10px ${color}, 0 0 20px ${color}40;
            position: relative;
        ">
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: ${color};
                opacity: 0.2;
                animation: pulse-ring 2s infinite;
            "></div>
        </div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    });

    return (
        <section id="location" className="relative py-20 bg-slate-950 overflow-hidden">
            <div className="container-custom px-4">
                <div className="mb-12 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase mb-4">
                        Location
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white">
                        Find Your <span className="text-primary">Way</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[600px]">
                    {/* Left Side: Interactive Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-2 h-[400px] lg:h-full relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group"
                    >
                        {/* Map Overlay Card */}
                        <div className="absolute bottom-6 left-6 right-6 z-[400] pointer-events-none">
                            <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-xl pointer-events-auto flex items-center justify-between">
                                <div>
                                    <h3 className="text-white font-bold text-lg">NIT Tiruchirappalli</h3>
                                    <p className="text-slate-400 text-sm">Tanjore Main Road, NH83</p>
                                </div>
                                <a
                                    href="https://goo.gl/maps/6jJ2y1jQkQ92"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-primary/25"
                                >
                                    Get Directions
                                </a>
                            </div>
                        </div>

                        <MapContainer
                            center={[10.7610, 78.8139]}
                            zoom={16}
                            scrollWheelZoom={false}
                            className="w-full h-full z-0 bg-[#020617]"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            />
                            {LOCATIONS.map((loc, idx) => (
                                <CustomMarker
                                    key={idx}
                                    loc={loc}
                                    icon={getIcon(loc.color)}
                                />
                            ))}
                        </MapContainer>
                    </motion.div>

                    {/* Right Side: Info Cards */}
                    <div className="lg:col-span-1 flex flex-col gap-6 h-full">
                        {/* Address Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-slate-900/50 border border-white/10 p-6 rounded-3xl flex-1 backdrop-blur-sm"
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">🏛️</span>
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-2">Address</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        National Institute of Technology,<br />
                                        Tanjore Main Road, NH 83,<br />
                                        Tiruchirappalli - 620015,<br />
                                        Tamil Nadu, India.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Transport Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 flex-[2]">
                            {/* Airport */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-slate-900/50 border border-white/10 p-6 rounded-3xl hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-2xl">✈️</span>
                                    <h3 className="text-white font-bold">Airport (TRZ)</h3>
                                </div>
                                <p className="text-slate-400 text-sm">
                                    ~25km away. Taxi/Cab services readily available to reach the campus.
                                </p>
                            </motion.div>

                            {/* Railway */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="bg-slate-900/50 border border-white/10 p-6 rounded-3xl hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-2xl">🚂</span>
                                    <h3 className="text-white font-bold">Railway Station</h3>
                                </div>
                                <p className="text-slate-400 text-sm">
                                    TPJ Junction (~22km). Direct buses to Thuvakudi stop at NIT Main Gate.
                                </p>
                            </motion.div>

                            {/* Bus */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="bg-slate-900/50 border border-white/10 p-6 rounded-3xl hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-2xl">🚌</span>
                                    <h3 className="text-white font-bold">Bus Terminals</h3>
                                </div>
                                <p className="text-slate-400 text-sm">
                                    Central Stand (~22km) | Chatram Stand (~18km). Route #128, #100 series to NIT.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes pulse-ring {
                    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                    50% { opacity: 0.3; }
                    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
                }
                .leaflet-popup-content-wrapper {
                    background: rgba(15, 23, 42, 0.9) !important;
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px !important;
                    color: white !important;
                }
                .leaflet-popup-tip {
                    background: rgba(15, 23, 42, 0.9) !important;
                }
            `}</style>
        </section>
    );
};

export default Maps;
