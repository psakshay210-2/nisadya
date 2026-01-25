'use client';

import { motion, useMotionValue, useTransform, useAnimation, PanInfo, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { fetchSheetData, GIDS } from '@/lib/gsheet';
import Link from 'next/link';

interface InstagramPost {
    postLink: string;
}

const Instagram = () => {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [exitX, setExitX] = useState<number | null>(null);

    useEffect(() => {
        const loadPosts = async () => {
            const data = await fetchSheetData(GIDS.INSTAGRAM, (headers, row) => {
                const post: InstagramPost = {
                    postLink: row[headers.indexOf('link')] || '',
                };
                if (!post.postLink) return null;
                return post;
            });
            // Duplicate posts if fewer than 3 to ensure stack always works
            let safePosts = data as InstagramPost[];
            if (safePosts.length > 0 && safePosts.length < 3) {
                while (safePosts.length < 3) {
                    safePosts = [...safePosts, ...safePosts];
                }
            }
            setPosts(safePosts);
            setLoading(false);
        };
        loadPosts();
    }, []);

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 100) {
            setExitX(200);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % posts.length);
                setExitX(null);
            }, 200);
        } else if (info.offset.x < -100) {
            setExitX(-200);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % posts.length);
                setExitX(null);
            }, 200);
        }
    };

    if (loading) {
        return (
            <section id="instagram" className="relative py-24 sm:py-32 bg-background overflow-hidden flex justify-center items-center min-h-[600px]">
                <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
            </section>
        );
    }

    return (
        <section id="instagram" className="relative py-24 sm:py-32 bg-background overflow-hidden min-h-[800px] flex flex-col items-center">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-30 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow [animation-delay:2s]" />
            </div>

            <div className="container-custom relative z-10 px-4 w-full flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-12 sm:mb-20 space-y-4">
                    <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold tracking-wider uppercase backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        Swipe to Explore
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tight">
                        On The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600">Gram</span>
                    </h2>
                    <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto font-medium">
                        Swipe left or right to discover our latest moments.
                    </p>
                </div>

                {/* 3D Card Stack Container */}
                <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] md:max-w-[420px] h-[550px] sm:h-[600px] flex items-center justify-center perspective-1000">

                    {/* Render ALL posts, but visually hide the ones far back. 
                        Using stable keys (post.postLink) ensures iframes don't reload when index changes. */}
                    {posts.map((post, i) => {
                        // Calculate circular distance
                        const length = posts.length;
                        // Distance from current index (0 to length-1)
                        // If currentIndex is 0, i=0 is offset 0.
                        // If currentIndex is 1, i=0 is offset -1 -> wrap to length-1 (Back of stack / Exit position)

                        // We want: 
                        // i === currentIndex => offset 0 (Front)
                        // i === currentIndex + 1 => offset 1 (Back Left)
                        // i === currentIndex + 2 => offset 2 (Back Right)

                        let offset = (i - currentIndex) % length;
                        if (offset < 0) offset += length;

                        const isFront = offset === 0;
                        const isVisible = offset < 3; // Show 0, 1, 2. Hide 3, 4, etc.

                        return (
                            <motion.div
                                key={post.postLink}
                                className="absolute w-full h-full cursor-grab active:cursor-grabbing"
                                style={{
                                    // Visual Layering
                                    zIndex: isFront ? 10 : (isVisible ? 10 - offset : 0),
                                    display: offset > 2 ? 'none' : 'block', // Hide non-visible cards to save GPU, but keep DOM
                                }}
                                initial={false}
                                animate={{
                                    // Scale: 1 -> 0.95 -> 0.9
                                    scale: isFront ? 1 : 1 - (offset * 0.05),

                                    // Vertical stack effect
                                    y: isFront ? 0 : offset * -15,

                                    // Fanning (Left / Right)
                                    x: isFront ? (exitX || 0) : (offset === 1 ? -20 : offset === 2 ? 20 : 0),

                                    // Rotation
                                    rotate: isFront ? (exitX ? (exitX / 10) : 0) : (offset === 1 ? -5 : offset === 2 ? 5 : 0),

                                    // Opacity
                                    opacity: isFront ? 1 : 1 - (offset * 0.1),
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 180, // Smooth spring
                                    damping: 25
                                }}
                                drag={isFront ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.6}
                                onDragEnd={isFront ? handleDragEnd : undefined}
                                whileDrag={{ scale: 1.05 }}
                            >
                                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
                                    <div className="h-full w-full bg-white/5 relative">
                                        <iframe
                                            src={post.postLink.split('?')[0].replace(/\/$/, '') + '/embed/captioned'}
                                            className="w-full h-full border-none pointer-events-none"
                                            scrolling="no"
                                            title={`Instagram Post`}
                                        />
                                        <div className="absolute inset-0 z-50 bg-transparent" />
                                        <Link
                                            href={post.postLink}
                                            target="_blank"
                                            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 py-2 px-6 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium text-sm transition-all flex items-center gap-2 pointer-events-auto hover:scale-105 active:scale-95"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.688-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                            View Post
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Controls Text */}
                <div className="mt-8 text-center">
                    <div className="flex items-center justify-center gap-6">
                        <button
                            onClick={() => {
                                setExitX(-200);
                                setTimeout(() => {
                                    setCurrentIndex((prev) => (prev + 1) % posts.length);
                                    setExitX(null);
                                }, 200);
                            }}
                            className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-white transition-all hover:scale-110 active:scale-90 group"
                            aria-label="Swipe Left"
                        >
                            <svg className="w-6 h-6 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>

                        <div className="flex flex-col items-center gap-1">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary uppercase tracking-widest">
                                SWIPE
                            </span>
                        </div>

                        <button
                            onClick={() => {
                                setExitX(200);
                                setTimeout(() => {
                                    setCurrentIndex((prev) => (prev + 1) % posts.length);
                                    setExitX(null);
                                }, 200);
                            }}
                            className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary/50 text-white transition-all hover:scale-110 active:scale-90 group"
                            aria-label="Swipe Right"
                        >
                            <svg className="w-6 h-6 group-hover:text-secondary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Instagram;
