'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timeline } from "./timeline"
import { Sponsors } from "./sponsors"
import { Calendar, Building2, Ticket } from "lucide-react"
import { Events } from "./events"
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const tabs = ["events", "schedule", "sponsors"];

export function HeroTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isCycling, setIsCycling] = useState(true);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the component is intersecting the viewport, start cycling.
        // Otherwise, stop cycling.
        if (entry.isIntersecting) {
          setIsCycling(true);
        } else {
          setIsCycling(false);
        }
      },
      {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1, // trigger when 10% of the element is visible
      }
    );

    const currentRef = tabsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isCycling) return;

    const interval = setInterval(() => {
      const currentIndex = tabs.indexOf(activeTab);
      let nextIndex;

      if (direction === 'forward') {
        if (currentIndex === tabs.length - 1) {
          setDirection('backward');
          nextIndex = currentIndex - 1;
        } else {
          nextIndex = currentIndex + 1;
        }
      } else { // backward
        if (currentIndex === 0) {
          setDirection('forward');
          nextIndex = currentIndex + 1;
        } else {
          nextIndex = currentIndex - 1;
        }
      }
      setActiveTab(tabs[nextIndex]);
    }, 3000); // Change tab every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isCycling, activeTab, direction]);

  const handleTabChange = (value: string) => {
    setIsCycling(false); // Stop cycling on manual interaction
    setActiveTab(value);
  }

  const tabContentBaseClasses = "absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out";

  return (
    <div className="flex flex-col w-full h-full" ref={tabsRef}>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-col h-full">
        <TabsList className="shrink-0 w-full max-w-md mx-auto grid grid-cols-3 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="events" className="gap-2">
            <Ticket className="h-5 w-5"/>
            <span>Events</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2">
            <Calendar className="h-5 w-5"/>
            <span>Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="sponsors" className="gap-2">
            <Building2 className="h-5 w-5"/>
            <span>Sponsors</span>
          </TabsTrigger>
        </TabsList>
        <div className="relative mt-4 h-[500px] overflow-hidden rounded-lg bg-card/50 backdrop-blur-sm">
          <TabsContent value="events" forceMount className={cn(tabContentBaseClasses, activeTab === 'events' ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
            <div className="h-full flex items-center p-4">
              <Events condensed />
            </div>
          </TabsContent>
          <TabsContent value="schedule" forceMount className={cn(tabContentBaseClasses, activeTab === 'schedule' ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
            <div className="h-full flex items-center p-4">
              <Timeline condensed />
            </div>
          </TabsContent>
          <TabsContent value="sponsors" forceMount className={cn(tabContentBaseClasses, activeTab === 'sponsors' ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
            <div className="h-full flex items-center p-4">
              <Sponsors condensed />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
