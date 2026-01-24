'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Stay = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const accommodations = [
        {
            type: 'College Hostel',
            price: '₹500',
            period: '/night',
            features: ['Basic amenities', 'Shared rooms', 'Meals included', 'Secure campus'],
            icon: '🏫',
            color: 'from-primary to-primary-dark',
            recommended: true,
        },
        {
            type: 'Budget Hotels',
            price: '₹1,500',
            period: '/night',
            features: ['AC rooms', 'WiFi', 'Breakfast', '2km from campus'],
            icon: '🏨',
            color: 'from-secondary to-secondary-dark',
            recommended: false,
        },
        {
            type: 'Premium Hotels',
            price: '₹3,500+',
            period: '/night',
            features: ['Luxury stay', 'Restaurant', 'Swimming pool', '3km from campus'],
            icon: '🏰',
            color: 'from-accent to-primary',
            recommended: false,
        },
    ];

    return (
        <section id="stay" className="relative section-padding bg-background overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent opacity-50 dark:opacity-20" />
                <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-secondary/5 to-transparent opacity-50 dark:opacity-20" />
            </div>

            <div className="container-custom relative z-10 px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase mb-4">
                        Accommodation
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                        Stay <span className="gradient-text">Comfortably</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We've curated the best stay options for you to ensure a comfortable experience during the fest.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {accommodations.map((place, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.2 }}
                            className={`
                                relative overflow-hidden rounded-3xl p-8 border transition-all duration-300 group
                                ${place.recommended
                                    ? 'bg-primary/5 border-primary/50 shadow-2xl dark:shadow-primary/20 scale-105 z-10'
                                    : 'bg-card border-border hover:border-primary/30 hover:shadow-xl'}
                            `}
                        >
                            {place.recommended && (
                                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                                    Recommended
                                </div>
                            )}

                            {/* Icon */}
                            <div className={`
                                w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-3xl shadow-lg
                                bg-gradient-to-br ${place.color} text-white
                            `}>
                                {place.icon}
                            </div>

                            {/* Type & Price */}
                            <h3 className="text-2xl font-bold mb-2">{place.type}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-black text-primary">{place.price}</span>
                                <span className="text-muted-foreground font-medium">{place.period}</span>
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-8">
                                {place.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center text-xs">✓</div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Book Button */}
                            <button className={`
                                w-full py-4 rounded-xl font-bold transition-all duration-300
                                ${place.recommended
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1'
                                    : 'bg-secondary/10 text-secondary hover:bg-secondary hover:text-white'}
                            `}>
                                Book Now
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-white/10 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

                    <h3 className="text-3xl font-bold mb-4">
                        Need Help Finding Accommodation?
                    </h3>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Our accommodation desk is available 24/7 to help you find the perfect stay. Contact us for personalized recommendations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="mailto:stay@nisadya.com" className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-bold transition-colors">
                            <span>📧</span> stay@nisadya.com
                        </a>
                        <a href="tel:+911234567890" className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/10 hover:bg-secondary/20 text-secondary font-bold transition-colors">
                            <span>📞</span> +91 100 200 3000
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Stay;
