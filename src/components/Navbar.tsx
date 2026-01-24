'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Events', href: '#events' },
        { name: 'Schedule', href: '#schedule' },
        { name: 'Sponsors', href: '#sponsors' },
        { name: 'Stay', href: '#stay' },
        { name: 'Location', href: '#location' },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'glass'
                : 'bg-transparent'
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-20 px-4">
                    {/* Logo */}
                    <Link href="#home" onClick={(e) => scrollToSection(e, '#home')}>
                        <div className="relative w-32 h-12 md:w-40 md:h-14">
                            <Image
                                src="/fest_main_logo.png"
                                alt="Nisadya Logo"
                                fill
                                className="object-contain invert dark:invert-0 transition-all duration-300"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="font-medium transition-colors duration-300 hover:text-primary text-foreground"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <ThemeToggle />
                        <button className="btn-primary">
                            Register Now
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span
                                className={`block h-0.5 w-full transition-all duration-300 bg-foreground ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
                            />
                            <span
                                className={`block h-0.5 w-full transition-all duration-300 bg-foreground ${isMobileMenuOpen ? 'opacity-0' : ''}`}
                            />
                            <span
                                className={`block h-0.5 w-full transition-all duration-300 bg-foreground ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass"
                    >
                        <div className="px-4 py-6 space-y-4 flex flex-col items-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className="block py-2 text-foreground hover:text-primary font-medium transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="py-2">
                                <ThemeToggle />
                            </div>
                            <button className="btn-primary w-full">
                                Register Now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
