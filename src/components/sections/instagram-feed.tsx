
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

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
    <div
      className={cn(
        "relative h-[480px] xs:h-[500px] w-full max-w-sm rounded-2xl overflow-hidden bg-black/20"
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
  );
};


export function InstagramFeed() {
  const [links, setLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        setLinks(parsedLinks.length > 0 ? parsedLinks : []);
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
    if (isMounted) {
      fetchData();
    }
  }, [isMounted, fetchData]);



  if (!isMounted) {
    return null;
  }

  return (
    <section id="instagram" className="relative py-20 xs:py-24 sm:py-32 border-t border-white/10 overflow-hidden flex items-center justify-center">
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

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <Loader2 className="relative w-10 h-10 text-primary animate-spin" />
            </div>
            <p className="text-sm text-gray-400 font-medium tracking-wide animate-pulse">Fetching latest moments...</p>
          </div>
        )}

        {!loading && error && (
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

        {!loading && !error && links.length > 0 && (
          <div className="w-full overflow-hidden mask-gradient-x py-10">
            {/* 
                We create two sets of the links to create the seamless infinite scroll.
                If links are few, we multiply them to fill width.
             */}
            <div className="flex gap-6 animate-scroll hover:paused w-max px-4">
              {[...links, ...links, ...links].map((link, index) => (
                <div
                  key={`${link}-${index}`}
                  className="flex-shrink-0 w-[300px] sm:w-[350px]"
                >
                  <div className="relative transition-all duration-500 ease-out transform-gpu scale-95 opacity-80 hover:opacity-100 hover:scale-100 grayscale-[0.2] hover:grayscale-0">
                    <div className="group relative overflow-hidden rounded-3xl bg-gray-900/40 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 hover:ring-1 hover:ring-white/10 hover:shadow-primary/10">
                      {/* Glass Glare Effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />

                      <div className="p-2 sm:p-3">
                        <InstagramCard url={link} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && links.length === 0 && (
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
