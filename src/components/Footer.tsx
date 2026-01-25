'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Events', href: '#events' },
        { name: 'Schedule', href: '#schedule' },
    ];

    const socialLinks = [
        { name: 'Instagram', icon: '📷', href: '#' },
        { name: 'Twitter', icon: '🐦', href: '#' },
        { name: 'LinkedIn', icon: '💼', href: '#' },
        { name: 'YouTube', icon: '▶️', href: '#' },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <footer className="relative bg-slate-900 text-white overflow-hidden pt-20 pb-10">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />
            </div>

            <div className="container-custom px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="#home" className="block relative w-48 h-16">
                            <Image
                                src="/fest_main_logo.png"
                                alt="Nisadya Logo"
                                fill
                                className="object-contain object-left brightness-0 invert"
                            />
                        </Link>
                        <p className="text-slate-400 max-w-md leading-relaxed text-lg">
                            Nisadya is the annual cultural and technical fest that celebrates talent, creativity, and innovation. Join us for an unforgettable experience!
                        </p>
                        <div className="flex gap-4 pt-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="w-12 h-12 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-full flex items-center justify-center text-xl transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-white inline-block border-b-2 border-primary pb-1">Quick Links</h3>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className="text-slate-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-flex items-center gap-2 group"
                                    >
                                        <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-white inline-block border-b-2 border-primary pb-1">Contact Us</h3>
                        <ul className="space-y-6 text-slate-400">
                            <li className="flex items-start gap-4">
                                <span className="text-2xl mt-1">📍</span>
                                <span>
                                    University Campus,<br />
                                    Tech City, India - 560000
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="text-2xl">📧</span>
                                <a href="mailto:fest@nisadya.com" className="hover:text-primary transition-colors">
                                    fest@nisadya.com
                                </a>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="text-2xl">📞</span>
                                <a href="tel:+911234567890" className="hover:text-primary transition-colors">
                                    +91 123 456 7890
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
                    <p>
                        © {new Date().getFullYear()} Nisadya. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
