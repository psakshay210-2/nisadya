'use client';

import { motion, PanInfo } from 'framer-motion';
import { useState, useRef } from 'react';
import { Instagram as InstagramIcon } from 'lucide-react';
import Link from 'next/link';

interface InstagramPost {
    postLink: string;
}

const Instagram = ({ initialPosts = [] }: { initialPosts?: InstagramPost[] }) => {
    // Duplicate posts if fewer than 3 to ensure stack always works
    let safePosts = initialPosts;
    if (safePosts.length > 0 && safePosts.length < 3) {
        while (safePosts.length < 3) {
            safePosts = [...safePosts, ...safePosts];
        }
    }

    const posts: InstagramPost[] = safePosts;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [exitX, setExitX] = useState<number | null>(null);

    // Track which posts have ever been within the visible window (offset <= 2).
    // A display:none iframe still loads its src, so on first render only the
    // three visible cards get a real <iframe>. Once a card has been mounted we
    // keep it in this Set so it stays mounted after it rotates out of view,
    // meaning swiping back never reloads the embed.
    const mountedLinks = useRef<Set<string>>(new Set());

    // Fling the front card out by `x` pixels, then advance the stack once the
    // 200ms exit has played. Both directions advance forward by one, which is
    // the behaviour the four inlined copies of this block all had.
    const advance = (x: number) => {
        setExitX(x);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % posts.length);
            setExitX(null);
        }, 200);
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 100) {
            advance(200);
        } else if (info.offset.x < -100) {
            advance(-200);
        }
    };

    // Full class strings only: Tailwind's JIT never sees interpolated fragments.
    const arrowButton = (o: { x: number; label: string; cls: string; iconCls: string; d: string }) => (
        <button onClick={() => advance(o.x)} className={o.cls} aria-label={o.label}>
            <svg className={o.iconCls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={o.d} />
            </svg>
        </button>
    );

    if (posts.length === 0) {
        return (
            <section id="instagram" className="relative py-24 sm:py-32 bg-background overflow-hidden flex justify-center items-center min-h-[600px]">
                <p className="text-muted-foreground">No posts available</p>
            </section>
        );
    }

    return (
        <section id="instagram" className="relative py-24 sm:py-32 bg-background overflow-hidden flex justify-center items-center min-h-[600px]">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-30 pointer-events-none overflow-hidden">
                {/* radial-gradient glows replace filter:blur(120px) orbs (cheaper to paint) */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full mix-blend-screen animate-pulse-slow" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--secondary) 20%, transparent) 0%, transparent 70%)' }} />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full mix-blend-screen animate-pulse-slow [animation-delay:2s]" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 20%, transparent) 0%, transparent 70%)' }} />
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
                <div className="relative w-full max-w-[280px] xs:max-w-[300px] sm:max-w-[340px] md:max-w-[380px] h-[420px] sm:h-[520px] flex items-center justify-center perspective-1000">

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

                        // Mark cards that are (or have been) in the visible window so
                        // their iframe mounts. Non-visited cards render a placeholder
                        // instead, so the page loads exactly 3 iframes up front.
                        if (isVisible) mountedLinks.current.add(post.postLink);
                        const shouldMount = mountedLinks.current.has(post.postLink);

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
                                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
                                    <div className="h-full w-full bg-white/5 relative">
                                        {shouldMount ? (
                                            <>
                                                <iframe
                                                    src={post.postLink.split('?')[0].replace(/\/$/, '') + '/embed/captioned'}
                                                    sandbox="allow-scripts allow-same-origin"
                                                    referrerPolicy="no-referrer"
                                                    className="w-full h-full border-none pointer-events-none"
                                                    scrolling="no"
                                                    loading="lazy"
                                                    title={`Instagram Post`}
                                                />
                                                <div className="absolute inset-0 z-50 bg-transparent" />
                                                <Link
                                                    href={post.postLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 py-2.5 px-6 rounded-full bg-gradient-to-r from-primary/90 to-secondary/90 hover:from-primary hover:to-secondary shadow-lg shadow-black/20 hover:shadow-primary/30 backdrop-blur-sm border border-white/20 text-black font-bold text-sm tracking-wide transition-[box-shadow,transform] flex items-center gap-2 pointer-events-auto hover:scale-105 active:scale-95"
                                                >
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
                                                    </svg>
                                                    View Post
                                                </Link>
                                            </>
                                        ) : (
                                            // Not yet visited: a same-size placeholder keeps the
                                            // stack layout/drag identical without loading an iframe.
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
                                                <InstagramIcon className="w-16 h-16 text-muted-foreground/40" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Controls Text */}
                <div className="mt-8 text-center">
                    <div className="flex items-center justify-center gap-6">
                        {arrowButton({
                            x: -200,
                            label: 'Swipe Left',
                            cls: "p-4 rounded-full bg-secondary/10 hover:bg-secondary/20 border border-border hover:border-primary/50 text-foreground transition-transform duration-300 hover:scale-110 active:scale-90 group",
                            iconCls: "w-6 h-6 group-hover:text-primary transition-colors",
                            d: "M10 19l-7-7m0 0l7-7m-7 7h18",
                        })}

                        <div className="flex flex-col items-center gap-1">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary uppercase tracking-widest">
                                SWIPE
                            </span>
                        </div>

                        {arrowButton({
                            x: 200,
                            label: 'Swipe Right',
                            cls: "p-4 rounded-full bg-secondary/10 hover:bg-secondary/20 border border-border hover:border-secondary/50 text-foreground transition-transform duration-300 hover:scale-110 active:scale-90 group",
                            iconCls: "w-6 h-6 group-hover:text-secondary transition-colors",
                            d: "M14 5l7 7m0 0l-7 7m7-7H3",
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Instagram;
