
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timeline } from "./timeline"
import { Calendar, Ticket, Heart } from "lucide-react"
import { Events } from "./events"
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { type CarouselApi } from "../ui/carousel";
import { Progress } from "../ui/progress";
import { Sponsors } from "./sponsors";

const tabs = ["events", "schedule", "sponsors"];

export function HeroTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isCycling, setIsCycling] = useState(true);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [eventsApi, setEventsApi] = useState<CarouselApi>();
  const [scheduleApi, setScheduleApi] = useState<CarouselApi>();
  const [sponsorsApi, setSponsorsApi] = useState<CarouselApi>();
  const [progress, setProgress] = useState(0);

  const activeApi = {
    events: eventsApi,
    schedule: scheduleApi,
    sponsors: sponsorsApi,
  }[activeTab];

  useEffect(() => {
    if (!activeApi) {
      return
    }
    const handleSelect = () => {
      setProgress(activeApi.scrollProgress() * 100);
    }
    handleSelect();
    activeApi.on("select", handleSelect)
    activeApi.on("reInit", handleSelect)
    return () => {
      activeApi.off("select", handleSelect)
      activeApi.off("reInit", handleSelect)
    }
  }, [activeApi, activeTab])

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCycling(true);
        } else {
          setIsCycling(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
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
  }, [isMounted]);

  useEffect(() => {
    if (!isCycling || !isMounted) return;

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
    }, 5000);

    return () => clearInterval(interval);
  }, [isCycling, activeTab, direction, isMounted]);

  const handleTabChange = (value: string) => {
    setIsCycling(false);
    setActiveTab(value);
  }

  const tabContentBaseClasses = "absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out";

  if (!isMounted) {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="shrink-0 w-full max-w-md mx-auto h-10 rounded-md bg-muted/50" />
            <div className="relative mt-4 h-[350px] md:h-[450px] overflow-hidden rounded-lg bg-card/50 backdrop-blur-sm" />
        </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full" ref={tabsRef}>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-col h-full">
        <TabsList className="shrink-0 w-full max-w-sm mx-auto grid grid-cols-3 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="events" className="gap-2">
            <Ticket className="h-5 w-5"/>
            <span>Events</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2">
            <Calendar className="h-5 w-5"/>
            <span>Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="sponsors" className="gap-2">
            <Heart className="h-5 w-5"/>
            <span>Sponsors</span>
          </TabsTrigger>
        </TabsList>
        <div className="relative mt-4 h-[350px] sm:h-[400px] md:h-[450px] overflow-hidden rounded-lg bg-card/50 backdrop-blur-sm">
          <Progress value={progress} className="absolute top-0 left-0 z-10 h-1" />
          <TabsContent value="events" forceMount className={cn(tabContentBaseClasses, activeTab === 'events' ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
            <div className="h-full flex items-center p-4">
              <Events condensed setApi={setEventsApi} />
            </div>
          </TabsContent>
          <TabsContent value="schedule" forceMount className={cn(tabContentBaseClasses, activeTab === 'schedule' ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
            <div className="h-full flex items-center p-4">
              <Timeline condensed setApi={setScheduleApi} />
            </div>
          </TabsContent>
          <TabsContent value="sponsors" forceMount className={cn(tabContentBaseClasses, activeTab === 'sponsors' ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
            <div className="h-full flex items-center p-4">
              <Sponsors condensed setApi={setSponsorsApi} />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
