'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Loader2, RefreshCw, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTsFJbgfDgI-OTKglkjmEnXAV_HisTESw51KXJGhKzrYFJaIAFJ75a6CTkD6zdPveUYPugJuifL0C5r/pub?output=csv";

const InstagramCard = ({ url }: { url: string; }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getEmbedUrl = (rawUrl: string) => {
    try {
      const urlObj = new URL(rawUrl);
      let path = urlObj.pathname;
      if (!path.endsWith('/')) path += '/';
      return `${urlObj.origin}${path}embed/captioned/`;
    } catch (e) {
      console.error("Invalid URL:", rawUrl);
      return '';
    }
  };

  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) return null;

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gray-900/40 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 hover:ring-1 hover:ring-white/10 hover:shadow-primary/10">
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
      <div className="p-2 sm:p-3">
        <div
          className={cn(
            "relative h-[480px] xs:h-[500px] w-full rounded-2xl overflow-hidden bg-black/20"
          )}
        >
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900/90 p-6 text-center">
              <Camera className="h-8 w-8 text-gray-500 mb-2" />
              <p className="text-sm text-gray-400">Unavailable</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-xs text-primary hover:underline"
              >
                Visit Link
              </a>
            </div>
          )}

          <iframe
            src={embedUrl}
            className={`h-full w-full border-0 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            scrolling="no"
            allow="encrypted-media"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            title="Instagram Post"
          />
        </div>
      </div>
    </div>
  );
};


export function InstagramFeed() {
  const [links, setLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const parseCSV = (text: string) => {
    return text.split('\n')
      .map(row => row.trim())
      .map(row => row.replace(/^"|"$/g, ''))
      .filter(row => row.includes('instagram.com/p/') || row.includes('instagram.com/reel/'))
      .filter((val, id, array) => array.indexOf(val) === id);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const cacheBustingUrl = `${GOOGLE_SHEET_CSV_URL}&_=${new Date().getTime()}`;
      const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(cacheBustingUrl)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error(`Failed to fetch. Status: ${response.status}`);
      const csvText = await response.text();
      if (csvText) {
        const parsedLinks = parseCSV(csvText);
        setLinks(parsedLinks.length > 0 ? parsedLinks.slice(0, 6) : []);
        if (parsedLinks.length === 0) setError("No valid Instagram links found in the sheet.");
      } else {
        throw new Error("Could not fetch data from Google Sheet.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while fetching posts.");
      setLinks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const goNext = () => {
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  const goPrev = () => {
    setActiveIndex((prevIndex) => prevIndex - 1);
  };

  const displayLinks = links;
  const canGoNext = activeIndex < displayLinks.length - 1;
  const canGoPrev = activeIndex > 0;


  if (loading) {
    return (
      <section id="instagram" className="relative py-20 xs:py-24 sm:py-32 border-t border-white/10 overflow-hidden">
        <div className="container relative z-10 text-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 group hover:bg-white/10 transition-colors cursor-default">
              <Camera className="w-4 h-4 text-primary mr-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-primary/80 tracking-wider uppercase">Social Updates</span>
            </div>

            <h2 className="font-headline text-fluid-4xl font-bold text-white tracking-tight">
              On the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Gram</span>
            </h2>
            <p className="mx-auto max-w-2xl text-fluid-base text-gray-400 font-light leading-relaxed">
              Follow our journey and catch the latest updates from the heart of the action.
            </p>
            <div className="relative w-full min-h-[550px] md:min-h-[600px] flex items-center justify-center mt-12">
              <Skeleton className="w-[300px] sm:w-[350px] h-[500px] sm:h-[520px] rounded-3xl" />
            </div>
        </div>
      </section>
    );
  }

  return (
    <section id="instagram" className="relative py-20 xs:py-24 sm:py-32 border-t border-white/10 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none opacity-30" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />

      <div className="container relative z-10">
        <div className="mb-12 xs:mb-16 sm:mb-20 text-center space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 group hover:bg-white/10 transition-colors cursor-default">
            <Camera className="w-4 h-4 text-primary mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium text-primary/80 tracking-wider uppercase">Social Updates</span>
          </div>

          <h2 className="font-headline text-fluid-4xl font-bold text-white tracking-tight">
            On the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Gram</span>
          </h2>
          <p className="mx-auto max-w-2xl text-fluid-base text-gray-400 font-light leading-relaxed">
            Follow our journey and catch the latest updates from the heart of the action.
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto text-center p-8 bg-red-500/10 border border-red-500/20 rounded-3xl backdrop-blur-sm">
            <Camera className="mx-auto h-12 w-12 text-red-400 mb-4 opacity-80" />
            <p className="text-lg font-medium text-red-200 mb-2">Feed Unavailable</p>
            <p className="text-sm text-red-200/60 mb-6 px-4">{error}</p>
            <Button onClick={fetchData} variant="outline" className="bg-red-500/10 border-red-500/20 text-red-200 hover:bg-red-500/20 hover:text-white transition-all duration-300">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}

        {!error && links.length > 0 && (
          <>
            <div className="relative w-full min-h-[550px] md:min-h-[600px] flex items-center justify-center">
              {/* Mobile View: Stacked Deck */}
              <div className="md:hidden w-full h-full relative">
                {displayLinks.map((link, index) => {
                  const offset = index - activeIndex;
                  const isVisible = Math.abs(offset) <= 2;

                  if (!isVisible) return null;

                  let style: React.CSSProperties = {
                    transform: `translateY(${offset * 10}px) scale(${1 - Math.abs(offset) * 0.1})`,
                    zIndex: displayLinks.length - Math.abs(offset),
                    opacity: offset === 0 ? 1 : 0.5,
                    pointerEvents: offset === 0 ? 'auto' : 'none',
                    transition: 'all 0.4s ease-out',
                  };
                  
                  if (offset < 0) {
                      style.transform = `translateX(-120%) scale(0.8) rotate(-15deg)`;
                      style.opacity = 0;
                  }
                  
                  return (
                      <div key={`${link}-${index}`} className="absolute inset-0 flex items-center justify-center" style={style}>
                          <div className="w-[300px] sm:w-[350px]">
                            <InstagramCard url={link} />
                          </div>
                      </div>
                  );
                })}
              </div>

              {/* Desktop View: Spread */}
              <div className="hidden md:flex relative w-full h-full items-center justify-center">
                {displayLinks.map((link, index) => {
                  const desktopTransforms = [
                    { transform: 'translateX(-40%) rotate(-8deg)', zIndex: 1 },
                    { transform: 'translateX(-13%) rotate(-4deg)', zIndex: 2 },
                    { transform: 'translateX(13%) rotate(4deg)', zIndex: 3 },
                    { transform: 'translateX(40%) rotate(8deg)', zIndex: 4 },
                  ];

                  let style: React.CSSProperties = {};
                  if (index < 4) {
                    style = desktopTransforms[index];
                  } else {
                    style = {
                      ...desktopTransforms[3],
                      transform: `${desktopTransforms[3].transform} translateY(${(index - 3) * 12}px)`,
                      zIndex: 4 - (index - 3),
                    };
                  }

                  return (
                    <div 
                      key={`${link}-${index}`} 
                      className="absolute w-[350px] transition-all duration-300 ease-out hover:!z-10 hover:-translate-y-4 hover:scale-105"
                      style={style}
                    >
                      <InstagramCard url={link} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center justify-center gap-4 mt-8">
              <Button onClick={goPrev} disabled={!canGoPrev} variant="outline" size="icon" className="disabled:opacity-30 rounded-full h-12 w-12 bg-black/30 backdrop-blur-sm border-white/20">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button onClick={goNext} disabled={!canGoNext} variant="outline" size="icon" className="disabled:opacity-30 rounded-full h-12 w-12 bg-black/30 backdrop-blur-sm border-white/20">
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </>
        )}

        {!error && links.length === 0 && !loading && (
          <div className="max-w-md mx-auto text-center p-12 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
            <Camera className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <p className="text-lg font-medium text-white mb-2">No posts found</p>
            <p className="text-sm text-gray-500">Check back later for updates.</p>
          </div>
        )}
      </div>
    </section>
  );
}
