'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { fetchSheetData, GIDS } from '@/lib/gsheet';
import Image from 'next/image';
import Link from 'next/link';

interface InstagramPost {
    postLink: string;
}

const InstagramCard = ({ post, isActive, isSpread }: { post: InstagramPost, isActive: boolean, isSpread: boolean }) => (
    <Link href={post.postLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
        <div className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-2 transition-all duration-500
            ${isSpread ? 'border-transparent group-hover:border-primary' : (isActive ? 'border-primary' : 'border-transparent')}
            bg-white/5 dark:bg-slate-900/40 backdrop-blur-md
        `}>
            <Image
                src={`https://picsum.photos/seed/insta${post.postLink.slice(-10)}/400/400`}
                alt='Instagram Post'
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full border border-white/20">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.703.01 5.556 0 5.829 0 8s.01 2.444.048 3.297c.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.556 15.99 5.829 16 8 16s2.444-.01 3.297-.048c.852-.04 1.433-.174 1.942-.372.526-.205.972-.478 1.417-.923.445-.444.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.444 16 10.171 16 8s-.01-2.444-.048-3.297c-.04-.852-.174-1.433-.372-1.942a3.916 3.916 0 0 0-.923-1.417A3.916 3.916 0 0 0 13.24.42c-.51-.198-1.09-.333-1.942-.372C10.444.01 10.171 0 8 0zm0 1.44c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.282.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.843.038-1.096.047-3.232.047s-2.389-.009-3.232-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.231s.008-2.389.046-3.232c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.843-.038 1.096-.047 3.232-.047zM8 4.888a3.112 3.112 0 1 0 0 6.224 3.112 3.112 0 0 0 0-6.224zM8 9.555a1.556 1.556 0 1 1 0-3.11 1.556 1.556 0 0 1 0 3.11zm4.556-5.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666z"/>
                </svg>
            </div>
        </div>
    </Link>
);

const Instagram = () => {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        const loadPosts = async () => {
            const data = await fetchSheetData(GIDS.INSTAGRAM, (headers, row) => {
                const post: InstagramPost = {
                    postLink: row[headers.indexOf('link')] || '',
                };
                if (!post.postLink) return null;
                return post;
            });
            setPosts(data as InstagramPost[]);
            setLoading(false);
        };
        loadPosts();
    }, []);

    const nextCard = () => setActiveIndex((prev) => (prev + 1) % posts.length);
    const prevCard = () => setActiveIndex((prev) => (prev - 1 + posts.length) % posts.length);

    if (loading) {
        return (
            <section id="instagram" className="relative py-24 sm:py-32 bg-background overflow-hidden">
                <div className="container-custom px-4 text-center">
                    <div className="flex justify-center items-center py-20">
                        <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section id="instagram" className="relative py-24 sm:py-32 bg-background overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/3" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] translate-y-1/2 translate-x-1/3" />
            </div>

            <div className="container-custom relative z-10 px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-secondary text-sm font-semibold tracking-wider uppercase mb-4">
                        Follow Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground tracking-tight">
                        On The <span className="gradient-text">Gram</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Catch the latest moments and behind-the-scenes action from Nisadya.
                    </p>
                </motion.div>

                {/* Card Stack */}
                <div className="relative h-[600px] max-w-sm mx-auto md:max-w-4xl">
                    {/* Desktop: Spread Layout */}
                    <div className="hidden md:block">
                        {posts.map((post, index) => {
                            const isSpread = index < 4;
                            const isStacked = index >= 4;
                            const pos = index - activeIndex;

                            return (
                                <motion.div
                                    key={post.postLink}
                                    className="absolute w-72 h-[448px] group"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                        x: isSpread ? (index - 1.5) * 240 : 2.5 * 240,
                                        y: isStacked ? (index - 4) * 12 : 0,
                                        rotate: isSpread ? (index - 1.5) * 8 : 12,
                                        zIndex: isStacked ? -index : (posts.length - Math.abs(pos)),
                                    }}
                                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                                    whileHover={ isSpread ? {
                                        y: -20,
                                        rotate: (index - 1.5) * 4,
                                        scale: 1.05,
                                        zIndex: 99
                                    } : {}}
                                >
                                    <InstagramCard post={post} isActive={false} isSpread={true} />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Mobile: Flipper Layout */}
                    <div className="md:hidden relative w-full h-full">
                        {posts.map((post, index) => {
                            const offset = index - activeIndex;
                            if (Math.abs(offset) > 1) return null; // Render only current, next, and prev

                            return (
                                <motion.div
                                    key={post.postLink}
                                    className="absolute w-full h-full"
                                    initial={{ x: `${offset * 100}%`, scale: offset === 0 ? 1 : 0.8 }}
                                    animate={{
                                        x: `${offset * 100}%`,
                                        scale: offset === 0 ? 1 : 0.8,
                                        zIndex: posts.length - Math.abs(offset)
                                    }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                >
                                    <InstagramCard post={post} isActive={offset === 0} isSpread={false} />
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex justify-center items-center gap-4 mt-8">
                    <button onClick={prevCard} className="w-14 h-14 rounded-full glass flex items-center justify-center text-2xl active:scale-95">‹</button>
                    <div className="text-sm font-semibold text-muted-foreground">
                        {activeIndex + 1} / {posts.length}
                    </div>
                    <button onClick={nextCard} className="w-14 h-14 rounded-full glass flex items-center justify-center text-2xl active:scale-95">›</button>
                </div>
            </div>
        </section>
    );
};
export default Instagram;
