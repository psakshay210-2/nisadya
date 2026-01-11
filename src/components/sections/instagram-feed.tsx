
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, Loader2, Camera, RefreshCw } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '../ui/carousel';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTsFJbgfDgI-OTKglkjmEnXAV_HisTESw51KXJGhKzrYFJaIAFJ75a6CTkD6zdPveUYPugJuifL0C5r/pub?output=csv";

const InstagramCard = ({ url, isActive }: { url: string; isActive: boolean }) => {
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
        "relative h-[550px] w-full max-w-sm transform-gpu overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm transition-all duration-500 ease-in-out",
        isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-50 blur-[2px]'
      )}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card/80">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card/80 p-6 text-center">
          <Camera className="h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Post Unavailable</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-xs text-primary hover:underline"
          >
            View on Instagram
          </a>
        </div>
      )}

      <iframe
        src={embedUrl}
        className={`h-full w-full border-0 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} brightness-95 contrast-125`}
        scrolling="no"
        allowTransparency={true}
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
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

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

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
        setCurrent(api.selectedScrollSnap());
    };
    
    handleSelect();
    api.on('select', handleSelect);

    return () => {
      api.off('select', handleSelect);
    };
  }, [api]);

  if (!isMounted) {
    return null;
  }

  return (
    <section id="instagram" className="py-16 md:py-24 border-y">
      <div className="container">
        <div className="mb-12 text-center">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">
              On the Gram
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
              Follow our journey and catch the latest updates.
            </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground font-medium">Fetching latest posts...</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-xl">
            <Camera className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium text-foreground">Could not load posts</p>
            <p className="text-sm max-w-sm mx-auto">{error}</p>
            <Button onClick={fetchData} variant="ghost" className="mt-4">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}
        
        {!loading && !error && links.length > 0 && (
          <Carousel setApi={setApi} opts={{ align: 'center', loop: true }}>
            <CarouselContent className="-ml-4">
              {links.map((link, index) => (
                <CarouselItem key={`${link}-${index}`} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <InstagramCard url={link} isActive={index === current} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}

        {!loading && !error && links.length === 0 && (
          <div className="text-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-xl">
            <Camera className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium text-foreground">No posts found</p>
            <p className="text-sm">Check the Google Sheet or try refreshing.</p>
          </div>
        )}

      </div>
    </section>
  );
}
