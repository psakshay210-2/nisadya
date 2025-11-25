'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink, Loader2, Camera, RefreshCw } from 'lucide-react';

const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTsFJbgfDgI-OTKglkjmEnXAV_HisTESw51KXJGhKzrYFJaIAFJ75a6CTkD6zdPveUYPugJuifL0C5r/pub?output=csv"; 

const InstagramCard = ({ url }: { url: string }) => {
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
    <div className="flex flex-col h-[550px] bg-card/50 backdrop-blur-sm rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-300 relative">
      
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 z-10">
          <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
          <span className="text-xs text-muted-foreground">Loading Post...</span>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 p-6 text-center z-20">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
            <Camera className="text-muted-foreground" size={24} />
          </div>
          <p className="font-medium text-foreground mb-1">Post Unavailable</p>
          <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View on Instagram <ExternalLink size={12} />
          </a>
        </div>
      )}

      <iframe 
        src={embedUrl} 
        className={`w-full h-full border-0 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        scrolling="no" 
        allowtransparency="true"
        allow="encrypted-media"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        title="Instagram Post"
      />
      
      <div className="absolute bottom-0 w-full bg-card/90 backdrop-blur-sm border-t py-3 px-4 flex justify-between items-center text-xs text-muted-foreground">
        <span>Instagram Post</span>
        <a href={url} target="_blank" rel="noreferrer" className="hover:text-primary flex items-center gap-1 font-medium">
          Open App <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
};


export function InstagramFeed() {
  const [links, setLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const parseCSV = (text: string) => {
    return text.split('\n')
      .map(row => row.trim())
      .map(row => row.replace(/^"|"$/g, ''))
      .filter(row => row.includes('instagram.com/p/') || row.includes('instagram.com/reel/'))
      .filter((val, id, array) => array.indexOf(val) === id); 
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (GOOGLE_SHEET_CSV_URL && GOOGLE_SHEET_CSV_URL.startsWith('http')) {
        let csvText = null;
        try {
          const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(GOOGLE_SHEET_CSV_URL)}`;
          const response = await fetch(proxyUrl);
          if (response.ok) csvText = await response.text();
        } catch (e) {
          console.warn("Proxy 1 failed, trying Proxy 2");
        }

        if (!csvText) {
          try {
            const proxyUrl2 = `https://api.allorigins.win/raw?url=${encodeURIComponent(GOOGLE_SHEET_CSV_URL)}`;
            const response = await fetch(proxyUrl2);
            if (response.ok) csvText = await response.text();
          } catch(e) {
            console.warn("Proxy 2 failed");
          }
        }

        if (csvText) {
          const parsedLinks = parseCSV(csvText);
          if (parsedLinks.length > 0) {
            setLinks(parsedLinks);
          } else {
             setError("Connected to Sheet, but found no valid links.");
             setLinks([]);
          }
        } else {
          throw new Error("Could not fetch data from Google Sheet.");
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Could not load your Sheet.");
      setLinks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="instagram" className="py-16 md:py-24 border-y">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
            <div>
                <h2 className="font-headline text-4xl font-bold md:text-5xl">
                    On the Gram
                </h2>
                <p className="mt-2 text-lg text-muted-foreground">
                    Follow our journey and catch the latest updates.
                </p>
            </div>
            <button 
              onClick={fetchData} 
              className="p-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-full transition-all"
              title="Refresh Data"
            >
              <RefreshCw size={24} className={loading ? "animate-spin" : ""} />
            </button>
        </div>
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground font-medium">Fetching latest posts...</p>
          </div>
        )}

        {!loading && (
            <>
                {error && <p className="text-center text-red-500 mb-4">{error}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {links.map((link, index) => (
                    <InstagramCard key={`${link}-${index}`} url={link} />
                    ))}
                </div>
            </>
        )}

        {!loading && links.length === 0 && (
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
