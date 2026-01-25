'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Maps = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="location" className="relative section-padding bg-background overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
            </div>

            <div className="container-custom relative z-10 px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-secondary text-sm font-semibold tracking-wider uppercase mb-4">
                        Navigate
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                        Find <span className="gradient-text">Us</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Located at the heart of the city with easy access from all directions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Map Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 group h-[500px]"
                    >
                        {/* Placeholder Map - using a dark themed map image would be ideal, but falling back to style */}
                        <div className="absolute inset-0 bg-slate-900 bg-[url('https://picsum.photos/seed/map/800/600')] bg-cover bg-center grayscale opacity-50 group-hover:grayscale-0 transition-all duration-500"></div>

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="relative">
                                <span className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full animate-ping opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-8 w-8 bg-primary border-4 border-white shadow-xl items-center justify-center text-xl">📍</span>
                            </div>
                        </div>

                        {/* Directions Overlay */}
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="glass p-6 rounded-2xl flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-lg mb-1">College Campus</h4>
                                    <p className="text-sm text-muted-foreground">Main Gate, Sector 4</p>
                                </div>
                                <button className="btn-primary px-6 py-2 text-sm">
                                    Get Directions
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Location Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 }}
                        className="space-y-6"
                    >
                        {/* Address */}
                        <div className="glass rounded-3xl p-8 border border-white/20 dark:border-white/5 hover:bg-white/5 transition-colors duration-300">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">🏛️</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3">Address</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        National Institute of Technology,<br />
                                        Tanjore Main Road, National Highway 83,<br />
                                        Tiruchirappalli - 620015,<br />
                                        Tamil Nadu, India.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Transport Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                            <div className="glass rounded-3xl p-6 border border-white/20 dark:border-white/5 hover:-translate-y-1 transition-transform duration-300">
                                <div className="text-3xl mb-4">✈️</div>
                                <h3 className="font-bold mb-2">Airport (TRZ)</h3>
                                <p className="text-sm text-muted-foreground">~25km away. Taxi/Cab services readily available to reach the campus.</p>
                            </div>
                            <div className="glass rounded-3xl p-6 border border-white/20 dark:border-white/5 hover:-translate-y-1 transition-transform duration-300">
                                <div className="text-3xl mb-4">🚂</div>
                                <h3 className="font-bold mb-2">Railway Station</h3>
                                <p className="text-sm text-muted-foreground">TPJ Junction (~22km). Direct buses to Thuvakudi stop at NIT Main Gate.</p>
                            </div>
                            <div className="glass rounded-3xl p-6 border border-white/20 dark:border-white/5 hover:-translate-y-1 transition-transform duration-300 sm:col-span-2">
                                <div className="text-3xl mb-4">🚌</div>
                                <h3 className="font-bold mb-2">Bus Terminals</h3>
                                <p className="text-sm text-muted-foreground">
                                    <strong>Central Bus Stand:</strong> ~22km | <strong>Chatram Bus Stand:</strong> ~18km<br />
                                    Frequent town buses (Route #128, #100 series) towards Thuvakudi/BHEL connect both terminals to NIT.
                                </p>
                            </div>
                        </div>


                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Maps;
